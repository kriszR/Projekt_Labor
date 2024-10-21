import { LoaderCircle } from 'lucide-react';

export default function Loading({message}) {
  return (
    <span className='inline-flex gap-x-1'>
      <LoaderCircle className='animate-spin' />
      {message}
    </span>
  );
}
