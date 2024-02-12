import * as React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import Navbar from "./Navbar";
import PrivacyPolicy from './PrivacyPolicy';
import SpellsPage from './SpellsPage';

function App() {
    return (
        <div>
            <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<SpellsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
