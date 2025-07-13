import type { ReactNode } from 'react';
import Navbar from '../components/NavBar';
export default function MainLayout({ children } : { children: ReactNode }) 
{
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
