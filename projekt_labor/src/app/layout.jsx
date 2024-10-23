import Providers from '@/components/Providers';
import './globals.scss';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Providers>
      <body className={`antialiased`}>
        <>
          <Header />
          {children}
        </>
      </body>
      </Providers>
    </html>
  );
}
