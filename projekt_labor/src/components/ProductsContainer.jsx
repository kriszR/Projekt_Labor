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
                description={product.description}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

