export const sanitizeAIResponse = (text: string): string => {
  if (!text) return JSON.stringify({ text: '', wines: [], tours: [], wineries: [] });

  const jsonRegex = /\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/g;
  const matches = text.match(jsonRegex);

  if (matches) {
    for (let i = matches.length - 1; i >= 0; i--) {
      try {
        const candidate = matches[i];
        JSON.parse(candidate);
        return candidate;
      } catch {
        continue;
      }
    }
  }

  const cleaned = text
    .replace(/```json\s*|\s*```/gim, '')
    .replace(
      /^(The user|I need to|I should|The response|I will|Wait,|Looking at|Options from|Based on|According to|Plan:|Action:|Thought:|Analysis:).*\n?/gim,
      '',
    )
    .replace(
      /^(Elegant AI Sommelier|Response must be|Respond in|Format for|Icons:|JSON structure:).*$/gim,
      '',
    );

  return JSON.stringify({
    text: cleaned.replace(/<.*?>/g, '').trim(),
    wines: [],
    tours: [],
    wineries: [],
  });
};
