import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import { useUser } from './UserContext';

async function AddProductToShoppingList(
  product_id,
  shopping_list_id,
  setAlert,
  setLoading
) {
  try {
    setLoading(true);

    const request = await fetch('/api/shoppinglistitems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id, shopping_list_id }),
    });

    if (!request.ok) throw Error("Couldn't add product, try again!");

    setAlert({ message: 'Product added to shopping list!', type: 'success' });
    return true;
  } catch (err) {
    setAlert({ message: err.message, type: 'error' });
    return false;
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
  const user = useUser();

  useEffect(() => {
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  }, [alert, setUpdateShoppingList, loading]);

  return (
    <div className='w-full px-1 md:w-1/2 lg:w-1/4 shadow-lg'>
      <div className='relative h-full rounded bg-white p-2'>
        {alert.message ? (
          <Alert type={alert.type} message={alert.message} />
        ) : (
          <>
            <h2>Name: {name}</h2>
            <p>{description}</p>
            <p>Price: {price}</p>
            <p>Store: {store}</p>
            {user?.id && (
              <Button
                className='absolute bottom-2 right-2 h-7 bg-green-400 px-2'
                onClick={async () => {
                  const success = await AddProductToShoppingList(
                    product_id,
                    user?.shoppinglists[0].id,
                    setAlert,
                    setLoading
                  );
                  if (success) setUpdateShoppingList(true);
                }}
              >
                {loading ? <Loading /> : <Plus size={20} />}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
