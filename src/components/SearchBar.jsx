import { useState } from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { TbSearch } from 'react-icons/tb';
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
    <Box className="search-bar" width="100%">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <TbSearch />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          className="search-bar-input"
        />
      </InputGroup>
    </Box>
  );
}

export default SearchBar;

