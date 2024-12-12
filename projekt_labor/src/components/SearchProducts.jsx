'use client';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import Alert from './Alert';
import Loading from './Loading';
import ProductsContainer from './ProductsContainer';
import ExpirationFilter from './ExpirationFilter';
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
  setSortedProducts,
  expirationDays
) {
  try {
    setLoading(true);

    const response = await fetch(
      `/api/products?search=${searchTerm}&expirationDays=${expirationDays}`,
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
    setSortBy('latest');
    setSortedProducts(products.reverse());
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
  const [sortBy, setSortBy] = useState('latest');
  const [expirationDays, setExpirationDays] = useState(30);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProducts(
        setProducts,
        searchTerm,
        setAlert,
        setLoading,
        setSortBy,
        setSortedProducts,
        expirationDays
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, expirationDays]);

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
      if (value === 'oldest') {
        sorted = sorted.reverse();
      }
      setSortedProducts(sorted);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <div className='text-maroon flex flex-col items-center gap-y-5'>
        <Input
          type='text'
          className='placeholder:text-maroon border-0 bg-white/50 text-lg shadow-lg backdrop-blur-sm sm:w-3/5 md:text-xl lg:w-1/3 xl:text-2xl'
          placeholder='Search for some products by typing'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className='flex flex-wrap items-center justify-center gap-4'>
          <ExpirationFilter
            value={expirationDays}
            onChange={setExpirationDays}
          />

          <div className='flex items-center gap-4'>
            <Select onValueChange={handleSort} value={sortBy}>
              <SelectTrigger className='w-[140px] border-0 bg-white/50 shadow-lg backdrop-blur-sm hover:bg-white/30'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='latest'>Latest first</SelectItem>
                  <SelectItem value='oldest'>Oldest first</SelectItem>
                  <SelectItem value='asc'>Lowest price first</SelectItem>
                  <SelectItem value='desc'>Highest price first</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        {(loading && <Loading message='Loading, please wait' className='text-maroon' />) ||
          (alert.message && (
            <Alert type={alert.type} message={alert.message} />
          ))}

        {!loading && !alert.message && (
          <ProductsContainer
            products={sortedProducts.length ? sortedProducts : products}
            setUpdateShoppingList={setUpdateShoppingList}
          />
        )}
      </div>
    </>
  );
}
