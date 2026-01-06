import { museoSans } from './fonts';
import './globals.css';

export const metadata = {
  title: 'INVEST El Salvador',
  description: 'Investment promotion site scaffolding',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${museoSans.variable} antialiased`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}