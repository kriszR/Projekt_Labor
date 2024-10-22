'use client';
import Link from 'next/link';
import CartSVG from '../../public/images/CartSVG';
import { usePathname } from 'next/navigation';
import Hamburger from 'hamburger-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (path) => {
    return path === pathname ? 'active-link' : '';
  };

  return (
    <header className='sticky top-0 z-50 bg-secondary text-primary'>
      <nav className='container mx-auto flex min-h-[100px] items-center justify-between'>
        <Link href={'/'}>
          <CartSVG
            className={
              'w-14 fill-slate-200 transition hover:fill-primary sm:w-20'
            }
          />
        </Link>

        <ul className='flex'>
          <li>
            <Link href={'/'} className={`${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href={'/upload-items'}
              className={`${isActive('/upload-items')}`}
            >
              Upload Items
            </Link>
          </li>
        </ul>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </nav>
    </header>
  );
}
