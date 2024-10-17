'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';

async function UploadProduct(
  name,
  category,
  description,
  price,
  store,
  setAlert,
  setLoading
) {
  try {
    setLoading(true);

    if (!name || !category || !price || !store)
      throw Error('Please fill out all the required fields!');

    const request = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, category, description, price, store }),
    });

    if (!request.ok) throw Error("Couldn't add item, try again!");

    setAlert({ message: 'Item successfully added!', type: 'success' });
  } catch (err) {
    setAlert({ message: err.message, type: 'error' });
  } finally {
    setLoading(false);
  }
}

export default function UploadPage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  const [store, setStore] = useState('');
  const [date, setDate] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showInputStore, setShowInputStore] = useState(false);

  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (alert.type === 'success') {
      setName('');
      setCategory('');
      setDescription('');
      setPrice(0);
      setStore('');
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    }
  }, [alert]);

  const handleCategoryChange = (value) => {
    if (value === 'other') {
      setShowInput(true);
    } else {
      setCategory(value);
      setShowInput(false);
    }
  };

  const handleStoreChange = (value) => {
    if (value === 'other') {
      setShowInputStore(true);
    } else {
      setStore(value);
      setShowInputStore(false);
    }
  };

  const [categories, setCategories] = useState([
    'Water',
    'White Bread',
    'Milk',
  ]);
  const [newCategory, setNewCategory] = useState('');

  const [stores, setStores] = useState(['Aldi', 'Lidl', 'Tesco']);
  const [newStore, setNewStore] = useState('');

  
   useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    const savedStores = localStorage.getItem('stores');

    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedStores) setStores(JSON.parse(savedStores));
  }, []);


  /*const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      setNewCategory('');
      setShowInput(false);
    } else {
      alert('The category already exists!');
    }
  };*/

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setCategory(newCategory);
      setNewCategory('');
      setShowInput(false);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    } else {
      alert('The category already exists!');
    }
  };


  /*const addStore = () => {
    if (newStore && !stores.includes(newStore)) {
      setStores([...stores, newStore]);
      setStore(newStore); 
      setNewStore('');
      setShowInputStore(false);
    } else {
      alert('The store already exists!');
    }
  };*/


  const addStore = () => {
    if (newStore && !stores.includes(newStore)) {
      const updatedStores = [...stores, newStore];
      setStores(updatedStores);
      setStore(newStore);
      setNewStore('');
      setShowInputStore(false);
      localStorage.setItem('stores', JSON.stringify(updatedStores));
    } else {
      alert('The store already exists!');
    }
  };

  return (
    <main>
      <div className='grid w-full max-w-sm items-center gap-3'>
        <Label htmlFor='name'>Name *</Label>
        <Input
          type='input'
          id='name'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Label htmlFor='category'>Category *</Label>
        <Select
          className='w-full'
          onValueChange={handleCategoryChange}
          value={category}
          id='category'
        >
          <SelectTrigger>
            <SelectValue placeholder='Select Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            
              {categories.map((category, index) => (
                <SelectItem key={index} value={category}>
                  {category}{' '}
                </SelectItem>
              ))}
              <SelectItem value='other'>Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {showInput && (
          <div>
            <Input
              type='text'
              placeholder='Please add a new category'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={addCategory} className='mt-2'>
              Add
            </Button>
          </div>
        )}

        <Label htmlFor='description'>Description</Label>
        <Input
          type='input'
          id='description'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Label htmlFor='price'>Price *</Label>
        <div>
          <Input
            type='number'
            className='inline-flex w-[100px]'
            min={1}
            max={99999999}
            id='price'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <span className='ml-2'>Ft</span>
        </div>

        <Label htmlFor='date'>Date</Label>
        <Input
          type='date'
          className='w-fit'
          id='date'
          min={'2000-01-01'}
          max={currentDate}
          value={date || currentDate}
          onChange={(e) => setDate(e.target.value)}
        />

        <Label htmlFor='store'>Store *</Label>
        <Select
          className='w-full'
          onValueChange={handleStoreChange}
          value={store}
          id='store'
        >
          <SelectTrigger>
            <SelectValue placeholder='Select Store' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            
              {stores.map((stores, index) => (
                <SelectItem key={index} value={stores}>
                  {stores}{' '}
                </SelectItem>
              ))}
              <SelectItem value='other'>Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {showInputStore && (
          <div>
            <Input
              type='text'
              placeholder='Please add a new store'
              value={newStore}
              onChange={(e) => setNewStore(e.target.value)}
            />
            <Button onClick={addStore} className='mt-2'>
              Add
            </Button>
          </div>
        )}

        <Button
          className='justify-self-center'
          onClick={() =>
            UploadProduct(
              name,
              category,
              description,
              price,
              store,
              setAlert,
              setLoading
            )
          }
        >
          Upload Item
        </Button>

        {(loading && <Loading />) ||
          (alert.message && (
            <Alert type={alert.type} message={alert.message} />
          ))}
      </div>
    </main>
  );
}
