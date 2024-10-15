'use client';
import Link from 'next/link';
import CartSVG from '@/images/CartSVG';

export default function Header() {
  return (
    <header className='sticky top-0 bg-secondary text-primary z-50'>
      <nav className='container mx-auto flex min-h-[100px] items-center justify-between'>
        <Link href={'/'}>
          <CartSVG
            className={'w-20 fill-slate-200 transition hover:fill-primary'}
          />
        </Link>

        <ul className='flex'>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/upload-items'}>Upload Items</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
