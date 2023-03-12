import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Register() {


    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const createUser = () => {

        console.log("Creating user " + emailRef.current.value + " with password " + passwordRef.current.value);
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            addDoc(collection(db, "users"), {
                userID: auth.currentUser.uid,
                plan: "free",
                renewalDate: Timestamp.now()
            });
            const user = userCredential.user;
            useNavigate("/dashboard");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        }
    )};

    return (
      <div>
        <h1>Register</h1>
        <input type="text" placeholder="Name" ref={nameRef}/>
        <input type="text" placeholder="Email" ref={emailRef}/>
        <input type="password" placeholder="Password" ref={passwordRef}/>
        <button onClick={createUser}>Register</button>
      </div>
    );
  };