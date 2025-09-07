import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DiffViewer from "./components/DiffViewer/DiffViewer";
import MainLayout from "./layouts/MainLayout";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/textcompare" replace />} />
                <Route element={<MainLayout />}>
                    <Route path="/textcompare" element={<DiffViewer />} />
                    <Route path="/check" element={<div>მალე დაემატება</div>} />
                    <Route path="/voice" element={<div>მალე დაემატება</div>} />
                    <Route path="/voice-text" element={<div>მალე დაემატება</div>} />
                    <Route path="/pdf" element={<div>მალე დაემატება</div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
