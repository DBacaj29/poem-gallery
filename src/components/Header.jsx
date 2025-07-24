import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = ({ onSearch, onFilter }) => {
    const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchInput);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput, onSearch]);

  return (
    <header className="header">
      <img src="/icon.png" alt="logo" />
      <Link to="/" className="logo"> Poetry Gallery</Link>
      <nav>
        <Link to="/add"> <i className="bi bi-plus-circle"></i>New Poem</Link>
      </nav>

      <div className="header-controls">
        <input
          type="text"
          placeholder="Search title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
          <select onChange={(e) => onFilter(e.target.value)}> 
            <option value="all">All</option>
            <option value="en">English</option>
            <option value="fa">فارسی</option>
            <option value="sq">Shqip</option>
            <option value="sv">Svenska</option>
          </select>
      </div>
    </header>
  );
};

export default Header;
