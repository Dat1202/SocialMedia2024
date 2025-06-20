import { signInWithCustomToken } from "firebase/auth";
import { authApis, endpoints } from "../configs/Apis";
import { auth } from "./Config";

const LoginToFirebase = async () => {
    const res = await authApis().post(endpoints["loginFirebase"]);

    console.log(res)   
    const { firebaseToken } = res;

    await signInWithCustomToken(auth, firebaseToken);   
};

export default LoginToFirebase;