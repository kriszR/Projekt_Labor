import Product from './Product';

export default function ProductsContainer({ products, setUpdateShoppingList }) {
  return (
    <>
      {products.length > 0 && (
        <div>
          <div className='-mx-1 flex flex-wrap gap-y-2'>
            {products.map((product, index) => {
              const latestPrice = product.prices[0];

              return (
                <Product
                  key={index}
                  product_id={product.id}
                  name={product.name}
                  description={
                    product.description?.length > 0
                      ? 'Description: ' + product.description
                      : ''
                  }
                  price={latestPrice ? latestPrice.price + ' Ft' : 'N/A'}
                  currency={latestPrice ? latestPrice.currency : 'N/A'}
                  store={
                    latestPrice?.stores?.name ? latestPrice.stores.name : 'N/A'
                  }
                  setUpdateShoppingList={setUpdateShoppingList}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
