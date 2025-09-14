// ChatButton.tsx
import React from "react";
import { motion } from "framer-motion";
import { useChat } from "../../contexts/ChatContext";
import { useCameraContext } from "../../contexts/CameraContext";
import { Button } from "@nextui-org/button";

const ChatButton: React.FC = () => {
  const { chatState, toggleChatVisibility } = useChat();
  const { cameraState } = useCameraContext();

  const shouldShowButton =
    !chatState.isVisible &&
    (cameraState === "FREE" || cameraState === "DETAIL_VIEW");

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  if (!shouldShowButton) return null;

  return (
    <motion.div
      className="fixed bottom-20 right-5 z-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={buttonVariants}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button
        onClick={toggleChatVisibility}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-600/80 to-blue-600/80 border border-cyan-400/50 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
        isIconOnly
        size="lg"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-cyan-100"
          >
            <path
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="w-2 h-2 bg-green-400 rounded-full mt-1 animate-pulse"></div>
        </div>
      </Button>
    </motion.div>
  );
};

export default ChatButton;
