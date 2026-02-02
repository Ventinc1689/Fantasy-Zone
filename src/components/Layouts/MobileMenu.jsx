import React from 'react'
import menu from '../../assets/menu.svg'

const MobileMenu = ({ toggleMenu }) => {
    return (
        <>
            {/* Menu icon - visible on all pages when screen is small */}
            <button 
            className="fixed top-6 right-6 z-200 md:hidden"
            onClick={toggleMenu}
            >
                <img 
                    src={menu}
                    alt="menu icon"
                    className="h-10 w-10 hover:cursor-pointer"
                />
            </button>
        </>
    )
}

export default MobileMenu
