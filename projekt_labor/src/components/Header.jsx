'use client';
import Link from 'next/link';
import CartSVG from '../../public/images/CartSVG';
import { usePathname } from 'next/navigation';
import Hamburger from 'hamburger-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    return path === pathname ? 'active-link' : '';
  };

  return (
    <header className='relative z-40 w-screen text-primary'>
      <div className='fixed inset-x-0 top-0 z-10 w-screen bg-secondary'>
        <nav className='container mx-auto flex h-[70px] lg:h-[95px] items-center justify-between'>
          <Link href={'/'}>
            <CartSVG
              className={
                'w-14 fill-slate-200 transition hover:fill-primary lg:w-20'
              }
            />
          </Link>

          <ul className='hidden lg:flex'>
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
          <div className='lg:hidden'>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </nav>
      </div>
      <div
        className={`fixed inset-0 bg-secondary lg:hidden ${isOpen ? 'translate-y-0' : '-translate-y-full -z-10'} transition-transform duration-500`}
      >
        <nav>
          <ul className='flex flex-col items-center gap-y-5 py-24 text-lg'>
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
        </nav>
      </div>
    </header>
  );
}
