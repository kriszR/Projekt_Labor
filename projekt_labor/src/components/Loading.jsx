import { LoaderCircle } from 'lucide-react';

export default function Loading({ message, className }) {
  return (
    <span className={`inline-flex gap-x-1 ${className}`}>
      <LoaderCircle className='animate-spin' />
      {message}
    </span>
  );
}
