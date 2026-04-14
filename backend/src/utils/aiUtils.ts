export const sanitizeAIResponse = (text: string): string => {
  if (!text) return '';

  const startTag = '<msg>';
  const endTag = '</msg>';

  const lastStartIdx = text.toLowerCase().lastIndexOf(startTag);
  if (lastStartIdx !== -1) {
    const contentAfterStart = text.substring(lastStartIdx + startTag.length);
    const endIdx = contentAfterStart.toLowerCase().indexOf(endTag);
    const result = endIdx !== -1 ? contentAfterStart.substring(0, endIdx) : contentAfterStart;
    if (result.trim()) return result.trim();
  }

  let cleaned = text
    .replace(
      /^(The user|I need to|I should|The response|I will|Wait,|Looking at|Options from|Based on|According to|Plan:|Action:|Thought:|Analysis:).*\n?/gim,
      '',
    )
    .replace(/^(Elegant AI Sommelier|Response must be|Respond in|Format for|Icons:).*$/gim, '');

  const contentStartMarkers = [/^\s*[\*•]/m, /^(Вітаю|Привіт|Hello|Hi|Greetings)/im];
  let firstMarkerIndex = Infinity;

  for (const marker of contentStartMarkers) {
    const match = cleaned.match(marker);
    if (match && match.index !== undefined && match.index < firstMarkerIndex) {
      firstMarkerIndex = match.index;
    }
  }

  if (firstMarkerIndex !== Infinity) {
    cleaned = cleaned.substring(firstMarkerIndex);
  }

  return cleaned.replace(/<.*?>/g, '').trim();
};
