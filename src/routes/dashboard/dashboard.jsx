import { getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const q = query(collection(db, "users"), where("userID", "==", auth.currentUser.uid));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      });
    }, []);



    return (
      <div>
        <h1>Dashboard</h1>
        {auth.currentUser ? <div>
          <div>
            <div>Logged in as {auth.currentUser.email}</div>
            <div>Plan: {user ? user.plan : "Loading..."}</div>
            <div>Renewal Date: {user ? user.renewalDate.toDate().toString() : "Loading..."}</div>
            </div>
          </div> 
        
        
        
        : "Shouldn't be able to see this"}
      </div>
    );
  };