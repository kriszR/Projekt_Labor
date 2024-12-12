import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import { useUser } from './UserContext';
import PriceAlert from './PriceAlert';

async function AddProductToShoppingList(
  product_id,
  shopping_list_id,
  store_id,
  setAlert,
  setLoading,
  setCheaperOptions
) {
  try {
    setLoading(true);

    const request = await fetch('/api/shoppinglistitems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id,
        shopping_list_id,
        store_id,
      }),
    });

    const response = await request.json();

    if (!request.ok) throw Error("Couldn't add product, try again!");

    if (response.cheaperOptions) {
      setCheaperOptions(response.cheaperOptions);
    }

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
  date,
  prices,
  store,
  setUpdateShoppingList,
}) {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [priceChange, setPriceChange] = useState(null);
  const [storePrices, setStorePrices] = useState(null);
  const [cheaperOptions, setCheaperOptions] = useState(null);
  const user = useUser();

  date = new Date(date);
  const uploadDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const calculatePriceChange = (storePrices) => {
    if (storePrices.length < 2) return null;
    const change =
      ((storePrices[0].price - storePrices[1].price) / storePrices[1].price) *
      100;
    setPriceChange(change);
  };

  useEffect(() => {
    if (cheaperOptions) {
      const timeout = setTimeout(() => {
        setCheaperOptions(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [cheaperOptions]);

  useEffect(() => {
    const storePrices = prices
      .filter((price) => price.stores.name === store)
      .sort((a, b) => b.id - a.id)
      .slice(0, 2);
    setStorePrices(storePrices);

    calculatePriceChange(storePrices);
  }, [store, prices]);

  useEffect(() => {
    if (!cheaperOptions) {
      const timeout = setTimeout(
        () => setAlert({ message: '', type: '' }),
        3000
      );
      return () => clearTimeout(timeout);
    }
  }, [alert, setUpdateShoppingList, loading, cheaperOptions]);

  const currentPrice = storePrices?.[0]?.price;
  const storeId = storePrices?.[0]?.store_id;

  return (
    <div className='w-full px-1 shadow-lg md:w-1/2 lg:w-1/4'>
      <div className='relative flex h-full flex-col rounded bg-white p-2'>
        {alert.message && !cheaperOptions ? (
          <Alert type={alert.type} message={alert.message} />
        ) : (
          <>
            <h2 className='font-bold'>
              Name: {name}{' '}
              <span className='float-right text-sm'>{uploadDate}</span>
            </h2>
            {description && <p className='text-gray-600'>{description}</p>}
            <p className='my-3'>Store: {store}</p>

            <div className='mt-auto flex flex-col-reverse'>
              {storePrices?.map((price, index) => (
                <div
                  key={price.id}
                  className={`${index === 0 ? 'text-lg font-bold' : 'text-sm text-gray-500'}`}
                >
                  <span>{price.price} Ft</span>
                  {index === 0 && priceChange !== null && (
                    <span
                      className={`ml-2 text-sm ${priceChange > 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      ({priceChange > 0 ? '+' : ''}
                      {priceChange.toFixed(1)}%)
                    </span>
                  )}
                </div>
              ))}
            </div>

            {(cheaperOptions && (
              <PriceAlert
                currentPrice={currentPrice}
                cheaperOptions={cheaperOptions}
              />
            )) || (
              <>
                {user?.id && (
                  <Button
                    className='bg-maroon absolute bottom-2 right-2 h-7 px-2'
                    onClick={async () => {
                      const success = await AddProductToShoppingList(
                        product_id,
                        user?.shoppinglists[0].id,
                        storeId,
                        setAlert,
                        setLoading,
                        setCheaperOptions
                      );
                      if (success) setUpdateShoppingList(true);
                    }}
                  >
                    {loading ? <Loading /> : <Plus size={20} />}
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
