import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';

async function AddProductToShoppingList(product_id, setAlert, setLoading) {
  try {
    setLoading(true);

    const request = await fetch('http://localhost:3000/api/shoppinglistitems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id }),
    });

    if (!request.ok) throw Error("Couldn't add product, try again!");

    setAlert({ message: 'Product added to shopping list!', type: 'success' });
  } catch (err) {
    setAlert({ message: err.message, type: 'error' });
  } finally {
    setLoading(false);
  }
}

export default function Product({
  product_id,
  name,
  description,
  price,
  store,
  setUpdateShoppingList,
}) {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setUpdateShoppingList('false'), 200);
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  }, [alert, setUpdateShoppingList]);

  return (
    <div className='w-full px-1 md:w-1/2 lg:w-1/4'>
      <div className='relative h-full rounded bg-white p-2'>
        {alert.message ? (
          <Alert type={alert.type} message={alert.message} />
        ) : (
          <>
            <h2>Name: {name}</h2>
            <p>{description}</p>
            <p>Price: {price}</p>
            <p>Store: {store}</p>
            <Button
              className='absolute bottom-2 right-2 h-7 bg-green-400 px-2'
              onClick={() => {
                AddProductToShoppingList(product_id, setAlert, setLoading);
                setUpdateShoppingList('true');
              }}
            >
              {loading ? <Loading /> : <Plus size={20} />}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
