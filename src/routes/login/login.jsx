import { useState, useRef } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login() {
    const [open, setOpen] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    if (open) {
        return (
            <div>

                <p>Login</p>

                <input type="text" placeholder="Username" ref={emailRef} />
                <input type="text" placeholder="Password" ref={passwordRef} />
                <button onClick={() => {signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)}}>Log In </button>
                <button onClick={() => setOpen(false)}>Close</button>
            </div>
        );
    }
    else {
        return (

            <button onClick={() => setOpen(true)}>Login</button>
        );
    }
};