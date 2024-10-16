'use client';
import { ScrollText } from 'lucide-react';
import Image from 'next/image';

async function getShoppingListItems() {
  try {
    const response = await fetch(
      'http://localhost:3000/api/shoppinglistitems',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export default function ShoppingList() {
  return (
    <>
      <a className='group fixed bottom-5 right-5 inline-block aspect-square rounded bg-white p-1'>
        <ScrollText size={40} />
        <div className='group-hover:animate-open absolute bottom-12 right-0 hidden aspect-square w-[500px] bg-white group-hover:block'>
          <span className='absolute inset-0 overflow-hidden rounded'>
            <Image
              src={'/images/paper-background.jpg'}
              alt='Paper Background'
              width={1000}
              height={1000}
              className='h-full w-full'
            />
          </span>
          <div className='shopping-list'>
            <h2 className='text-center underline'>Shopping List Name</h2>
            <ul>
              <li>Milk</li>
              <li>Milk</li>
              <li>Milk</li>
              <li>Milk</li>
            </ul>
          </div>
        </div>
      </a>
    </>
  );
}
