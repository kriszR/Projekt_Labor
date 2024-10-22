'use client';
import { useEffect, useState } from 'react';
import { ScrollText } from 'lucide-react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from './Loading';

async function getShoppingListItems(setLoading) {
  try {
    setLoading(true);
    const response = await fetch(
      '/api/shoppinglistitems',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    console.log(data)
    return data.map((item) => ({
      id: item.id,
      name: item.products.name,
      quantity: item.quantity,
    }));
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

async function deleteShoppingListItem(id) {
  try {
    const response = await fetch(
      '/api/shoppinglistitems',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      }
    );

    if (!response.ok) throw new Error('Failed to delete item');
    return await response.json();
  } catch (err) {}
}

export default function ShoppingList({ updateShoppingList }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateShoppingList) {
      console.log("lefutott");
      (async () => {
        const items = await getShoppingListItems(setLoading);
        setItems(items);
      })();
    }
  }, [updateShoppingList]);

  const handleDelete = async (id) => {
    const remainingItems = items.filter((item) => item.id !== id);
    setItems(remainingItems);

    const response = await deleteShoppingListItem(id);

    if (!response) {
      setItems(items);
    }
  };

  return (
    <>
      <a
        className={`group fixed bottom-5 right-5 hidden lg:inline-block aspect-square rounded bg-white p-1`}
      >
        <ScrollText size={40} />
        <div
          className='absolute bottom-12 right-0 block max-h-[500px] w-[500px] overflow-y-auto bg-white p-2 group-hover:block overflow-x-clip'
          style={{ backgroundImage: `url('/images/paper-background.jpg')` }}
        >
          <div className='shopping-list'>
            <h2 className='text-center underline'>Shopping List Name</h2>
            <ul>
              <AnimatePresence>
                {(items.length &&
                  items.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className='flex justify-between py-2'
                    >
                      {item.name} - Quantity: {item.quantity}
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
          </div>
        </div>
      </a>
    </>
  );
}
