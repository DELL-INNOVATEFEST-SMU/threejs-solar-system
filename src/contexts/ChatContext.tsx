// ChatContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { ChatMessage, ChatState, CommanderPersona } from "../types/chat";
import { PlanetData } from "../../types";
import { chatService } from "../services/chatService";

interface ChatContextType {
  chatState: ChatState;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  toggleChatVisibility: () => void;
  setPlanetContext: (planet: PlanetData | null) => void;
  setInputValue: (value: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

// Commander Sam H. personas for each planet
const commanderPersonas: Record<string, CommanderPersona> = {
  Mercury: {
    name: "Commander Sam H.",
    personality: "Quick-witted, energetic, and always on the move",
    communicationStyle: "Fast-paced, direct, and full of curiosity",
    planetTraits: [
      "swift",
      "messenger",
      "curious",
      "energetic",
      "quick-thinking",
    ],
  },
  Venus: {
    name: "Commander Sam H.",
    personality: "Passionate, artistic, and beauty-focused",
    communicationStyle: "Poetic, intense, and emotionally expressive",
    planetTraits: ["passionate", "artistic", "beautiful", "intense", "devoted"],
  },
  Earth: {
    name: "Commander Sam H.",
    personality: "Balanced, nurturing, and home-focused",
    communicationStyle: "Warm, supportive, and life-affirming",
    planetTraits: ["nurturing", "balanced", "home", "life", "supportive"],
  },
  Mars: {
    name: "Commander Sam H.",
    personality: "Courageous, warrior-like, and persistence-focused",
    communicationStyle: "Bold, determined, and action-oriented",
    planetTraits: [
      "courageous",
      "warrior",
      "persistent",
      "bold",
      "adventurous",
    ],
  },
  Jupiter: {
    name: "Commander Sam H.",
    personality: "Confident, protective, and abundance-focused",
    communicationStyle: "Authoritative, generous, and grand",
    planetTraits: ["confident", "protective", "abundant", "mighty", "generous"],
  },
  Saturn: {
    name: "Commander Sam H.",
    personality: "Patient, structured, and wisdom-oriented",
    communicationStyle: "Measured, disciplined, and thoughtful",
    planetTraits: ["patient", "structured", "wise", "disciplined", "enduring"],
  },
  Uranus: {
    name: "Commander Sam H.",
    personality: "Innovative, eccentric, and creativity-focused",
    communicationStyle: "Unconventional, inventive, and rebellious",
    planetTraits: [
      "innovative",
      "eccentric",
      "creative",
      "rebellious",
      "original",
    ],
  },
  Neptune: {
    name: "Commander Sam H.",
    personality: "Mystical, dreamy, and imagination-driven",
    communicationStyle: "Poetic, mysterious, and wonder-filled",
    planetTraits: [
      "mystical",
      "dreamy",
      "imaginative",
      "mysterious",
      "wondrous",
    ],
  },
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isVisible: true,
    isTyping: false,
    currentPlanetContext: null,
    inputValue: "",
  });

  const generateCommanderResponse = useCallback(
    async (userMessage: string, planetName: string): Promise<string> => {
      const persona = commanderPersonas[planetName] || commanderPersonas.Earth;

      // Get conversation history for context
      const conversationHistory = chatState.messages.slice(-5).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }));

      try {
        return await chatService.generateResponse(
          userMessage,
          planetName,
          persona,
          conversationHistory
        );
      } catch (error) {
        console.error("Failed to generate response:", error);
        return "I apologize, but I'm experiencing communication difficulties. Please try again.";
      }
    },
    [chatState.messages]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !chatState.currentPlanetContext) return;

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "user",
        content: content.trim(),
        timestamp: new Date(),
        planetContext: chatState.currentPlanetContext,
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        inputValue: "",
        isTyping: true,
      }));

      try {
        const commanderResponse = await generateCommanderResponse(
          content,
          chatState.currentPlanetContext
        );

        const commanderMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "commander",
          content: commanderResponse,
          timestamp: new Date(),
          planetContext: chatState.currentPlanetContext,
        };

        setChatState((prev) => ({
          ...prev,
          messages: [...prev.messages, commanderMessage],
          isTyping: false,
        }));
      } catch (error) {
        console.error("Failed to generate response:", error);
        setChatState((prev) => ({
          ...prev,
          isTyping: false,
        }));
      }
    },
    [chatState.currentPlanetContext, generateCommanderResponse]
  );

  const clearChat = useCallback(() => {
    setChatState((prev) => ({
      ...prev,
      messages: [],
    }));
  }, []);

  const toggleChatVisibility = useCallback(() => {
    setChatState((prev) => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  }, []);

  const setPlanetContext = useCallback(
    (planet: PlanetData | null) => {
      const planetName = planet?.name || null;

      if (planetName && planetName !== chatState.currentPlanetContext) {
        // Add welcome message for new planet
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          sender: "commander",
          content: `Commander Sam H. here, reporting from ${planetName} sector. ${
            commanderPersonas[planetName]?.personality ||
            "Ready for your orders."
          }`,
          timestamp: new Date(),
          planetContext: planetName,
        };

        setChatState((prev) => ({
          ...prev,
          currentPlanetContext: planetName,
          messages: [...prev.messages, welcomeMessage],
        }));
      } else if (!planetName) {
        setChatState((prev) => ({
          ...prev,
          currentPlanetContext: null,
        }));
      }
    },
    [chatState.currentPlanetContext]
  );

  const setInputValue = useCallback((value: string) => {
    setChatState((prev) => ({
      ...prev,
      inputValue: value,
    }));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chatState,
        sendMessage,
        clearChat,
        toggleChatVisibility,
        setPlanetContext,
        setInputValue,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
