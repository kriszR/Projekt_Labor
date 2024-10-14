import { Button } from '../components/ui/button';

export default function SearchBar() {
  return (
    <div className='flex justify-center gap-x-5'>
      <input
        type='text'
        className='w-1/3 rounded text-2xl'
        placeholder='Search for some bread'
      ></input>
      <Button>Search</Button>
    </div>
  );
}
