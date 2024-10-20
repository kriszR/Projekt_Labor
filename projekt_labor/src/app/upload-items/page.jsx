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
  date,
  description,
  price,
  store,
  setAlert,
  setLoading
) {
  try {
    console.log(date);
    setLoading(true);

    const longDate = new Date(date).toISOString();
    
    if (!name || !price || !store)
      throw Error('Please fill out all the required fields!');

    const request = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, longDate, description, price, store }),
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
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  const [store, setStore] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showInputStore, setShowInputStore] = useState(false);
  const [stores, setStores] = useState(['Aldi', 'Lidl', 'Tesco']);
  const [newStore, setNewStore] = useState('');

  useEffect(() => {
    if (alert.type === 'success') {
      setName('');
      setDescription('');
      setPrice(0);
      setStore('');
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    }
  }, [alert]);

  const handleStoreChange = (value) => {
    if (value === 'other') {
      setShowInputStore(true);
    } else {
      setStore(value);
      setShowInputStore(false);
    }
  };

  useEffect(() => {
    const savedStores = localStorage.getItem('stores');

    if (savedStores) setStores(JSON.parse(savedStores));
  }, []);

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
          max={new Date().toISOString().split('T')[0]}
          value={date}
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
            UploadProduct(name, date, description, price, store, setAlert, setLoading)
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
