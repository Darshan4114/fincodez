import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar';
import MainLayout from '@/layouts/MainLayout';
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { MdAutoGraph, MdChat } from "react-icons/md";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainLayout>
      <main className='p-8'>
        <p>Good morning!</p>
        <p className="text-4xl">Harshkumar Pasi</p>
      </main>
    </MainLayout>
  )
}
