"use client";

import { InputHTMLAttributes, useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {useDebounce} from "@/shared/hooks/useDebounce";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void;
  placeholder?: string;
  localStorageKey?: string;
  debounceDelay?: number;
  enableUrlUpdate?: boolean; // New prop to control URL updates
}

/**
 * Reusable Search Input Component with Autocomplete
 * 
 * Features:
 * - Customizable search callback
 * - LocalStorage caching of recent searches
 * - Debounced input to reduce API calls
 * - Autocomplete dropdown with recent searches
 * - Accessible design
 * - Enter key submission
 */
const SearchInput = ({
  onSearch,
  placeholder = "Search...",
  localStorageKey = "recentSearches",
  debounceDelay = 300,
  enableUrlUpdate = true, // Default to true to maintain backward compatibility
  className = "",
  ...rest
}: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(localStorageKey, []);
  const debouncedQuery = useDebounce(query, debounceDelay);
  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger search when debounced query changes (only if URL updates are enabled)
  useEffect(() => {
    if (enableUrlUpdate && debouncedQuery.trim() !== "") {
      onSearch(debouncedQuery);
      
      // Add to recent searches if not already present
      setRecentSearches(prev => {
        const filtered = prev.filter(item => item !== debouncedQuery);
        return [debouncedQuery, ...filtered].slice(0, 5); // Keep only last 5
      });
    } else if (enableUrlUpdate && debouncedQuery === "") {
      // Clear search when query is empty
      onSearch("");
    }
  }, [debouncedQuery, onSearch, setRecentSearches, enableUrlUpdate]);

  // Handle Enter key submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim() !== "") {
        onSearch(query);
        
        // Add to recent searches if not already present
        setRecentSearches(prev => {
          const filtered = prev.filter(item => item !== query);
          return [query, ...filtered].slice(0, 5); // Keep only last 5
        });
      }
    }
  };

  // Handle selection of an autocomplete item
  const handleSelect = (item: string) => {
    setQuery(item);
    setIsFocused(false);
    inputRef.current?.blur();
    onSearch(item); // Trigger search immediately when selecting from autocomplete
  };

  // Filter recent searches based on current query
  const filteredSearches = recentSearches.filter(item => 
    item.toLowerCase().includes(query.toLowerCase()) && item !== query
  );

  const inputClasses = `
    input
    input-bordered
    w-full
    pl-10
    pr-4
    transition-all
    duration-200
    ${className}
  `.trim();

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => 
            // Small delay to allow click on autocomplete items
            setTimeout(() => setIsFocused(false), 150)
          }
          placeholder={placeholder}
          className={inputClasses}
          {...rest}
        />
      </div>
      
      {/* Autocomplete dropdown */}
      {isFocused && filteredSearches.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200">
          <ul className="py-1 max-h-60 overflow-auto">
            {filteredSearches.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onMouseDown={() => handleSelect(item)} // Using onMouseDown to prevent blur before selection
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
