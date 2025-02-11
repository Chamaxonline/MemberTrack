import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateMember from './pages/CreateMember';
import MemberList from './pages/MemberList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateMember />} />
        <Route path="/members" element={<MemberList />} />
      </Routes>
    </Router>
  );
}

export default App;