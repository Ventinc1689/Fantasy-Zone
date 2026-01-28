import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '/fantasy_logo.svg'
import enter from '../../assets/next.svg'
import menu from '../../assets/menu.svg'

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="md:pl-35 pt-5 h-full w-full">
            <div className="flex flex-row">
                {/* Header */}
                <div className="flex md:flex-col fixed px-6 md:px-0">
                    <img 
                        src={logo}
                        alt="App Logo"
                        className="h-14 w-14 block md:hidden mr-4"
                    />
                    <p className="page-title py-1">Home</p>
                    <p className="text-[18px] hidden md:block pr-5">An analyzing tool to help you make your best decisions and win a championship!</p>
                </div>

            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex md:flex-row h-full">

                    {/* Welcome Message */}
                    <div className="items-start justify-center flex flex-col text-[45px] md:pr-10">
                        <p>Welcome To</p>
                        <p className="text-amber-400 font-bold">Fantasy Zone!</p>
                        <p className="mt-2 text-[18px]">Home to all fantasy competitors and football fans</p>

                        {/* Get Started Button */}
                        <button className="button-background mt-5 text-[18px] justify-center flex items-center" 
                        onClick={() => navigate('/players')}>
                            Get Started
                            <img
                                src={enter}
                                alt="enter logo"
                                className="inline-block h-7 w-7 ml-3"
                            />
                        </button>
                    </div>

                    {/* App Logo */}
                    <div className="items-center justify-center hidden md:flex mr-10">
                        <img 
                            src={logo}
                            alt="App Logo"
                            className="h-80 w-80 "
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Hero
