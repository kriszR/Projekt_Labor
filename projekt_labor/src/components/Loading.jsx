import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <span className='inline-flex gap-x-1'>
      <LoaderCircle className='animate-spin' />
      Loading, please wait
    </span>
  );
}
