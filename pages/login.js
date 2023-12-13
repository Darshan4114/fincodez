import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  OAuthProvider,
} from "firebase/auth";
import nookies from "nookies";
import { firebaseAdmin } from "../firebase/adminApp";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

import app from "../firebase/clientApp";
import Header from "../components/Header";
import { toastOptions } from "../components/constants";
import Logo from "../components/Logo";
import sendEmail from "@/u/sendEmail";
import cGetDoc from "crud/cGetDoc";
import cUpdateDoc from "crud/cUpdateDoc";
import cAddUser from "crud/cAddUser";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const getServerSideProps = async (ctx) => {
  let props = {};
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    if (token) {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
      return {
        props: {},
      };
    } else {
      if (ctx.query.loginRedirectUrl)
        props = { loginRedirectUrl: ctx.query.loginRedirectUrl };
      return {
        props,
      };
    }
  } catch (err) {
    // either the `token` cookie didn't exist or token verification failed either way: redirect to the login page
    console.log(err);
    if (ctx.query.loginRedirectUrl)
      props = { loginRedirectUrl: ctx.query.loginRedirectUrl };
    return {
      props,
    };
  }
};
const auth = getAuth(app);
auth.useDeviceLanguage();

function resendVerificationMail() {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    // Requires https
    url: "https://localhost:3000/",
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "app.air3x3.com",
  };
  sendSignInLinkToEmail(
    auth,
    window.localStorage.getItem("email"),
    actionCodeSettings
  )
    .then(() => {
      const email = window.localStorage.getItem("email");
      toast.success(
        `Resent verification mail, please check your inbox ${email}`,
        toastOptions
      );
    })
    .catch((error) => {
      toast.error(`Error during sending sign in link ${error}`, toastOptions);
    });
}

const ResendVerificationMessage = ({ resendVerificationMail, email }) => {
  window.localStorage.setItem("email", email);
  return (
    <div>
      Please verify your email address. Verification mail sent to {email}
      <p>
        Didn't get the mail?
        <span>
          <button onClick={resendVerificationMail}> RESEND </button>
        </span>
      </p>
    </div>
  );
};

