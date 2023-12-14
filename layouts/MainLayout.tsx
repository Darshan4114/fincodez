import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import app from "../firebase/clientApp";
import { useRouter } from "next/router";
const auth = getAuth(app);

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
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
        <div className="h-screen bg-neutral-700 text-white flex w-full">
            <div className='bg-neutral-900 w-72 p-8 flex flex-col justify-between border-r border-neutral-500'>
                <div className="">
                    <Logo />
                    <p className="text-gray-500">your finance assistant</p>
                </div>
                <Navbar />
                <div className="">
                    <ul>
                        <li className='cursor-pointer' onClick={logout}>Logout</li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    );
};
