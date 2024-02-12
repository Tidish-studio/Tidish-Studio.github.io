import * as React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import PrivacyPolicy from './PrivacyPolicy';
import SpellsPage from './SpellsPage';

function App() {
    return (
        <div>
            <HashRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<SpellsPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
