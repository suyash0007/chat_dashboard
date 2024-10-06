import React from 'react';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4 pr-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search sessions..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
