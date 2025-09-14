# Three.js Solar System with AI Chat

A stunning 3D solar system built with Three.js, React, and TypeScript, featuring an interactive AI chat system with planet-specific personas.

## Features

- **3D Solar System**: Interactive 3D visualization of all planets with realistic textures and orbital mechanics
- **AI Chat System**: Chat with Commander Sam H. who adapts his personality based on the selected planet
- **Planet-Specific Personas**: Each planet has unique personality traits and communication styles
- **Real-time LLM Integration**: Powered by OpenAI's GPT models for dynamic, contextual responses
- **Responsive UI**: Modern, space-themed interface with smooth animations

## Setup

### Prerequisites

- Node.js 18+
- OpenAI API key (for AI chat functionality)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your OpenAI API key:

   - Create a `.env` file in the root directory
   - Add your OpenAI API key:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key_here
     ```
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

4. Start the development server:
   ```bash
   npm run dev
   ```

### AI Chat Features

The chat system includes:

- **General Chat**: When no planet is selected, Commander Sam H. provides general space exploration guidance
- **Planet-Specific Personas**: Each planet has unique personality traits:
  - **Mercury**: Quick-witted, energetic, fast-paced
  - **Venus**: Passionate, artistic, beauty-focused
  - **Earth**: Balanced, nurturing, home-focused
  - **Mars**: Courageous, warrior-like, persistent
  - **Jupiter**: Confident, protective, abundant
  - **Saturn**: Patient, structured, wisdom-oriented
  - **Uranus**: Innovative, eccentric, creative
  - **Neptune**: Mystical, dreamy, imaginative

### Fallback Mode

If no OpenAI API key is provided, the chat will use pre-written responses that still maintain the planet-specific personalities.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
