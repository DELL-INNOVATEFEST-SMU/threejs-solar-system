// CompressedChat.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../../contexts/ChatContext";
import { useCameraContext } from "../../contexts/CameraContext";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const CompressedChat: React.FC = () => {
  const { chatState, sendMessage, setInputValue, toggleChatVisibility } =
    useChat();
  const { cameraState } = useCameraContext();
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async () => {
    if (chatState.inputValue.trim()) {
      await sendMessage(chatState.inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const shouldShowChat = chatState.isVisible;

  const variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    minimized: { height: "60px", y: 0 },
    expanded: { height: "384px", y: 0 },
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {shouldShowChat && (
        <motion.div
          className="fixed top-80 right-5 w-80 z-40"
          initial="hidden"
          animate={isMinimized ? "minimized" : "visible"}
          exit="hidden"
          variants={variants}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 px-4 py-3 border-b border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-300 font-mono text-sm font-bold">
                    COMMS TERMINAL
                  </span>
                  <span className="text-cyan-400 text-xs">CH-1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-cyan-300 hover:text-cyan-100 min-w-0 px-2"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? "▲" : "▼"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-cyan-300 hover:text-cyan-100 min-w-0 px-2"
                    onClick={toggleChatVisibility}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="h-64 overflow-y-auto bg-black/20 p-3 space-y-2">
                  {chatState.messages.length === 0 ? (
                    <div className="text-center text-cyan-400/60 text-sm py-8">
                      <div className="font-mono">[INCOMING TRANSMISSION]</div>
                      <div className="text-xs mt-2">
                        Awaiting communication...
                      </div>
                    </div>
                  ) : (
                    chatState.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col space-y-1 ${
                          message.sender === "user"
                            ? "items-end"
                            : "items-start"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-cyan-400 text-xs font-mono">
                            {message.sender === "user"
                              ? "USER"
                              : "Commander Sam H."}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <div
                          className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                            message.sender === "user"
                              ? "bg-cyan-600/20 text-cyan-100 border border-cyan-500/30"
                              : "bg-gray-800/50 text-cyan-200 border border-gray-600/30"
                          }`}
                        >
                          {message.content}
                        </div>
                      </motion.div>
                    ))
                  )}

                  {/* Typing Indicator */}
                  {chatState.isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-cyan-400 text-xs font-mono">
                        Commander Sam H.
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-cyan-500/30 p-3 bg-gray-900/50">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={chatState.inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                      classNames={{
                        input:
                          "text-cyan-100 placeholder:text-cyan-400/60 bg-transparent",
                        inputWrapper:
                          "bg-gray-800/50 border-cyan-500/30 hover:border-cyan-400/50 focus-within:border-cyan-400",
                      }}
                      disabled={chatState.isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={
                        !chatState.inputValue.trim() || chatState.isTyping
                      }
                      className="bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600/30"
                      size="sm"
                    >
                      SEND
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Footer */}
            <div className="border-t border-cyan-500/30 px-4 py-2 bg-gray-900/30">
              <div className="flex justify-between items-center text-xs text-cyan-400/80">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span>PWR:</span>
                    <div className="w-12 h-1 bg-gray-700 rounded">
                      <div className="w-3/4 h-full bg-orange-400 rounded"></div>
                    </div>
                    <span>75%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>SYS:</span>
                    <div className="w-12 h-1 bg-gray-700 rounded">
                      <div className="w-full h-full bg-green-400 rounded"></div>
                    </div>
                    <span>100%</span>
                  </div>
                </div>
                <div className="text-cyan-400/60">
                  LOC: {chatState.currentPlanetContext || "DEEP SPACE"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompressedChat;
