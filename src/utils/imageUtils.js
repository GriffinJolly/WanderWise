import { GoogleGenerativeAI } from "@google/generative-ai";

export const fetchDestinationImages = async (destination) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const prompt = `Generate a JSON array of 6 popular tourist spots and hotels in ${destination}. 
    Each item should have: name, description, type (hotel/attraction), and an imageUrl.
    Focus on high-quality, representative locations.`;

    const result = await model.generateContent(prompt);
    const response = JSON.parse(result.response.text());
    
    return response.map(item => ({
      url: item.imageUrl,
      description: item.name,
      type: item.type
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}; 