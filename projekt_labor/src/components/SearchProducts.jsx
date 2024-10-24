'use client';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import Alert from './Alert';
import Loading from './Loading';
import ProductsContainer from './ProductsContainer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

async function searchProducts(
  setProducts,
  searchTerm,
  setAlert,
  setLoading,
  setSortBy,
  setSortedProducts
) {
  try {
    setLoading(true);

    const response = await fetch(`/api/products?search=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw Error('Failed to fetch Products');

    const products = await response.json();

    if (!products.length) throw Error('No Products were found!');
    setSortBy('');
    setSortedProducts([]);
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
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProducts(
        setProducts,
        searchTerm,
        setAlert,
        setLoading,
        setSortBy,
        setSortedProducts
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setProducts]);

  const handleSort = (value) => {
    setSortBy(value);
    setLoading(true);
    setTimeout(() => {
      let sorted = [...products];
      if (value === 'asc') {
        sorted.sort((a, b) => a.prices[0].price - b.prices[0].price);
      }
      if (value === 'desc') {
        sorted.sort((a, b) => b.prices[0].price - a.prices[0].price);
      }
      if (value === 'latest') {
        sorted = sorted.reverse();
      }
      setSortedProducts(sorted);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <div className='flex flex-col items-center gap-y-5'>
        <Input
          type='text'
          className='text-lg sm:w-3/5 md:text-xl lg:w-1/3 xl:text-2xl'
          placeholder='Search for some bread by typing'
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>

        <Select onValueChange={handleSort} value={sortBy}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Sort By' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='oldest'>Oldest first</SelectItem>
              <SelectItem value='latest'>Latest first</SelectItem>
              <SelectItem value='asc'>Lowest price first</SelectItem>
              <SelectItem value='desc'>Highest price first</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {(loading && <Loading message={'Loading, please wait'} />) ||
          (alert.message && (
            <Alert type={alert.type} message={alert.message} />
          )) || (
            <ProductsContainer
              products={sortedProducts.length ? sortedProducts : products}
              setUpdateShoppingList={setUpdateShoppingList}
            />
          )}
      </div>
    </>
  );
}
