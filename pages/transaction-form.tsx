import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import DarkModeTextField from "@/components/DarkModeTextField";
import Logo from "@/components/Logo";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import cAddDoc from '@/firebase/crud/cAddDoc';
import AuthContext from "@/components/AuthContext";
import { toastOptions } from "@/components/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type TransactionType = 'INCOME' | 'EXPENSE';

export default function TransactionForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [transactionType, setTransactionType] = useState<TransactionType>('EXPENSE');
    const { user } = useContext(AuthContext);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleTransactionTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTransactionType(e.target.value as TransactionType);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log('user, ', user);
            if (!user) return;
            await cAddDoc({
                collectionPath: ["transactions"],
                docData: {
                    user: user.uid, name, amount, transactionType
                },
            });
            router.push('/dashboard')
        } catch (err) {
            toast.error(err as string, toastOptions);
        }
        setLoading(false);
        console.log("data", name, amount, transactionType)
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="bg-neutral-900 h-screen p-8">
                <div className="mb-10">
                    <Logo />
                </div>
                <form onSubmit={handleSubmit} className="w-96 mx-auto">
                    <div className="flex flex-col gap-4">
                        <DarkModeTextField
                            label="Amount"
                            name="amount"
                            value={amount.toString()}
                            onChange={handleAmountChange}
                        />
                        <DarkModeTextField
                            label="Name"
                            name="name"
                            type='text'
                            value={name}
                            onChange={handleNameChange}
                        />
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label" className="text-white">
                                Transaction Type
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={transactionType}
                                name="radio-buttons-group"
                                onChange={handleTransactionTypeChange}
                            >
                                <FormControlLabel
                                    value="INCOME"
                                    className="text-white"
                                    control={<Radio />}
                                    label="Income"
                                />
                                <FormControlLabel
                                    value="EXPENSE"
                                    className="text-white"
                                    control={<Radio />}
                                    label="Expense"
                                />
                            </RadioGroup>
                        </FormControl>
                        <button type="submit" className="text-white bg-green-500 text-xl font-bold rounded p-2" disabled={loading}>
                            Submit
                        </button>
                        <button className="text-left underline text-white" onClick={() => router.push('/dashboard')}>Cancel</button>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
};