export default function Login({ loginRedirectUrl, ...props }) {
  //Instantiating router
  const router = useRouter();
  //Hook for storing user in local storage

  //Instantiating form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        //Redirecting after login
        if (loginRedirectUrl) {
          router.push(loginRedirectUrl);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorCode}, ${errorMessage}`, toastOptions);
      });
  };
  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then(() => {
        //Redirecting after login
        if (loginRedirectUrl) {
          router.push(loginRedirectUrl);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorCode}, ${errorMessage}`, toastOptions);
      });
  };
  function getProvider(providerId) {
    switch (providerId) {
      case "google.com":
        return new GoogleAuthProvider();
      case "facebook.com":
        return new FacebookAuthProvider();

      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }

  async function oAuthLogin(provider) {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log("loginres", result);
        console.log("GOOGLE user. ", result.user);

        // Creating user / Updating user
        const user = await cGetDoc({
          collectionPath: ["users"],
          docId: result.user.uid,
        });
        console.log("userfrom firebase,", user);
        if (user) {
          await cUpdateDoc({
            collectionPath: ["users"],
            docId: result.user.uid,
            docData: {
              displayName: result.user.displayName,
              email: result.user.email,
              profilePicURL: result.user.photoURL,
              phone: result.user.phoneNumber,
            },
          });
        } else {
          await cAddUser(result.user.uid, {
            displayName: result.user.displayName,
            email: result.user.email,
            profilePicURL: result.user.photoURL,
            phone: result.user.phoneNumber,
          });
        }
      })
      .catch(async (e) => {
        console.log("login err", e);
        let err = JSON.parse(JSON.stringify(e));
        console.log("login err", err);

        const email = err?.customData?.email;
        const credential = OAuthProvider.credentialFromError(e);
        // console.log("err = ", err);
        // console.log("err = ", email);
        // console.log("err = ", oauthAccessToken);
        // console.log("err = ", err.code);
        // console.log("provider data", auth.currentUser?.providerData);
        if (
          email &&
          credential &&
          err.code === "auth/account-exists-with-different-credential"
        ) {
          console.log("AAA auth/account-exists-with-different-credential ");
          const providers = await fetchSignInMethodsForEmail(auth, email);
          console.log("providers ", providers);

          const provider = providers[0];

          // Test: Could this happen with email link then trying social provider?
          if (!provider) {
            throw new Error(
              `Your account is linked to a provider that isn't supported.`
            );
          }

          const linkedProvider = getProvider(provider);
          linkedProvider.setCustomParameters({ login_hint: email });
          const result = await signInWithPopup(auth, linkedProvider);
          await linkWithCredential(result.user, credential);
        }

        // Handle errors...
        toast.error(err.message || err.toString());
      })
      .then(() => {
        //Redirecting after login
        if (loginRedirectUrl) {
          router.push(loginRedirectUrl);
        } else {
          router.push("/");
        }
      });
  }
  function onSubmit(data) {
    // sendEmail();
    //Signing in
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        //signing out if email not verified
        if (!user.emailVerified) {
          toast.error(
            <ResendVerificationMessage
              email={user.email}
              resendVerificationMail={resendVerificationMail}
            />,
            toastOptions
          );
          signOut(auth)
            .then(() => {
              router.push("/login");
            })
            .catch((error) => {
              toast.error(`Error during logout ${error}`, toastOptions);
            });
          return;
        }
        //Logged in successfully
        toast.success(`Logged in as ${user.displayName}`, toastOptions);
        //Redirecting after login
        if (loginRedirectUrl) {
          router.push(loginRedirectUrl);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        //Handling login errors
        const errorCode = error.code;
        //ERROR: wrong password
        if (errorCode === "auth/wrong-password") {
          toast.error(`Invalid Password ${error.message}`, toastOptions);
        }
        //ERROR: user not found
        if (errorCode === "auth/user-not-found") {
          toast.error(`User does not exist ${error.message}`, toastOptions);
        }
      });
  }

  return (
    <Container>
      <div className="logo">
        <Logo />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <FormControl margin="normal">
          <InputLabel htmlFor="name">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            variant="outlined"
            {...register("email", { required: true })}
          />
          {errors.email && "Email is required"}
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="info">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            variant="outlined"
            {...register("password", { required: true })}
          />
          {errors.password && "Password is required"}
        </FormControl>
        <FormControl margin="normal">
          <button type="submit" value="submit">
            Login
          </button>
        </FormControl>
      </Form>
      <p>or login with</p>
      <div className="socialGroup">
        <button onClick={() => oAuthLogin(new GoogleAuthProvider())}>
          <Image
            src="/img/google.svg"
            height="25"
            width="25"
            alt="Google login"
          />{" "}
          <p>Google</p>
        </button>
        <button onClick={() => oAuthLogin(new FacebookAuthProvider())}>
          <Image
            src="/img/facebook.svg"
            height="27"
            width="27"
            alt="Facebook login"
          />
          <p>Facebook</p>
        </button>
      </div>
      <p style={{ textAlign: "center", marginBottom: "0.25em" }}>
        Don't have an account{" "}
        <span
          style={{ textDecoration: "underline", color: "var(--brand-color)" }}
        >
          <Link href="/register"> Register </Link>
        </span>
      </p>
      <p style={{ textAlign: "center", marginBottom: "0.25em" }}>
        Forgot Password{" "}
        <span
          style={{ textDecoration: "underline", color: "var(--brand-color)" }}
        >
          <Link href="/forgot-password">Reset password </Link>
        </span>
      </p>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  overflow: hidden;
  padding-bottom: 4em;
  .logo {
    margin: 4em auto 0;
    width: 10.5rem;
  }
  .socialGroup {
    width: 20rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    button {
      position: relative;
      border: none;
      flex: 1;
      display: flex;
      align-items: center;
      background: none;
      padding: 1em;
      margin: 0.5em 0;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      border-radius: 0.5em;
      cursor: pointer;
      transition: box-shadow 0.1s ease-in-out;
      :hover {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
          rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
      }
    }
    p {
      font-size: 1.2rem;
      color: var(--text-secondary);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      text-align: center;
    }
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
