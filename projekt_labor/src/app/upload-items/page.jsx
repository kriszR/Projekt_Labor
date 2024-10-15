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
          onValueChange={setCategory}
          value={category}
          id='category'
        >
          <SelectTrigger>
            <SelectValue placeholder='Select Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value='est'>Eastern Standard Time (EST)</SelectItem>
              <SelectItem value='cst'>Central Standard Time (CST)</SelectItem>
              <SelectItem value='mst'>Mountain Standard Time (MST)</SelectItem>
              <SelectItem value='pst'>Pacific Standard Time (PST)</SelectItem>
              <SelectItem value='akst'>Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value='hst'>Hawaii Standard Time (HST)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
          onValueChange={setStore}
          value={store}
          id='store'
        >
          <SelectTrigger>
            <SelectValue placeholder='Select Store' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value='est'>Eastern Standard Time (EST)</SelectItem>
              <SelectItem value='cst'>Central Standard Time (CST)</SelectItem>
              <SelectItem value='mst'>Mountain Standard Time (MST)</SelectItem>
              <SelectItem value='pst'>Pacific Standard Time (PST)</SelectItem>
              <SelectItem value='akst'>Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value='hst'>Hawaii Standard Time (HST)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
