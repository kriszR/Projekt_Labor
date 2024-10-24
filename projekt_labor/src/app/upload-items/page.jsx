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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import { useUser } from '@/components/UserContext';

async function UploadProduct(
  product_name,
  date,
  description,
  price,
  store_id,
  user,
  setAlert,
  setLoading
) {
  try {
    setLoading(true);

    if (!user) throw Error('No user found, please try again!');

    if (!product_name || !price || !store_id)
      throw Error('Please fill out all the required fields!');

    const longDate = new Date(date).toISOString();

    const request = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_name,
        longDate,
        description,
        price,
        store_id,
        user,
      }),
    });

    if (!request.ok) throw Error("Couldn't add item, try again!");

    setAlert({ message: 'Item successfully added!', type: 'success' });
  } catch (err) {
    setAlert({ message: err.message, type: 'error' });
  } finally {
    setLoading(false);
  }
}

async function addStore(store_name, setAlert) {
  try {
    const request = await fetch('/api/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        store_name,
      }),
    });

    if (!request.ok) throw Error("Couldn't add store, try again!");

    setAlert({ message: 'Store successfully added!', type: 'success' });
  } catch (err) {
    setAlert({ message: err.message, type: 'error' });
  }
}

async function getStores() {
  try {
    const response = await fetch('/api/stores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export default function UploadPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showInputStore, setShowInputStore] = useState(false);
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState('');
  const [storeID, setStore] = useState('');
  const [addBtnPushed, setAddBtnPushed] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (alert.type === 'success') {
      setName('');
      setDescription('');
      setPrice(0);
      setStore('');
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    }
  }, [alert]);

  useEffect(() => {
    {
      (async () => {
        const stores = await getStores();
        setStores(stores);
      })();
      setAddBtnPushed(false);
      setShowInputStore(false);
    }
  }, [addBtnPushed]);

  const handleStoreChange = (value) => {
    if (value === 'other') {
      setShowInputStore(true);
    } else {
      setStore(value);
      setShowInputStore(false);
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
        <Select onValueChange={handleStoreChange} value={storeID} id='store'>
          <SelectTrigger>
            <SelectValue placeholder='Select Store' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {stores?.map((store, index) => (
                <SelectItem key={index} value={store.id}>
                  {store.name}
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
            <Button
              onClick={() => {
                addStore(newStore, setAlert);
                setAddBtnPushed(true);
              }}
              className='mt-2'
            >
              Add
            </Button>
          </div>
        )}

        <Button
          className='justify-self-center'
          onClick={() =>
            UploadProduct(
              name,
              date,
              description,
              price,
              storeID,
              user,
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
