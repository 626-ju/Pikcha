import { useState, useRef, useEffect } from 'react';

interface UseDropdownReturn {
  isOpen: boolean;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  dropdwonRef: React.RefObject<HTMLDivElement | null>;
}

const useDropdown = (): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdwonRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdwonRef.current && !dropdwonRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isOpen, closeDropdown, toggleDropdown, dropdwonRef };
};

export default useDropdown;
