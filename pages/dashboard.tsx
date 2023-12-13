import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar';
import MainLayout from '@/layouts/MainLayout';
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { MdAutoGraph, MdChat } from "react-icons/md";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="h-screen bg-neutral-700 text-white flex w-full">
      <div className='bg-neutral-900 w-72 p-8 flex flex-col justify-between'>
        <div className="">
          <Logo />
          <p className="text-gray-500">your finance assistant</p>
        </div>
        <Navbar />
        <div className="">
          <ul>
            <li>My Account</li>
            <li>FAQs</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
      <main className='p-8'>
        <p>Good morning!</p>
        <p className="text-4xl">Harshkumar Pasi</p>
      </main>
    </div>
  )
}
