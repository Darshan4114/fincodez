import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import ProfilePic from "../components/ProfilePic";
// import Gallery from "../components/Gallery";
import Header from "../components/Header";
import Spinner from "@/c/Spinner";
import app from "../firebase/clientApp";
import cGetDoc from "../firebase/crud/cGetDoc";
import checkAuth from "../utils/checkAuth";
import cleanTimestamp from "../utils/cleanTimestamp";

const storage = getStorage(app);

export const getServerSideProps = async (ctx) => {
  return await checkAuth({ ctx });
};

export default function UserProfile({ userId, claims }) {
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const updateUserProfilePic = useCallback((url) => {
    setProfilePicUrl(url);
  }, []);
  useEffect(() => {
    cGetDoc({ collectionPath: ["users"], docId: userId }).then((user) => {
      console.log("uuser = s", user);
      setUser(cleanTimestamp([user])[0]);
      if (user.profilePic) {
        getDownloadURL(ref(storage, user.profilePic)).then((url) => {
          setProfilePicUrl(url);
        });
      }
    });
  }, [userId]);

  return (
    <>
      <Header title="PROFILE" />
      {/* <Nav userId={userId} /> */}

      <Container>
        {user ? (
          <>
            <div className="pfp">
              <ProfilePic
                userId={user.id}
                nickname={
                  user.displayName
                    ? user.displayName
                    : user.firstName + " " + user.lastName
                }
                imgSrc={user.profilePicURL}
                editUrl="/edit-profile"
              />
            </div>
            <div className="info">
              <div className="group">
                <p className="title">Name</p>
                {user.displayName ? (
                  <p>{user.displayName}</p>
                ) : (
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                )}
              </div>
              {user.phone && (
                <div className="group">
                  <p className="title">Phone</p>
                  <p>{user.phone}</p>
                </div>
              )}
              <div className="group">
                <p className="title">Email</p>
                <p>{user.email}</p>
              </div>
              {user.address && (
                <div className="group">
                  <p className="title">Address</p>
                  <p>{user.address}</p>
                </div>
              )}
              {user.dob && (
                <div className="group">
                  <p className="title">Date of birth</p>
                  <p>{user.dob}</p>
                </div>
              )}
              {user.yearsOfExperience && (
                <div className="group">
                  <p className="title">Years of Experience</p>
                  <p>{user.yearsOfExperience}</p>
                </div>
              )}
              {claims.includes("admin") && (
                <div className="group">
                  <p className="title">Is Admin?</p>
                  {claims.includes("admin") ? <p>Yes</p> : <p>No</p>}
                </div>
              )}
            </div>
            {/* <Hr /> */}
          </>
        ) : (
          <Spinner />
        )}
      </Container>
    </>
  );
}

const Hr = styled.hr`
  width: 19rem;
  margin: 1em;
  border: 0;
  height: 1px;
  background: #333;
  background-image: -webkit-linear-gradient(left, #ccc, #3f4d67, #ccc);
  background-image: -moz-linear-gradient(left, #ccc, #3f4d67, #ccc);
  background-image: -ms-linear-gradient(left, #ccc, #3f4d67, #ccc);
  background-image: -o-linear-gradient(left, #ccc, #3f4d67, #ccc);
`;
const Container = styled.div`
  max-width: 20rem;
  margin: 6em auto 0;
  overflow-x: hidden;
  .pfp {
    margin-top: 1em;
  }
  ul {
    list-style: none;
  }
  .info {
    margin-left: 2em;
  }
  .group {
    margin-bottom: 0.5em;
  }
  .title {
    font-size: 0.9rem;
    color: var(--theme-dark);
    margin-bottom: -0.2em;
  }
`;
