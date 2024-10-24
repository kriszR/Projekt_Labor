import Product from './Product';

export default function ProductsContainer({ products, setUpdateShoppingList }) {
  return (
    <>
      {products.length > 0 && (
        <div>
          <div className='-mx-1 flex flex-wrap gap-y-2'>
            {products.map((product, index) => (
              <Product
                key={index}
                product_id={product.id}
                name={product.name}
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
                  product.prices[0].stores?.name.length > 0
                    ? product.prices[0].stores.name
                    : 'N/A'
                }
                setUpdateShoppingList={setUpdateShoppingList}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
