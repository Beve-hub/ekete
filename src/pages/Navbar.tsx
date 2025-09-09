import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';


const navLinks = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Project", path: "/project" },
];


const Navbar = () => {
    useTheme(); 
    
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)] shadow-md">
            <div className='container mx-auto px-4 md:px-8 lg:px-16 py-2'>
                <div className='flex justify-around items-end mb-4'>
                    <div className='flex items-center gap-4'>

                        

                        <div>
                            <NavLink to='/'>
                                <p className='font-bold'>EketeUg</p>
                            </NavLink>
                            {/* Desktop Navigation */}
                            <div className="md:flex items-center">
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
                       
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;