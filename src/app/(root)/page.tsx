import React from "react";
import { Card } from "@/components";
import Carousel from "@/components/Carousel";
import AthleticPursuit from "@/components/AthleticPursuit";
import { getCurrentUser } from "@/lib/auth/actions";
import { getProductsByIds } from "@/lib/actions/product";
import fs from "fs/promises";
import path from "path";

const Home = async () => {
  const user = await getCurrentUser();

  console.log('USER:', user);

  const filePath = path.join(process.cwd(), 'homepage-product-ids.txt');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const productIds = fileContent
    .split('\n')
    .map(line => {
      const match = line.match(/"([^"]+)"/);
      return match ? match[1] : null;
    })
    .filter((id): id is string => id !== null);

  const products = await getProductsByIds(productIds);

  return (
    <div>
      <Carousel />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="latest" className="pb-12 pt-12">
          <h2 id="latest" className="mb-6 text-heading-3 text-dark-900">
            Latest shoes
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Card
                key={p.id}
                title={p.name}
                subtitle={p.subtitle ?? ""}
                meta={""}
                imageSrc={p.imageUrl ?? ""}
                price={p.minPrice ?? 0}
                href={`/products/${p.id}`}
              />
            ))}
          </div>
        </section>
      </main>
      <AthleticPursuit />
    </div>
  );
};

export default Home;
