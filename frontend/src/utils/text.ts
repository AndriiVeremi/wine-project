export const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

export const truncateText = (text: string, limit: number = 100) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};
