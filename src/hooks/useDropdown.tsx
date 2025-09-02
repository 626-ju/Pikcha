import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';

interface UseDropdownReturn {
  isOpen: boolean;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLButtonElement | null>;
}

const useDropdown = (): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isOpen, closeDropdown, toggleDropdown, setIsOpen, dropdownRef };
};

export default useDropdown;
