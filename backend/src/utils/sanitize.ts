import sanitizeHtml from 'sanitize-html';

interface ExtendedOptions extends sanitizeHtml.IOptions {
  nonEmptyTags?: string[];
  allowEmptyTags?: string[];
}

export const sanitize = (html: string): string => {
  const options: ExtendedOptions = {
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
      'span',
    ],
    allowedAttributes: {
      '*': ['style', 'class'],
      p: ['style'],
      h2: ['style'],
      h3: ['style'],
      div: ['style'],
      span: ['style'],
    },
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
    allowEmptyTags: ['p', 'br', 'span'],
    nonEmptyTags: [],
  };

  return sanitizeHtml(html, options);
};
