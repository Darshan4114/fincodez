import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google'
import { ChangeEvent, useEffect, useState } from 'react';
import { MdDownload, MdMoney } from "react-icons/md";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/clientApp";
import { useRouter } from 'next/router';
import Link from 'next/link';
import cGetDocs from '@/firebase/crud/cGetDocs';
import checkAuth from '@/utils/checkAuth';
import { GetServerSideProps } from 'next';
import { Chart } from "react-google-charts";
import Spinner from '@/components/Spinner';
import cAddDoc from '@/firebase/crud/cAddDoc';
import { FormControlLabel } from '@mui/material';
import IOSSwitch from '@/components/IOSSwitch';

export const data = [
  ["Task", "Hours per Day"],
  ["Income", 11],
  ["Expense", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];


export const options = {
  is3D: true,
  backgroundColor: '#333',
  titleTextStyle: {
    color: "white",
    fontSize: 25,
    bold: true,
  },
  legend: { textStyle: { color: 'white' } },
  colors: ['#22c55e', '#56ce75', '#78d78c', '#96dfa2', '#b1e8b9'],
};

const barOptions = {
  title: 'Expenses',
  is3D: true,
  backgroundColor: '#333',
  padding: '11px'
};

const auth = getAuth(app);

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps = async (ctx: GetServerSideProps) => {
  //@ts-ignore
  let res = await checkAuth({ ctx });
  return { ...res, props: { ...res.props } };
};


export default function Home({ userId, userName, transactionsList }: { userId: string, userName: string, transactionsList: any }) {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>(transactionsList);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [pl, setPl] = useState(0);
  const [ebitda, setEbitda] = useState(0);
  const [ebit, setEbit] = useState(0);
  const [ebt, setEbt] = useState(0);
  const [eat, setEat] = useState(0);
  const [businessMode, setBusinessMode] = useState(false);
  const [expenseData, setExpenseData] = useState([]);

  const handleModeChange = () => {
    setBusinessMode(!businessMode);
  };

  interface TransactionDoc {
    user: string;
    name: string;
    amount: number;
    transactionType: 'INCOME' | 'EXPENSE';
  }

  async function insertCSVData(csvData: Array<Array<string>>, userId: string): Promise<void> {
    try {
      const [_, ...rows] = csvData;
      console.log(rows)
      await Promise.all(rows.map(async ([transactionName, amount, tType]) => {
        await cAddDoc({
          collectionPath: ["transactions"],
          docData: {
            user: userId,
            name: transactionName,
            amount: parseFloat(amount),
            transactionType: tType === 'Debit' || tType === 'Debit\r' ? 'EXPENSE' : 'INCOME'
          } as TransactionDoc,
        });
      }));

      console.log('Data inserted successfully!');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        const rows = content.split('\n').map(row => row.split(','));
        insertCSVData(rows, userId);
        fetchTransactions();
      };

      reader.readAsText(file);
    }
  };

  const fetchTransactions = () => {
    if (!userId) {
      console.log('user not found, ret');
      return;
    };
    cGetDocs({
      collectionPath: ['transactions'],
      conditions: [{ field: "user", operator: "==", value: userId }],
    }).then((transactions) => {
      const totalIncome = transactions.reduce((acc, curr) => {
        // @ts-ignore
        return curr.transactionType === 'INCOME' ? acc + curr.amount : acc;
      }, 0);
      const totalExpense = transactions.reduce((acc, curr) => {
        // @ts-ignore
        return curr.transactionType === 'EXPENSE' ? acc + curr.amount : acc;
      }, 0);
      const totalTax = transactions.reduce((acc, curr) => {
        // @ts-ignore
        return curr.transactionType === 'TAX' ? acc + curr.amount : acc;
      }, 0);
      const totalAmortization = transactions.reduce((acc, curr) => {
        // @ts-ignore
        return curr.transactionType === 'AMORTIZATION' ? acc + curr.amount : acc;
      }, 0);
      const totalDepreciation = transactions.reduce((acc, curr) => {
        // @ts-ignore
        return curr.transactionType === 'DEPRECIATION' ? acc + curr.amount : acc;
      }, 0);
      const totalInterest = transactions.reduce((acc, curr) => {
        // @ts-ignore
        return curr.transactionType === 'INTEREST' ? acc + curr.amount : acc;
      }, 0);

      setIncome(totalIncome);
      if (businessMode) {
        setExpense(totalExpense - (totalInterest + totalTax + totalDepreciation + totalAmortization));
      } else {
        setExpense(totalExpense);
      }
      const expenses = transactions.filter((transaction) => {
        //@ts-ignore
        return transaction.transactionType === 'EXPENSE'
      });
      const expenseData = [
        ['Expense', 'Amount'],
        // @ts-ignore
        ...expenses.map((expense) => ([expense.name, expense.amount]))
      ];
      // @ts-ignore
      setExpenseData(expenseData);
      setPl(totalIncome - totalExpense);
      setEbitda(totalIncome - (totalExpense - (totalInterest + totalTax + totalDepreciation + totalAmortization)))
      setEbit(totalIncome - (totalExpense - (totalInterest + totalTax)))
      setEbt(totalIncome - (totalExpense - (totalTax)))
      setEat(totalIncome - (totalExpense))
      setTransactions(transactions);
    })
  };

  useEffect(() => {
    fetchTransactions();
  }, [userId, businessMode])

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
    <div className="h-screen bg-neutral-800 text-white flex w-full overflow-y-scroll max-w-[100rem]">
      <div className='bg-neutral-900 w-72 h-screen p-8 flex flex-col justify-between border-r border-neutral-500 fixed left-0 top-0'>
        <div className="">
          <Logo />
          <p className="text-gray-500">your finance assistant</p>
        </div>
        <Navbar />
        <FormControlLabel control={<IOSSwitch onChange={handleModeChange} className='mr-2' />} label="Business Mode" />
        <ul className='flex flex-col gap-3'>
          {/* <li className='cursor-pointer'>My Account</li>
          <li className='cursor-pointer'>FAQs</li> */}
          <li className='cursor-pointer' onClick={logout}>Logout</li>
        </ul>
      </div>
      <main className='p-8 max-w-64 ml-72'>
        <p className='text-xl'>Good morning!</p>
        <p className="text-6xl mb-10">{userName}</p>
        <div className="cards grid grid-cols-3 gap-4">
          <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
            <p className="text-white font-bold text-5xl mb-2">{income}</p>
            <p className="text-neutral-300 ">Income</p>
          </div>
          <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
            <p className="text-white font-bold text-5xl mb-2">{expense}</p>
            <p className="text-neutral-300 ">Expenses</p>
          </div>
          {businessMode === false && (
            <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
              <p className="text-white font-bold text-5xl mb-2">{pl}</p>
              <p className="text-neutral-300 ">P&L</p>
            </div>
          )}
          {businessMode === true && (
            <>
              <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
                <p className="text-white font-bold text-5xl mb-2">{ebitda}</p>
                <p className="text-neutral-300 ">EBITDA</p>
              </div>
              <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
                <p className="text-white font-bold text-5xl mb-2">{ebit}</p>
                <p className="text-neutral-300 ">EBIT</p>
              </div>
              <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
                <p className="text-white font-bold text-5xl mb-2">{ebt}</p>
                <p className="text-neutral-300 ">EBT</p>
              </div>
              <div className="card border border-neutral-500 bg-neutral-800 rounded-xl p-4 px-8">
                <p className="text-white font-bold text-5xl mb-2">{eat}</p>
                <p className="text-neutral-300 ">EAT</p>
              </div>
            </>
          )}
        </div>
        <div className="rounded-xl my-4">
          <div className="mb-4">
            <Chart
              chartType="PieChart"
              data={expenseData}
              options={options}
              width={"100%"}
              height={"500px"}
              className='rounded-xl overflow-hidden'
            />
          </div>
          <div className="mb-8 rounded-xl overflow-hidden">
            <Chart
              chartType="Bar"
              width="100%"
              height="500px"
              data={expenseData}
              options={barOptions}
            />
          </div>
        </div>
      </main>
      <div className='bg-neutral-700 w-72 flex flex-col border-l border-neutral-500 fixed right-0 h-screen top-0'>
        <div className="mb-10 p-4">
          <label htmlFor="csvfile" className='cursor-pointer'>
            <li className={`rounded p-2 mb-2 flex items-center gap-3 bg-neutral-800`} >
              <MdDownload size={32} />
              Import CSV
            </li>
          </label>
          <input id='csvfile' type="file" hidden accept=".csv" onChange={handleFileChange} />
          <Link href={`${businessMode ? '/business-transaction-form' : '/transaction-form'}`}>
            <li className={`rounded p-2 mb-2 flex items-center gap-3 bg-neutral-800`} >
              <MdMoney size={32} />
              Add transaction
            </li>
          </Link>
        </div>
        <div className="transactions p-4 grow">
          <p className='uppercase mb-4'>Recent transactions</p>
          <div className="h-[30rem] overflow-y-scroll pr-2">
            {transactions?.length > 0 ? transactions.map((transaction) => (
              <div className="border-b border-neutral-500 mb-2 pb-2" key={transaction.id}>
                <div className="transaction p-4 flex items-center justify-between bg-neutral-800 rounded ">
                  <p className='mr-8'>{transaction.name}</p>
                  <p className={`${transaction.transactionType === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>₹{transaction.amount}</p>
                </div>
              </div>
            )) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
