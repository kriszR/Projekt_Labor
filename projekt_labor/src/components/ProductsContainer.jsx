import Product from './Product';

export default function ProductsContainer({ products }) {
  return (
    <>
      {products.length > 0 && (
        <div>
          <div className='-mx-1 flex flex-wrap gap-y-2'>
            {products.map((product, index) => (
              <Product
                key={index}
                name={product.name}
                category={product.category}
                description={
                  product.description?.length > 0
                    ? 'Description: ' + product.description
                    : ''
                }
                price={
                  product.prices.length > 0
                    ? product.prices[0].price + ' Ft'
                    : 'N/A'
                }
                currency={
                  product.prices.length > 0 ? product.prices[0].currency : 'N/A'
                }
                store={
                  product.prices.length > 0 ? product.prices[0].store : 'N/A'
                }
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
