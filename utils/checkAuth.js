import { firebaseAdmin } from "../firebase/adminApp";
import nookies from "nookies";

export default async function checkAuth({
  ctx,
  loginPath = "/login",
  requireClaims,
  requireLogin,
  loginRedirectUrl = "/",
}) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    //If no error till here, the user token is confirmed.

    /**
     * Authorize token
     * User is confirmed logged in
     * If require claims, check for claims and throw error to redirect to 404
     * else return with empty claims array
     */
    const user = await firebaseAdmin.auth().getUser(token.uid);
    let claims = [];
    if (user.customClaims) claims = Object.keys(user.customClaims);
    if (
      requireClaims &&
      requireClaims instanceof Array &&
      requireClaims.length
    ) {
      if (checker(claims, requireClaims)) {
        return {
          props: {
            userId: user.uid,
            userName: user.displayName,
            email: user.email,
            claims: claims,
          },
        };
      } else {
        throw new Error("Permissions Error: User doesn't have required claims");
      }
    }
    return {
      props: {
        userId: user.uid,
        userName: user.displayName,
        email: user.email,
        claims: claims,
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist or token verification failed either way: redirect to the login page
    console.log(err);
    if (requireLogin) {
      console.log("loginredirurl = ", loginRedirectUrl);
      return {
        redirect: {
          permanent: false,
          destination: `${loginPath}?loginRedirectUrl=${loginRedirectUrl}`,
        },
        props: { userId: null, userName: null, email: null, claims: [] },
      };
    }
    if (!requireClaims)
      return {
        props: { userId: null, userName: null, email: null, claims: [] },
      };

    return {
      notFound: true,
    };
  }
}
let checker = (arr, target) => target.every((v) => arr.includes(v));
