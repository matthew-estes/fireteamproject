import { useState, useEffect } from "react";
import { getTest } from "../../../utils/backend";

function TestPage() {
    const [testMessage, setTestMessage] = useState("message from database via back end coming soon...");

    useEffect( () => {
        getTest().then( (result) => {
            setTestMessage(result);
        });
    });

    return (
        <div>
            <h1>Test Page</h1>
            <p>{testMessage}</p>
        </div>
    );
}

export default TestPage;