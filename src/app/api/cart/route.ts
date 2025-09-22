import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { carts, cartItems, productImages } from "@/lib/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

async function getCartWithImages(cartId: string) {
    const cart = await db.query.carts.findFirst({
        where: eq(carts.id, cartId),
        with: {
            items: {
                with: {
                    variant: {
                        with: {
                            product: true,
                        },
                    },
                },
            },
        },
    });

    if (cart) {
        for (const item of cart.items) {
            let variantImages = await db.query.productImages.findMany({
                where: eq(productImages.variantId, item.variant.id),
            });

            if (variantImages.length === 0) {
                variantImages = await db.query.productImages.findMany({
                    where: and(
                        eq(productImages.productId, item.variant.productId),
                        isNull(productImages.variantId)
                    ),
                    orderBy: (images, { asc }) => [asc(images.sortOrder)],
                });
            }
            (item.variant as typeof item.variant & { images: typeof variantImages }).images = variantImages;
        }
    }
    return cart;
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userCart = await db.query.carts.findFirst({
    where: eq(carts.userId, session.user.id),
  });

  if (!userCart) {
    return new Response(JSON.stringify(null), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cart = await getCartWithImages(userCart.id);

  return new Response(JSON.stringify(cart), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { productVariantId, quantity } = await req.json();

  let cart = await db.query.carts.findFirst({
    where: eq(carts.userId, session.user.id),
  });

  if (!cart) {
    [cart] = await db
      .insert(carts)
      .values({ id: uuidv4(), userId: session.user.id })
      .returning();
  }

  const existingItem = await db.query.cartItems.findFirst({
    where: (cartItems, { and, eq }) =>
      and(
        eq(cartItems.cartId, cart.id),
        eq(cartItems.productVariantId, productVariantId)
      ),
  });

  if (existingItem) {
    await db
      .update(cartItems)
      .set({ quantity: existingItem.quantity + quantity })
      .where(eq(cartItems.id, existingItem.id));
  } else {
    await db.insert(cartItems).values({
      id: uuidv4(),
      cartId: cart.id,
      productVariantId,
      quantity,
    });
  }

  const updatedCart = await getCartWithImages(cart.id);

  return new Response(JSON.stringify(updatedCart), {
    headers: { 'Content-Type': 'application/json' },
  });
}
