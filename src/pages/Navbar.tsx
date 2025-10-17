import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import { Menu, X } from 'lucide-react';


const navLinks = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Project", path: "/project" },
];


const Navbar = () => {
    useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)] shadow-md">
                <div className='container mx-auto px-4 md:px-8 lg:px-16 py-2'>
                    <div className='flex justify-between items-center mb-4'>
                        <div className='flex items-center gap-4'>
                            <div>
                                <NavLink to='/' onClick={closeMenu}>
                                    <p className='font-bold'>EketeUg</p>
                                </NavLink>
                                
                                {/* Desktop Navigation */}
                                <div className="hidden md:flex items-center">
                                    <ul className="flex items-center space-x-8">
                                        {navLinks.map((link) => (
                                            <li
                                                key={link.name}
                                                className="text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-300"
                                            >
                                                <NavLink to={link.path} className="hover:text-[--text-primary]">
                                                    {link.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-6'>
                            <ThemeToggle />
                            
                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMenu}
                                className="md:hidden flex items-center gap-2 text-[--text-primary] hover:text-[--text-secondary] transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed top-16 left-0 right-0 z-40 bg-[var(--bg)] shadow-md md:hidden">
                    <ul className="flex flex-col space-y-0">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block px-4 md:px-8 lg:px-16 py-4 border-b border-[var(--bg-secondary)] transition-colors ${
                                            isActive
                                                ? 'text-[--text-primary] bg-[var(--bg-secondary)]'
                                                : 'text-[--text-secondary] hover:text-[--text-primary] hover:bg-[var(--bg-secondary)]'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;