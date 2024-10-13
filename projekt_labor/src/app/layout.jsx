import "./globals.scss";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <>
          <Header />
          {children}
        </>
      </body>
    </html>
  );
}
