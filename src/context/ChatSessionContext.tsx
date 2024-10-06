// ChatSessionContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChatSession } from '../components/SideBar';  

type ChatSessionContextType = {
  selectedSession: ChatSession | null;
  setSelectedSession: (session: ChatSession | null) => void;
};

const ChatSessionContext = createContext<ChatSessionContextType | undefined>(undefined);

export const useChatSession = () => {
  const context = useContext(ChatSessionContext);
  if (!context) {
    throw new Error('useChatSession must be used within a ChatSessionProvider');
  }
  return context;
};

export const ChatSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);

  return (
    <ChatSessionContext.Provider value={{ selectedSession, setSelectedSession }}>
      {children}
    </ChatSessionContext.Provider>
  );
};
