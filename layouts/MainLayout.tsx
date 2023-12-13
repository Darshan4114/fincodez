import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
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
                        <li>My Account</li>
                        <li>FAQs</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    );
};
