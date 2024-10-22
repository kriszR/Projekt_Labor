'use client';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import ProductsContainer from './ProductsContainer';

async function searchProducts(setProducts, searchTerm, setAlert, setLoading) {
  try {
    setLoading(true);

    const response = await fetch(
      `/api/products?search=${searchTerm}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) throw Error('Failed to fetch Products');

    const products = await response.json();

    if (!products.length) throw Error('No Products were found!');

    setProducts(products);

    setAlert({ message: '', type: '' });
  } catch (err) {
    setProducts([]);
    setAlert({ message: err.message, type: 'error' });
  } finally {
    setLoading(false);
  }
}

export default function SearchProducts({ setUpdateShoppingList }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchTerm === '') {
      searchProducts(setProducts, '', setAlert, setLoading);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      searchProducts(setProducts, searchTerm, setAlert, setLoading);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setProducts]);

  return (
    <>
      <div className='flex justify-center'>
        <Input
          type='text'
          className='w-1/3 text-2xl'
          placeholder='Search for some bread by typing'
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
      </div>
      <div>
        {(loading && <Loading message={'Loading, please wait'} />) ||
          (alert.message && (
            <Alert type={alert.type} message={alert.message} />
          )) || <ProductsContainer products={products} setUpdateShoppingList={setUpdateShoppingList} />}
      </div>
    </>
  );
}
