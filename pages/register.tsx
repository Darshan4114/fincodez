import {
    getAuth,
    sendEmailVerification,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
  } from "firebase/auth";
  import React, { useState, useEffect } from "react";
  import Link from "next/link";
  import Head from "next/head";
  import { useForm, Controller } from "react-hook-form";
  import { useRouter } from "next/router";
  import { toast } from "react-toastify";
  import TextField from "@mui/material/TextField";
  import FormControl from "@mui/material/FormControl";
  
  import app from "../firebase/clientApp";
  import { addUser } from "../firebase/crud/user";
  import cUpdateDoc from "crud/cUpdateDoc";
  import cGetDoc from "crud/cGetDoc";
  import cAddDoc from "crud/cAddDoc";
  import Header from "../components/Header";
  import Spinner from "@/c/Spinner";
  import { toastOptions } from "../components/constants";
  import Logo from "../components/Logo";
  
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
  
    function onSubmit(data) {
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
          // userData
          let userData = {
            displayName: data.firstName + " " + data.lastName,
            userId: user.uid,
            email: data.email,
          };
  
          // Adding users personal team
          const meTeam = cAddDoc({
            collectionPath: ["teams"],
            docData: {
              name: "Individual Player (Self)",
              captain: userData,
              members: [{ ...userData, isAnonymous: false }],
              memberIdList: [user.uid],
            },
          });
          console.log(
            "added user invitee = ",
            data.firstName + " " + data.lastName,
            user.uid,
            email
          );
  
          //If registering from a invite link
          if (email && teamId && inviteId) {
            // Adding new users data to invite
            const updatedInvite = await cUpdateDoc({
              collectionPath: ["invites"],
              docId: inviteId,
              docData: {
                status: "Accepted",
                invitee: {
                  displayName: data.firstName + " " + data.lastName,
                  userId: user.uid,
                  email,
                },
              },
            });
            console.log("updated invite", updatedInvite);
  
            // Getting team
            const team = await cGetDoc({
              collectionPath: ["teams"],
              docId: teamId,
            });
            console.log("team ", team);
  
            //Updating team
            const teamMembers = team.members.filter(
              (member) => member.email !== email
            );
            console.log("teamMembers ", teamMembers);
  
            let newInvitedMembers = team.invitedMembers.filter(
              (member) => member.email !== email
            );
  
            const updatedTeam = await cUpdateDoc({
              collectionPath: ["teams"],
              docId: teamId,
              docData: {
                members: [
                  ...teamMembers,
                  {
                    displayName: data.firstName + " " + data.lastName,
                    userId: user.uid,
                    email,
                  },
                ],
                invitedMembers: newInvitedMembers,
              },
            });
            console.log("updatedTeam ", updatedTeam);
          }
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
      <Container>
        <Head>
          <title>Air3x3: Register</title>
        </Head>
        {!loading ? (
          <>
            <div className="logo">
              <Logo />
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <h1>Register</h1>
  
              <FormControl margin="normal">
                <TextField
                  name="firstName"
                  type="text"
                  label="First Name"
                  variant="outlined"
                  error={!!errors.firstName}
                  helperText={errors.firstName && errors.firstName.message}
                  {...register("firstName", { required: true })}
                />
              </FormControl>
  
              <FormControl margin="normal">
                <TextField
                  name="lastName"
                  type="text"
                  label="Last Name"
                  variant="outlined"
                  error={!!errors.lastName}
                  helperText={errors.lastName && errors.lastName.message}
                  {...register("lastName", { required: true })}
                />
              </FormControl>
              {email ? (
                <FormControl margin="normal">
                  <Controller
                    render={({ field }) => (
                      <TextField
                        type="email"
                        variant="outlined"
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message}
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
                <FormControl margin="normal">
                  <TextField
                    name="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                    {...register("email", { required: true })}
                  />
                </FormControl>
              )}
  
              <FormControl margin="normal">
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                  {...register("password", { required: true })}
                />
              </FormControl>
              <FormControl margin="normal">
                <TextField
                  name="password2"
                  type="password"
                  label="Repeat Password"
                  variant="outlined"
                  error={!!errors.password2}
                  helperText={errors.password2 && errors.password2.message}
                  {...register("password2", { required: true })}
                />
              </FormControl>
              <FormControl margin="normal">
                <button type="submit" value="submit">
                  Register
                </button>
              </FormControl>
            </Form>
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
      </Container>
    );
  }
  
  const Container = styled.div`
    text-align: center;
  
    .logo {
      margin: 7em auto 0;
    }
  `;
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 20rem;
    padding: 1em;
    margin: 1em auto 1em auto;
    border-radius: 0.5em;
    text-align: center;
    h1 {
      font-size: 1.25rem;
    }
    button {
      background: var(--theme-primary);
      padding: 0.5em 0;
      font-size: 1.25rem;
      color: var(--theme-white);
      border: none;
      border-radius: 0.25em;
      cursor: pointer;
    }
  `;
  