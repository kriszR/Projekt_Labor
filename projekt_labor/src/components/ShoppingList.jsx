'use client';
import { useEffect, useState } from 'react';
import { ScrollText } from 'lucide-react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from './Loading';
import { useUser } from './UserContext';

async function getShoppingListItems(shopping_list_id, setLoading) {
  try {
    setLoading(true);
    
    const response = await fetch(
      `/api/shoppinglistitems?id=${shopping_list_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch shopping list items');
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      name: item.products.name,
      price: item.products.prices[0].price,
      currency: item.products.prices[0].currency,
      store: item.products.prices[0].stores.name,
      quantity: item.quantity,
    }));
  } catch (err) {
    return [];
  } finally {
    setLoading(false);
  }
}

const pad = (num) => String(num).padStart(2, '0');

function exportListToFile(event, items) {
  const date = new Date();
  const currentDateString = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  const formattedDate = currentDateString
    .replace(/[-:]/g, '')
    .replace(' ', '_');

  const el = event.target;
  let totalPrice = 0;
  let content = '';

  content += `Shopping list created at: ${currentDateString}\n`;
  content += items
    .map((item) => {
      totalPrice += item.quantity * item.price;
      return `${item.name} - x${item.quantity} -- ${item.store}  \t= ${item.quantity * item.price} ${item.currency} \n`;
    })
    .join('');
  content += '\t\t   Total: ' + totalPrice + ' HUF';

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  el.href = url;
  el.download = `shopping-list-${formattedDate}.txt`;

  setTimeout(() => URL.revokeObjectURL(url), 100);
}

export default function ShoppingList({
  updateShoppingList,
  setUpdateShoppingList,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (updateShoppingList) {
      (async () => {
        if (user) {
          const items = await getShoppingListItems(
            user?.shoppinglists[0].id,
            setLoading
          );
          setItems(items);
          setUpdateShoppingList(false);
        }
      })();
    }
  }, [user, updateShoppingList, setUpdateShoppingList]);

  const handleDelete = async (id) => {
    try {
      
      const response = await fetch('/api/shoppinglistitems', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
  
      const remainingItems = items.filter((item) => item.id !== id);
      setItems(remainingItems);
  
    } catch (err) {
      setItems(items);
    }
  };

  return (
    <span
      className={`group fixed bottom-7 right-5 inline-block aspect-square rounded bg-white p-1`}
    >
      <ScrollText size={40} />
      <div
        className='absolute -right-5 bottom-12 max-h-[calc(100vh-300px)] w-[300px] translate-x-full overflow-y-auto overflow-x-clip rounded-l bg-white p-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 lg:max-h-[500px] lg:w-[400px]'
        style={{ backgroundImage: `url('/images/paper-background.jpg')` }}
      >
        <div className='shopping-list'>
          {(user?.id && (
            <>
              <h2 className='text-center underline'>Shopping List Name</h2>
              <ul>
                <AnimatePresence>
                  {(items?.length &&
                    items.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className='flex justify-between py-2'
                      >
                        {item.name} x{item.quantity}
                        <span className='ml-auto mr-20'>{item.store}</span>
                        <button
                          className='align-bottom'
                          onClick={() => handleDelete(item.id)}
                        >
                          <X color='red' />
                        </button>
                      </motion.li>
                    ))) ||
                    (loading && (
                      <Loading message={'Loading items, please wait...'} />
                    )) || <span>Shopping list is empty!</span>}
                </AnimatePresence>
              </ul>
              {!!items?.length && (
                <div className='mt-5 flex justify-center'>
                  <a
                    className='cursor-pointer rounded bg-secondary p-2 font-bold text-primary transition hover:bg-primary hover:text-secondary'
                    onClick={(e) => exportListToFile(e, items)}
                  >
                    Export shopping list
                  </a>
                </div>
              )}
            </>
          )) || (
            <h2 className='text-xl text-red-500'>
              To use the shopping list, you must log in!
            </h2>
          )}
        </div>
      </div>
    </span>
  );
}
