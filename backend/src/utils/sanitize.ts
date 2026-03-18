import sanitizeHtml from 'sanitize-html';

export const sanitize = (html: string): string => {
  return sanitizeHtml(html, {
    allowedTags: [
      'b',
      'i',
      'em',
      'strong',
      'strike',
      'p',
      'ul',
      'ol',
      'li',
      'h2',
      'h3',
      'blockquote',
      'br',
      'div',
    ],
    allowedAttributes: {
      '*': ['style', 'class'], // useful if we add alignment later
      p: ['style'],
      h2: ['style'],
      h3: ['style'],
      div: ['style'],
    },
    allowedStyles: {
      '*': {
        // Match HEX, RGB, or text-align
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
  });
};
