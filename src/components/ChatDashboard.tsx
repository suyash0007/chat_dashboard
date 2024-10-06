import React from 'react';
import ChatBubble from './ChatBubble';
import { useChatSession } from '../context/ChatSessionContext';

const ChatDashboard: React.FC = () => {
  const { selectedSession } = useChatSession();

  return (
    <div className="chat-dashboard flex flex-col p-4 h-screen overflow-y-auto sm:mt-6">
      <h2 className="font-semibold text-lg mb-4 text-center md:text-left">
        {selectedSession?.name || 'No session selected'}
      </h2>

      <div className="flex flex-col space-y-4 w-full md:max-w-3xl mx-auto">
        {selectedSession?.messages.map((message) => (
          <ChatBubble
            key={message.id}
            action={message.action}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatDashboard;
