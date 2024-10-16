  import { prisma } from '@/lib/prisma';
  import Product from './Product';

  export default async function ProductsContainer() {
    const products = await prisma.products.findMany({
      include: {
        prices: true, // Felteszem, hogy a `prices` egy kapcsolat a `products` táblában
      },
    });
    return (
      <div>
        <div className='-mx-1 flex flex-wrap gap-y-2'>
          {products.map((product, index) => (
            <Product
              key={index}
              name={product.name}
              category={product.category}
              description={product.description}
              price={product.prices.length > 0 ? product.prices[0].price : 'N/A'}
              currency={product.prices.length > 0 ? product.prices[0].currency : 'N/A'}
              store={product.prices.length > 0 ? product.prices[0].store : 'N/A'}
            />
          ))}
        </div>
      </div>
    );
  }
