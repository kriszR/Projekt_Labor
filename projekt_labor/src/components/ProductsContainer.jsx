import { prisma } from '@/lib/prisma';
import Product from './Product';

export default async function ProductsContainer() {
  const products = await prisma.products.findMany();
  return (
    <div>
      <div className='-mx-1 flex flex-wrap gap-y-2'>
        {products.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            category={product.category}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}
