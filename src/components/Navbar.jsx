import { NavLink } from 'react-router-dom';

function linkClass({ isActive }) {
  return isActive ? 'font-semibold text-orange-500' : 'text-white hover:text-orange-500';
}

// Navbar: site-wide navigation. NavLink highlights the current page.
// On small screens the brand and links stack; from the sm breakpoint up they sit in one row.
function Navbar() {
  return (
    <nav className="flex flex-col items-center gap-3 bg-black px-4 py-4 sm:flex-row sm:justify-between sm:px-8 sm:py-5">
      <NavLink to="/" className="text-2xl font-bold text-white">
        Coffee R Us
      </NavLink>
      <div className="flex gap-4 sm:gap-6">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/coffee" className={linkClass}>Coffee</NavLink>
        <NavLink to="/add" className={linkClass}>Add Product</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
