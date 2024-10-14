import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export default function Product({ name, category, description }) {
  return (
    <div className='w-full px-1 md:w-1/2 lg:w-1/4'>
      <div className='relative h-full rounded bg-white p-2'>
        <h2>{name}</h2>
        <p>{category}</p>
        <p>{description}</p>
        <Button className='absolute bottom-2 right-2 h-7 bg-green-400 px-2'>
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
}
