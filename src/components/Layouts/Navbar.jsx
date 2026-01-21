import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../public/fantasy_logo.svg'
import Home from '../../assets/home.svg'
import Teams from '../../assets/team.svg'
import Players from '../../assets/person.svg'
import Compare from '../../assets/compare.svg'

const Navbar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    {/* Nav Options */}
    const navOptions = [
        { label: 'Home', icon: Home},
        { label: 'Teams', icon: Teams},
        { label: 'Players', icon: Players},
        { label: 'Compare', icon: Compare}
    ];

    // Closing and navigating on mobile menu
    const changePage = (option) => {
        navigate(`${option.label === 'Home' ? '/' : option.label.toLowerCase()}`);
        onClose();
    }

    return (
        <>
            {/* Side Nav Bar */}
            <nav className="text-white fixed top-0 left-0 w-[120px] h-full z-100 bg-black text-[14px] hidden md:block">
                <div className="flex flex-col items-center">

                    {/* App Logo */}
                    <img 
                        src={logo}
                        alt="App Logo"
                        className="h-20 w-20 mb-8 mt-4"
                    />

                    {/* All nav options with text and logo */}
                    <ul className="space-y-8 hover:cursor-pointer">
                        {navOptions.map((option) => (
                            <li
                                key={option.label}
                                onClick={() => navigate(`${option.label === 'Home' ? '/' : option.label.toLowerCase()}`)}
                                className=""
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <img 
                                        src={option.icon}
                                        alt={`${option.label} icon`}
                                        className="h-11 w-11 hover:border-2 hover:border-amber-400 rounded-lg p-1"
                                    />
                                    <p>{option.label}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed z-200 inset-0 md:hidden">
                    <div className="h-full top-0 left-0 w-full text-white bg-black/80 backdrop-blur-lg">

                        {/* Header Section and Closing Button */}
                        <div className="flex flex-row items-center m-6">
                            <img 
                                src={logo}
                                alt="App Logo"
                                className="h-20 w-20 mr-5"
                            />
                            <p className="text-amber-400 font-bold text-[35px]">Fantasy Zone</p>

                            <button className="ml-auto flex items-center text-white text-3xl font-bold hover:cursor-pointer hover:text-amber-400" onClick={onClose}>
                                X
                            </button>
                        </div>

                        {/* Nav Options */}
                        <nav className="flex w-full px-10 mt-10">
                            <ul className="w-full flex flex-row flex-wrap items-center justify-center gap-10 mb-10 overflow-auto">
                                {navOptions.map((option) => (
                                    <li
                                        key={option.label}
                                        onClick={() => changePage(option)}
                                        className="hover:cursor-pointer"
                                    >
                                        <div className="flex flex-col items-center text-[18px] gap-1">
                                            <img 
                                                src={option.icon}
                                                alt={`${option.label} icon`}
                                                className="h-20 w-20 bg-gray-600 rounded-xl p-2 border-2 border-amber-400"
                                            />
                                            <p>{option.label}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
