// chatService.ts
import { CommanderPersona } from '../types/chat';

export interface ChatServiceConfig {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

export class ChatService {
  private config: ChatServiceConfig;

  constructor(config: ChatServiceConfig = {}) {
    this.config = {
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-3.5-turbo',
      ...config
    };
  }

  async generateResponse(
    userMessage: string,
    planetContext: string,
    persona: CommanderPersona,
    conversationHistory: Array<{ role: string; content: string }> = []
  ): Promise<string> {
    try {
      // For now, we'll use the mock responses from the context
      // In a real implementation, this would call an actual LLM API
      return await this.generateMockResponse(userMessage, planetContext, persona);
    } catch (error) {
      console.error('Chat service error:', error);
      throw new Error('Failed to generate response');
    }
  }

  private async generateMockResponse(
    userMessage: string,
    planetContext: string,
    persona: CommanderPersona
  ): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = {
      Mercury: [
        "Quick as lightning! I'm racing through space and catching every signal. What's your next move?",
        "Speed is my middle name! I'm already three steps ahead of you. What's the plan?",
        "Fast and furious - that's how we do it out here! What's the latest intel?",
        "I'm zipping around the solar system faster than you can blink! What's the mission?",
        "Time is of the essence! I'm moving at the speed of thought. What do you need?",
        "Swift and sure - that's the Mercury way! What's our next adventure?"
      ],
      Venus: [
        "Ah, the beauty of space never ceases to amaze me. What artistic vision are you pursuing?",
        "Passion drives everything in this universe. Tell me, what sets your heart on fire?",
        "In this vast cosmos, beauty and love are the only constants. What's your dream?",
        "The stars themselves seem to dance for us. What moves your soul today?",
        "Golden clouds and endless skies - what beauty shall we create together?",
        "Love and art transcend all boundaries. What masterpiece are we crafting?"
      ],
      Earth: [
        "Home sweet home! There's nothing quite like the comfort of familiar territory. How can I help?",
        "Balance is everything in this universe. What do you need to find your center?",
        "Life finds a way, even in the harshest conditions. What's your next step?",
        "From one Earthling to another, I'm here to support you. What's on your mind?",
        "The cradle of life - what new growth shall we nurture today?",
        "Gentle strength and steady progress. What foundation are we building?"
      ],
      Mars: [
        "Courage is the fuel that drives us forward! What battle are we facing today?",
        "Red planet, red blood - we don't back down from any challenge! What's the mission?",
        "Persistence pays off in the end. What goal are we conquering together?",
        "Warrior spirit never dies! What adventure are we embarking on?",
        "Iron will and unbreakable determination. What frontier shall we conquer?",
        "The red dust of Mars runs through my veins. What challenge awaits us?"
      ],
      Jupiter: [
        "Mighty and magnificent - that's how we roll in this part of space! What's the grand plan?",
        "I protect what matters most. What do you need me to watch over?",
        "Abundance flows through the universe. What resources do you need?",
        "Confidence is key to success. What are we building together?",
        "King of the giants - what kingdom shall we rule today?",
        "Vast storms and greater protection. What shall we shelter from the cosmic winds?"
      ],
      Saturn: [
        "Patience and precision - the rings teach us that structure creates beauty. What's our next lesson?",
        "Slow and steady wins the cosmic race. What wisdom are we seeking?",
        "Discipline brings order to chaos. What structure shall we build?",
        "The rings remind us that boundaries can be beautiful. What limits shall we embrace?",
        "Wisdom comes with time, like the slow turn of my rings. What knowledge do you seek?",
        "Order and grace - what harmony shall we create in this universe?"
      ],
      Uranus: [
        "Tilted perspective brings fresh insights! What unconventional approach shall we try?",
        "Innovation is my middle name - what crazy idea are we exploring today?",
        "Eccentricity is just another word for genius! What brilliant madness shall we attempt?",
        "Thinking sideways opens new dimensions. What impossible thing shall we make possible?",
        "Rebellion against the ordinary - what extraordinary path shall we forge?",
        "Originality is the spice of the cosmos. What unique creation shall we birth?"
      ],
      Neptune: [
        "Deep blue mysteries call to us from the edge of space. What secrets shall we uncover?",
        "Dreams and imagination are the true currency of the universe. What vision shall we pursue?",
        "The depths of space whisper ancient wisdom. What mysteries shall we explore?",
        "Intuition guides us through the cosmic seas. What inner voice shall we follow?",
        "Wonder and awe fuel the soul. What beauty shall we discover today?",
        "The unknown beckons with infinite possibility. What adventure calls to your spirit?"
      ]
    };

    const planetResponses = responses[planetContext as keyof typeof responses] || responses.Earth;
    return planetResponses[Math.floor(Math.random() * planetResponses.length)];
  }

  // Future implementation for real LLM API
  private async callLLMAPI(
    messages: Array<{ role: string; content: string }>,
    persona: CommanderPersona
  ): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('API key not configured');
    }

    const systemPrompt = `You are ${persona.name}, a space commander with the following personality:
    - ${persona.personality}
    - Communication style: ${persona.communicationStyle}
    - Key traits: ${persona.planetTraits.join(', ')}
    
    Respond as this character would, maintaining the persona while being helpful and engaging. Keep responses concise but characterful.`;

    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I cannot respond at this time.';
  }
}

export const chatService = new ChatService();
