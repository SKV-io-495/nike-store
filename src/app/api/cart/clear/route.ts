import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { carts, cartItems } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.userId, session.user.id),
  });

  if (cart) {
    await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));
  }

  return new Response('Cart cleared', { status: 200 });
}
