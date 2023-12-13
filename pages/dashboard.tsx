import AuthContext from '@/components/AuthContext';
import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar';
import MainLayout from '@/layouts/MainLayout';
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react';
import { MdAutoGraph, MdChat, MdDownload, MdMoney, MdMoneyOff } from "react-icons/md";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/clientApp";
import { useRouter } from 'next/router';
import Link from 'next/link';
import cGetDocs from '@/firebase/crud-lite/cGetDocs';
import cMonitorChanges from "@/firebase/crud/cMonitorChanges";
import checkAuth from '@/utils/checkAuth';
import { GetServerSideProps } from 'next';
import getListFromSnapshot from "@/utils/getListFromSnapshot";
import { Chart } from "react-google-charts";
import PieChart from '@/components/Pie';

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];


export const options = {
  title: "My Daily Activities",
  is3D: true,
  backgroundColor: '#333',
  titleTextStyle: {
    color: "white",
    fontSize: 25,
    bold: true,
  },
  legend: { textStyle: { color: 'white' } },
  // colors: []
};

const auth = getAuth(app);

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps = async (ctx: GetServerSideProps) => {
  //@ts-ignore
  let res = await checkAuth({ ctx });
  return res;
};


export default function Home() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (!user?.uid) {
        console.log('user not found, ret');
        return;
      };
      const transactions = await cGetDocs({
        collectionPath: ['transactions'],
        conditions: [{ field: "uid", operator: "==", value: user?.uid }],
      })
      setTransactions(transactions);
    })()
  }, [user?.uid])

  // useEffect(() => {
  //   (async () => {
  //     //Monitoring changes in firestore
  //     // setLoading(true);
  //     // @ts-ignore
  //     const transactions = await cMonitorChanges({
  //       collectionPath: ["transactions"],
  //       callback: (snapshot: any) => {
  //         let transactions = getListFromSnapshot(snapshot);
  //         setTransactions(transactions);
  //       },
  //     });
  //     // setLoading(false);
  //   })()
  // }, []);

  function logout() {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log("Error during logout");
      });
  }
  return (
    <div className="h-screen bg-neutral-800 text-white flex w-full overflow-hidden">
      <div className='bg-neutral-900 w-72 p-8 flex flex-col justify-between border-r border-neutral-500'>
        <div className="">
          <Logo />
          <p className="text-gray-500">your finance assistant</p>
        </div>
        <Navbar />
        <ul className='flex flex-col gap-3'>
          <li className='cursor-pointer'>My Account</li>
          <li className='cursor-pointer'>FAQs</li>
          <li className='cursor-pointer' onClick={logout}>Logout</li>
        </ul>
      </div>
      <main className='p-8 grow'>
        <p>Good morning!</p>
        <p className="text-6xl mb-10">{user?.displayName}</p>
        <div className="cards flex gap-4">
          <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
            <p className="text-white font-bold text-5xl mb-2">22,000</p>
            <p className="text-neutral-300 ">Expenses</p>
          </div>
          <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
            <p className="text-white font-bold text-5xl mb-2">10,000</p>
            <p className="text-neutral-300 ">Income</p>
          </div>
          <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
            <p className="text-white font-bold text-5xl mb-2">11,000</p>
            <p className="text-neutral-300 ">P&L</p>
          </div>
        </div>
        <div className="rounded-xl my-4">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
            className='rounded-xl overflow-hidden'
            style={{ fill: 'red' }}
          />
          {/* <PieChart
            data={[
              {
                value: 45,
                color: "#ff9999"  // Light Pink
              },
              {
                value: 20,
                color: "#66b2ff"  // Sky Blue
              },
              {
                value: 18,
                color: "#99ff99"  // Light Green
              },
              {
                value: 12,
                color: "#ffcc99"  // Peach
              },
              {
                value: 5,
                color: "#c2c2f0"  // Lavender
              }
            ]}
            width={500}
            height={500}
          /> */}
        </div>
      </main>
      <div className='bg-neutral-700 w-72flex flex-col border-l border-neutral-500'>
        <div className="mb-10 p-4">
          <Link href='/dashboard'>
            <li className={`rounded p-2 mb-2 flex items-center gap-3 bg-neutral-800`} >
              <MdDownload size={32} />
              Import CSV
            </li>
          </Link>
          <Link href='/transaction-form'>
            <li className={`rounded p-2 mb-2 flex items-center gap-3 bg-neutral-800`} >
              <MdMoney size={32} />
              Add transaction
            </li>
          </Link>
        </div>
        <div className="transactions p-4 grow overflow-y-scroll">
          <p className='uppercase mb-4'>Recent transactions</p>
          {transactions?.length > 0 && transactions.map((transaction) => (
            <div className="border-b border-neutral-500 mb-2 pb-2" key={transaction.id}>
              <div className="transaction p-4 flex items-center justify-between bg-neutral-800 rounded ">
                <p className='mr-8'>{transaction.name}</p>
                <p className={`${transaction.transactionType === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>₹{transaction.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
