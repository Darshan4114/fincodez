import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import styled, { css } from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { getAuth, signOut } from "firebase/auth";
// import { getFirestore, getDocs, collection } from "firebase/firestore";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../firebase/clientApp";

import AuthContext from "./AuthContext";

const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

export default function Nav({ tabValue, setTabValue }) {
  const router = useRouter();
  const [navState, setNavState] = useState(null);
  const { claims, user } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    console.log("handling tab change");
    setTabValue(newValue);
  };
  function toggleNav() {
    setNavState(!navState);
  }
  function logout() {
    signOut(auth)
      .then(() => {
        setNavState(false);
        router.push("/login");
      })
      .catch((error) => {
        console.log("Error during logout");
      });
  }

  useEffect(() => {
    const nav = document.querySelector("ul");
    const openBtn = document.querySelector(".openNavBtn");
    if (navState) {
      openBtn.style.display = "flex";
      openBtn.classList.remove("invisible");
      nav.classList.remove("visible");
    } else {
      nav.style.display = "block";
      openBtn.classList.add("invisible");
      nav.classList.add("visible");
      nav.classList.remove("ellipse-close-active");
    }
  }, [navState]);

  const Ham = () => {
    return (
      <button className="openNavBtn" onClick={toggleNav}>
        <Image src="/img/ham.svg" height="28" width="32" alt="Open nav" />{" "}
        {/* <p>Menu</p> */}
      </button>
    );
  };

  return (
    <>
      {/* Tabs for admin and tabs for authenticated user*/}
      {claims && claims.includes("admin") ? (
        <StyledTabs
          value={tabValue}
          centered
          onChange={handleChange}
          aria-label="Navigation"
          defaultValue="/"
        >
          <Tab label="Summary" value="/" />
          <Tab label="Expenses" value="/expenses" />
          <Tab label="Profile" value="/profile" />
          <Ham />
        </StyledTabs>
      ) : (
        <StyledTabs
          value={tabValue}
          centered
          onChange={handleChange}
          aria-label="Navigation"
        >
          <Tab label="Summary" value="/" />
          <Tab label="Expenses" value="/expenses" />
          <Tab label="Profile" value="/profile" />
          <Ham />
        </StyledTabs>
      )}

      {/* Tabs for anonymous user */}
      {user === null && (
        <StyledTabs
          value={tabValue}
          centered
          onChange={handleChange}
          aria-label="Navigation"
        >
          <Tab label="Info" value="/" />
          <Tab label="Login" value="/login" />
          <Tab label="FAQ" value="/faqs" />
        </StyledTabs>
      )}

      <StyledNav close={!navState} open={navState}>
        <ul>
          {user !== null && (
            <>
              <li onClick={logout}>
                <Image
                  src="/img/logout.png"
                  height="28"
                  width="28"
                  alt="logout"
                />
                <p> Logout </p>
              </li>
              <Link href="/my-profile">
                <li onClick={toggleNav}>
                  <Image
                    src="/img/profile.png"
                    height="28"
                    width="28"
                    alt="my-profile"
                  />
                  <p> My Profile</p>
                </li>
              </Link>
              <Link href="/faqs">
                <li onClick={toggleNav}>
                  <Image
                    src="/img/faqs.png"
                    height="28"
                    width="28"
                    alt="FAQ"
                  />
                  <p> FAQ</p>
                </li>
              </Link>
              {/* <Link href="/invites">
                <li onClick={toggleNav}>
                  <Image
                    src="/img/invitation.png"
                    height="28"
                    width="28"
                    alt="Invites"
                  />
                  <p> Invites</p>
                </li>
              </Link> */}
            </>
          )}

          {/* {claims && claims.includes("admin") && (
            <>
              <Link href="/locations">
                <li onClick={toggleNav}>
                  <Image
                    src="/img/location.png"
                    height="28"
                    width="28"
                    alt="locations"
                  />
                  <p> Locations</p>
                </li>
              </Link>
              <Link href="/payments">
                <li onClick={toggleNav}>
                  <Image
                    src="/img/payment.png"
                    height="28"
                    width="28"
                    alt="payments"
                  />
                  <p> Payments</p>
                </li>
              </Link>
            </>
          )} */}
        </ul>
      </StyledNav>
      {/* <button className="closeNavBtn" onClick={closeNav}>
        <Image src="/img/close.png" height="34" width="34" alt="close nav" />
      </button> */}
    </>
  );
}

const StyledTabs = styled(Tabs)`
  z-index: 35;
  padding-bottom: 0;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .openNavBtn {
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.5s;
    display: grid;
    place-items: center;
  }
`;

const StyledNav = styled.nav`
  z-index: 26;
  overflow: hidden;
  color: var(--theme-text);
  background: var(--theme-white);
  font-size: 1rem;
  font-weight: bold;
  padding: 1em 0 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  clip-path: inset(0px 0px 0px -15px);
  position: fixed;
  top: 0;
  right: -20rem;
  height: 100vh;
  width: 15rem;
  ul {
    width: 100%;
  }
  li {
    height: 2.5rem;
    cursor: pointer;
    width: 100%;
    padding: 0.5em 1em;
    background: #fff;
    transition: background 0.2s ease-in-out;
    :hover {
      background: #efefef;
    }
  }
  ${(props) =>
    props.close &&
    css`
      animation: closeAnimation 0.35s ease-out;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    `};
  ${(props) =>
    props.open &&
    css`
      animation: openAnimation 0.35s ease-in;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      ul {
        opacity: 1;
      }
    `};

  @keyframes openAnimation {
    0% {
      /* clip-path: ellipse(11% 11% at 100% 100%); */
      right: -20rem;
    }
    100% {
      /* clip-path: ellipse(42% 58% at 91% 69%); */
      right: 0;
    }
  }
  @keyframes closeAnimation {
    100% {
      /* clip-path: ellipse(0% 0% at 100% 100%); */
      right: -20rem;
    }
    0% {
      /* clip-path: ellipse(42% 58% at 91% 69%); */
      right: 0;
    }
  }

  ul {
    list-style: none;
    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      p {
        margin-left: 0.5em;
      }
    }
  }
  .children {
    display: flex;
    width: 12rem;
    justify-content: flex-start;
    height: 1.5rem;
    margin-bottom: 3.5rem;
    a {
      margin-right: 0.25em;
    }
  }
`;
