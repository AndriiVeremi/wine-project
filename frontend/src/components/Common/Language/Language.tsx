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
      <LanguageTrigger
        onClick={toggleDropdown}
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <GlobeIcon $isOpen={isOpen} />
        <LangText $isOpen={isOpen}>{currentLang}</LangText>
        <DropDownIcon $isOpen={isOpen} />
      </LanguageTrigger>

      {isOpen && (
        <DropdownList role="listbox">
          {languages.map((lang) => (
            <DropdownItem
              key={lang}
              onClick={() => lang === 'En' && handleLangSelect(lang)}
              $active={lang === currentLang}
              role="option"
              aria-selected={lang === currentLang}
              style={{
                opacity: lang !== 'En' ? 0.4 : 1,
                cursor: lang !== 'En' ? 'not-allowed' : 'pointer',
                pointerEvents: lang !== 'En' ? 'none' : 'auto',
              }}
              tabIndex={lang === 'En' ? 0 : -1}
              onKeyDown={(e) => {
                if (lang === 'En' && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleLangSelect(lang);
                }
              }}
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
