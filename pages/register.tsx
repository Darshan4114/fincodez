import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    getAuth,
    sendEmailVerification,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";

import Logo from "@/components/Logo";
import app from "@/firebase/clientApp";
import Spinner from "@/components/Spinner";
import { addUser } from "@/firebase/crud-lite/user";
import { toastOptions } from "@/components/constants";

const auth = getAuth(app);

export default function Register() {
    //Initializing router
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    //Getting register params
    const { email, teamId, inviteId } = router.query;
    console.log("inputs = ", email, teamId, inviteId);

    //Initializing form from react-hook-forms
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("email", email);
    }, [setValue, email]);

    function onSubmit(data: any) {
        setLoading(true);
        //Validating if passwords match
        if (data.password !== data.password2) {
            toast.error("Passwords don't match", toastOptions);
            return;
        }
        //Creating user with given email and password
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                //Registered user
                const user = userCredential.user;
                //Updating profile with given displayName
                updateProfile(user, {
                    displayName: data.firstName + " " + data.lastName,
                    //put photo url
                });
                //Inserting user into firestore database
                addUser(user.uid, {
                    displayName: data.firstName + " " + data.lastName,
                    email: data.email,
                    desg: "player",
                });

                //Sending email verification
                sendEmailVerification(user).then(() => {
                    toast.success(
                        `Verification mail sent to ${user.email}, please check your inbox`,
                        toastOptions
                    );
                    //Firebase signs in user automatically after registration,
                    //Since we want to verify the user's email before letting the user in, we log the user out
                    signOut(auth)
                        .then(() => {
                            router.push("/login");
                        })
                        .catch((error) => {
                            toast.error(`Error during logout ${error}`, toastOptions);
                        });
                });
                setLoading(false);
            })
            .catch((error) => {
                //Registration not successful, checking errorCode and toasting proper error
                const errorCode = error.code;
                //ERROR: Weak password.
                if (errorCode === "auth/weak-password") {
                    toast.error(
                        `Weak password. Minimum 6 characters required. `,
                        toastOptions
                    );
                }
                //ERROR: Email already in use.
                if (errorCode === "auth/email-already-in-use") {
                    toast.error(
                        `Email address already in use, please use another email address. `,
                        toastOptions
                    );
                }
                setLoading(false);
            });
    }

    return (
        <main className='grid place-items-center'>
            <Head>
                <title>CashFlow: Register</title>
            </Head>
            {!loading ? (
                <>
                    <div className="logo">
                        <Logo />
                    </div>
                    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-center text-3xl mb-8'>Register</h1>
                        <FormControl className='mb-3'>
                            <TextField
                                type="text"
                                label="First Name"
                                variant="outlined"
                                error={!!errors.firstName}
                                {...register("firstName", { required: true })}
                            />
                        </FormControl>

                        <FormControl className='mb-3'>
                            <TextField
                                type="text"
                                label="Last Name"
                                variant="outlined"
                                error={!!errors.lastName}
                                {...register("lastName", { required: true })}
                            />
                        </FormControl>
                        {email ? (
                            <FormControl className='mb-3'>
                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            type="email"
                                            variant="outlined"
                                            label="Email"
                                            error={!!errors.email}
                                            disabled
                                            {...field}
                                        />
                                    )}
                                    control={control}
                                    name="email"
                                    defaultValue=""
                                    rules={{ required: true }}
                                />
                            </FormControl>
                        ) : (
                            <FormControl className='mb-3'>
                                <TextField
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                    error={!!errors.email}
                                    {...register("email", { required: true })}
                                />
                            </FormControl>
                        )}

                        <FormControl className='mb-3'>
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                error={!!errors.password}
                                {...register("password", { required: true })}
                            />
                        </FormControl>
                        <FormControl className='mb-3'>
                            <TextField
                                type="password"
                                label="Repeat Password"
                                variant="outlined"
                                error={!!errors.password2}
                                {...register("password2", { required: true })}
                            />
                        </FormControl>
                        <FormControl className='mb-3'>
                            <button className='bg-primary rounded text-white font-bold py-2 ' type="submit" value="submit">
                                Register
                            </button>
                        </FormControl>
                    </form>
                    <p style={{ textAlign: "center" }}>
                        Already have an account{" "}
                        <span
                            style={{
                                textDecoration: "underline",
                                color: "var(--brand-color)",
                            }}
                        >
                            <Link href="/login"> Login </Link>
                        </span>
                    </p>
                </>
            ) : (
                <Spinner />
            )}
        </main>
    );
}
