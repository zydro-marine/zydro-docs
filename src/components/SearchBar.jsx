import { useState } from 'react';
import * as TbIcons from 'react-icons/tb';
import './SearchBar.scss';

function SearchBar({ placeholder = 'Search documentation...', onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="search-bar">
      <TbIcons.TbSearch className="search-bar-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        className="search-bar-input"
      />
    </div>
  );
}

export default SearchBar;

