import { useState, useRef, useEffect } from 'react';
import {
  LanguageWrapper,
  LanguageTrigger,
  LangText,
  DropDownIcon,
  DropdownList,
  DropdownItem,
  GlobeIcon,
} from './Language.styled';

const Language = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('En');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const languages = ['En', 'Ua'];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLangSelect = (lang: string) => {
    setCurrentLang(lang);
    setIsOpen(false);
    console.log(`Language changed to: ${lang}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <LanguageWrapper ref={wrapperRef}>
      <LanguageTrigger onClick={toggleDropdown}>
        <GlobeIcon />
        <LangText>{currentLang}</LangText>
        <DropDownIcon $isOpen={isOpen} />
      </LanguageTrigger>

      {isOpen && (
        <DropdownList>
          {languages.map((lang) => (
            <DropdownItem
              key={lang}
              onClick={() => handleLangSelect(lang)}
              $active={lang === currentLang}
            >
              {lang}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </LanguageWrapper>
  );
};

export default Language;
