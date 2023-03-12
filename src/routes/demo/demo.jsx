import "./demo.css"
import { useState, useRef } from 'react'

export default function Demo() {

    const [evaluation, setEvaluation] = useState(null);
    const demoRef = useRef();

    const evaluate = () => {
        setEvaluation("Loading...");
        const query = demoRef.current.value.replaceAll(" ", "+");
        fetch("https://us-central1-emailai-80175.cloudfunctions.net/demo-evaluate?text=" + query, { method: 'GET', mode: "cors" }).then(response => {
            response.text().then(response => {
                console.log(response);
                setEvaluation(response == "1.0" ? "Real" : "Spam");
            });
        }
        );

    };

    return (
        <div>
            <div>

                <h1>Demo</h1>
                <input type="text" placeholder="Query text" className="demoInput" ref={demoRef} />
                <button className="demoButton" onClick={evaluate}>Query</button>
            </div>
            <div className="demoOutput">
                <p>{evaluation}</p>
            </div>
        </div>
    );
};