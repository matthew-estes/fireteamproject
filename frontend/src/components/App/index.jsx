import { Route, Routes } from "react-router-dom";

import './styles.css';
import TestPage from '../TestPage';

export default function App() {
    return (
        <>
            <h1>App</h1>
            <Routes>
                <Route path="/" element={<TestPage />} />
            </Routes>
        </>
    );
}