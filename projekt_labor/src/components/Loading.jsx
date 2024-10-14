import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <span>
      <LoaderCircle className='animate-spin' />
      Loading, please wait
    </span>
  );
}
