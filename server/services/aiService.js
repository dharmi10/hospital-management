// server/services/aiService.js

export const triageSymptoms = async (symptomsText) => {
  // Simple Logic for now (You can connect DeepSeek/OpenAI here later)
  
  const text = symptomsText.toLowerCase();
  
  if (text.includes('chest') || text.includes('heart') || text.includes('breathing')) {
    return { priority: 'Critical', score: 95 };
  }
  
  if (text.includes('fever') || text.includes('severe') || text.includes('vomit')) {
    return { priority: 'High', score: 70 };
  }

  return { priority: 'Normal', score: 30 };
};