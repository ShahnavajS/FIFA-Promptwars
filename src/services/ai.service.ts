import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
  role: "user" | "model" | "system";
  text: string;
}

export class AIService {
  private static client: GoogleGenerativeAI | null = null;

  private static getClient(): GoogleGenerativeAI {
    if (!this.client) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured on the server.");
      }

      this.client = new GoogleGenerativeAI(apiKey);
    }
    return this.client;
  }

  /**
   * Generates a text response using Gemini
   * @param prompt User prompt string
   * @param systemInstruction Optional system instructions to anchor the model behavior
   */
  static async generateText(prompt: string, systemInstruction?: string): Promise<string> {
    try {
      const client = this.getClient();
      const model = client.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        systemInstruction,
      });
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw new Error("AI generation failed. Please try again.");
    }
  }

  /**
   * Starts a conversational session with Gemini
   * @param history Chat history
   * @param systemInstruction System instruction for the conversation context
   */
  static async startChat(history: ChatMessage[], systemInstruction?: string) {
    try {
      const client = this.getClient();
      const model = client.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const formattedHistory = history.map((msg) => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.text }],
      }));

      const chat = model.startChat({
        history: formattedHistory,
        systemInstruction: systemInstruction
          ? { parts: [{ text: systemInstruction }], role: "system" }
          : undefined,
      });

      return chat;
    } catch (error) {
      console.error("Gemini Chat Initialization Error:", error);
      throw new Error("Failed to start AI chat session.");
    }
  }
}
