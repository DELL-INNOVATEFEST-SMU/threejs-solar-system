// chat.ts
export interface ChatMessage {
  id: string;
  sender: 'user' | 'commander';
  content: string;
  timestamp: Date;
  planetContext?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isVisible: boolean;
  isTyping: boolean;
  currentPlanetContext: string | null;
  inputValue: string;
}

export interface CommanderPersona {
  name: string;
  personality: string;
  communicationStyle: string;
  planetTraits: string[];
}
