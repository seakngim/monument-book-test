import React from 'react';
import logo from '../assets/images/Monument Books Logo.png'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <nav className=" bg-white mx-[100px]">
                <div className="max-w-none py-3 flex flex-wrap items-center justify-between">
                    <Link to="/">
                        <img src={logo} alt="Company Logo" className="w-[80px] h-[80px]" />
                    </Link>
                    <ul className="flex gap-10 font-sans font-bold text-xl text-black">
                        <li>
                            <Link to="/" className="hover:text-blue-800">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/book" className="hover:text-blue-800">
                                Books
                            </Link>
                        </li>
                        <li>
                            <Link to="/about-us" className="hover:text-blue-800">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-blue-800">
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="flex gap-5 items-center">
                        <input type="text" id="search-navbar" className="w-[400px] p-1 px-3 text-xl text-black border border-gray-300 rounded-xl hover:border-blue-800" placeholder="ISBN,Title,Author"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <div className="flex items-center gap-20">
                        <span className="flex font-sans text-xl hover:text-blue-800 hover:cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>Cart(0)
                        </span>
                        <span className="font-sans text-2xl hover:text-blue-800 hover:cursor-pointer">Login</span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;