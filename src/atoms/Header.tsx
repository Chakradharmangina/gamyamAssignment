import React, { useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";

interface HeaderProps {
  appName?: string;
  onSearch: (query: string) => void;
  onToggleView: () => void;
  isListView: boolean;
  onAddProduct: () => void;
}

const Header: React.FC<HeaderProps> = ({
  appName = "My App",
  onSearch,
  onToggleView,
  onAddProduct,
  isListView
}) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    onSearch?.(inputValue);
  };

  return (
    <header className="header">
      <h1 className="header__title">{appName}</h1>

      <div className="header__controls">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="header__search"
        />

        <button onClick={onToggleView} className="header__toggle">
          {isListView ? (
            <>
              <FaList /> <span>List</span>
            </>
          ) : (
            <>
              <FaThLarge /> <span>Card</span>
            </>
          )}
        </button>

        <button className="add-btn" onClick={onAddProduct}>
          + Add Product
        </button>
      </div>
    </header>
  );
};

export default Header;
