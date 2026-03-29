import { describe, it, expect } from 'vitest';
import { stripHtml, truncateText } from '@/utils/text';
import { calcProgress } from '@/utils/wineHelpers';

describe('text utils', () => {
  describe('stripHtml', () => {
    it('should remove HTML tags from string', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      expect(stripHtml(html)).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(stripHtml('')).toBe('');
    });

    it('should handle string without HTML', () => {
      const text = 'Plain text without tags';
      expect(stripHtml(text)).toBe(text);
    });

    it('should handle nested tags', () => {
      const html = '<div><p><span>Nested</span> content</p></div>';
      expect(stripHtml(html)).toBe('Nested content');
    });
  });

  describe('truncateText', () => {
    it('should truncate text longer than limit', () => {
      const text = 'This is a very long text that should be truncated';
      expect(truncateText(text, 10)).toBe('This is a ...');
    });

    it('should not truncate text shorter than limit', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe(text);
    });

    it('should use default limit of 100', () => {
      const text = 'a'.repeat(150);
      expect(truncateText(text).length).toBe(103);
    });

    it('should handle exact limit length', () => {
      const text = 'Exactly 10';
      expect(truncateText(text, 10)).toBe('Exactly 10');
    });
  });
});

describe('wineHelpers', () => {
  describe('calcProgress', () => {
    it('should return 20 for Low/Light/Soft', () => {
      expect(calcProgress('Low')).toBe(20);
      expect(calcProgress('Light')).toBe(20);
      expect(calcProgress('Soft')).toBe(20);
    });

    it('should return 40 for Medium-Low variants', () => {
      expect(calcProgress('Medium-Low')).toBe(40);
      expect(calcProgress('Medium-Light')).toBe(40);
      expect(calcProgress('Medium-Soft')).toBe(40);
    });

    it('should return 60 for Medium', () => {
      expect(calcProgress('Medium')).toBe(60);
    });

    it('should return 80 for Medium-High', () => {
      expect(calcProgress('Medium-High')).toBe(80);
    });

    it('should return 100 for High/Full-bodied/Full/Very High', () => {
      expect(calcProgress('High')).toBe(100);
      expect(calcProgress('Full-bodied')).toBe(100);
      expect(calcProgress('Full')).toBe(100);
      expect(calcProgress('Very High')).toBe(100);
    });

    it('should return 0 for unknown values', () => {
      expect(calcProgress('Unknown')).toBe(0);
      expect(calcProgress('')).toBe(0);
    });
  });
});
