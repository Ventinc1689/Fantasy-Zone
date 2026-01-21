import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MobileMenu from './components/Layouts/MobileMenu.jsx'
import Navbar from './components/Layouts/Navbar.jsx'
import Hero from './components/Home/Hero.jsx'
import TeamHome from './components/Teams/TeamHome.jsx'
import PlayerHome from './components/Players/PlayerHome.jsx'

const App = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Toggle Mobile Menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    return (
        <Router>
            <Navbar 
                isOpen={mobileMenuOpen}
                onClose={toggleMobileMenu}
            />

            <MobileMenu 
                toggleMenu={toggleMobileMenu}>  
            </MobileMenu>

            <Routes>
                <Route path='/' element={<Hero />} />
                <Route path='/teams' element={<TeamHome />} />
                <Route path='/players' element={<PlayerHome />} />
            </Routes>
        </Router>
    )
}

export default App
