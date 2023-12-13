import Link from "next/link";
import { useRouter } from "next/router";
import { MdAutoGraph, MdChat } from "react-icons/md";

export default function Navbar() {
    const router = useRouter();
    console.log('path', router.pathname)
    return (
        <nav className="">
            <p className='uppercase mb-4'>Main menu</p>
            <ul>
                <Link href='/dashboard'>
                    <li className={`rounded p-2 mb-2 flex items-center gap-3 ${router.pathname.includes('dashboard') ? ' bg-green-500 ' : ' bg-neutral-700 '}`} >
                        <MdAutoGraph size={32} />
                        Dashboard
                    </li>
                </Link>
                <Link href='/goal-tracker'>
                    <li className={`rounded p-2 mb-2 flex items-center gap-3 ${router.pathname.includes('goal-tracker') ? ' bg-green-500 ' : ' bg-neutral-700 '}`} >
                        <MdChat size={32} />
                        Goal Tracker
                    </li>
                </Link>
                <Link href='/decision-maker'>
                    <li className={`rounded p-2 mb-2 flex items-center gap-3 ${router.pathname.includes('decision-maker') ? ' bg-green-500 ' : ' bg-neutral-700 '}`} >
                        <MdChat size={32} />
                        Decision Maker
                    </li>
                </Link>
                <Link href='/ask-me-anything'>
                    <li className={`rounded p-2 mb-2 flex items-center gap-3 ${router.pathname.includes('ask-me-anything') ? ' bg-green-500 ' : ' bg-neutral-700 '}`} >
                        <MdChat size={32} />
                        Ask me anything
                    </li>
                </Link>
            </ul>
        </nav>
    );
};
