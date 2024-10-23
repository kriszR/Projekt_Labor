'use client';
import SearchProducts from '@/components/SearchProducts';
import ShoppingList from '@/components/ShoppingList';
import { useState } from 'react';

export default function Home() {
  const [updateShoppingList, setUpdateShoppingList] = useState(true);

  return (
    <main>
      <SearchProducts setUpdateShoppingList={setUpdateShoppingList} />
      <ShoppingList
        updateShoppingList={updateShoppingList}
        setUpdateShoppingList={setUpdateShoppingList}
      />
    </main>
  );
}
