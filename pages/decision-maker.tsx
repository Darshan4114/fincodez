import MainLayout from "@/layouts/MainLayout";
import React, { ChangeEvent, useEffect, useState } from "react";
import DarkModeTextField from "@/components/DarkModeTextField";
import { Button, ButtonGroup, createTheme, ThemeProvider } from "@mui/material";
import cAddDoc from '@/firebase/crud/cAddDoc';
import { toastOptions } from "@/components/constants";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import cGetDocs from "@/firebase/crud/cGetDocs";
import { GetServerSideProps } from "next";
import checkAuth from "@/utils/checkAuth";

export const getServerSideProps = async (ctx: GetServerSideProps) => {
    //@ts-ignore
    let res = await checkAuth({ ctx });
    return { ...res, props: { ...res.props } };
};

enum InvestmentType{
    LUMPSUM='LUMPSUM',
    MONTHLY='MONTHLY',

}

export default function GoalTrackerPage({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(false);
    const [goalName, setGoalName] = useState('');
    const [goals, setGoals] = useState<any>([]);
    const [amount, setAmount] = useState<number>(0);
    const [timeline, setTimeline] = useState<number>(0);
    const [growth, setGrowth] = useState<number>(0);
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [investmentType, setInvestmentType] = useState(InvestmentType.LUMPSUM);

    useEffect(() => {
        fetchGoals();
    }, [userId])

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };
    const handleTimelineChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeline(Number(e.target.value));
    };
    const handleInvestmentAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInvestmentAmount(Number(e.target.value));
    };

    const fetchGoals = () => {
        setLoading(true);
        if (!userId) {
            console.log('user not found, ret');
            return;
        };
        cGetDocs({
            collectionPath: ['goals'],
            conditions: [{ field: "user", operator: "==", value: userId }],
        }).then((goals) => {
            console.log('goals', goals);
            setGoals(goals);
        }).catch((err) => {
            toast.error(err)
        })
        setLoading(false);
    };

    const handleCalculate = () => {
        setInvestmentAmount(10000);
    };

    const handleAddToGoals = async () => {
        try {
            setLoading(true);
            if (!userId) return;
            await cAddDoc({
                collectionPath: ["goals"],
                docData: {
                    user: userId, goalName, amount, timeline, growth
                },
            });
            fetchGoals();
            resetForm();
        } catch (err) {
            toast.error(err as string, toastOptions);
        }
        setLoading(false);
    };

    const resetForm = () => {
        setAmount(0);
        setGoalName('');
        setGrowth(0);
        setInvestmentAmount(0);
        setTimeline(0);
    };

    return (
        <MainLayout>
            <main className="p-8 grow">
                <p className="text-xl">Take the right step with your money</p>
                <p className="text-5xl mb-10">No more confusions!</p>
                <ThemeProvider theme={darkTheme}>
                    <div className=" h-screens grow">
                        <div className="">
                            <div className="flex flex-col gap-4">
                                <div className="flex grid grid-cols-2 border border-white rounded mb-4">
                                    <button className={`hover:bg-neutral-500 p-3 ${investmentType === InvestmentType.LUMPSUM && 'bg-neutral-600'}`} onClick={()=>{setInvestmentType(InvestmentType.LUMPSUM)}}>Lumpsum amount</button>
                                    <button className={`hover:bg-neutral-500 p-3 ${investmentType === InvestmentType.MONTHLY && 'bg-neutral-600'}`} onClick={()=>{setInvestmentType(InvestmentType.MONTHLY)}}>Monthly investment</button>
                                </div>
                                <DarkModeTextField
                                    label="What is the required amount? e.g. 500000, 1000000"
                                    name="amount"
                                    value={String(amount)}
                                    onChange={handleAmountChange}
                                />
                                <DarkModeTextField
                                    label="Timeline in years. e.g. 3years, 5years"
                                    name="timeline"
                                    value={String(timeline)}
                                    onChange={handleTimelineChange}
                                />
                                <DarkModeTextField
                                    label="Enter investment amount"
                                    name="investmentAmount"
                                    value={String(investmentAmount)}
                                    onChange={handleInvestmentAmountChange}
                                />

                                <button onClick={handleCalculate} className="text-white bg-green-500 text-xl font-bold rounded p-2" disabled={loading}>
                                    Calculate
                                </button>
                                {investmentAmount > 0 && (
                                    <>
                                        <p className='bg-white rounded text-gray-800 p-2'>Required monthly investment amount: ₹ {investmentAmount}</p>
                                        <div className="flex gapd-2">
                                            <p>Add this to MY GOALS?  &nbsp;</p>
                                            <button className="text-left underline text-white" onClick={handleAddToGoals}> Yes </button>
                                            <p>&nbsp;/&nbsp;</p>
                                            <button className="text-left underline text-white" onClick={resetForm}> No</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </main>
            <div className='bg-neutral-700 w-72flex flex-col border-l border-neutral-500'>
                <div className="goals p-4 w-72">
                    <p className='uppercase mb-4'>My Goals</p>
                    <div className="h-[30rem] overflow-y-scroll pr-2">
                        {goals?.length === 0 && <p>No goals yet!, Plaese create a goal!</p>}
                        {goals?.length > 0 && goals.map((goal: any) => (
                            <div className="border-b border-neutral-500 mb-2 pb-2" key={goal.id}>
                                <div className="transaction p-4 flex items-center justify-between bg-neutral-800 rounded ">
                                    <p className='mr-8'>{goal.goalName}</p>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <Spinner />
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};