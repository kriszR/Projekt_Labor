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
                    ? product.description
                    : ''
                }
                prices={product.prices} 
                store={product.prices[0].stores.name}
                setUpdateShoppingList={setUpdateShoppingList}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
