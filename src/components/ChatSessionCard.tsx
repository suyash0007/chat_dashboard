import React from 'react';
import { formatDistanceToNow } from 'date-fns';

type ChatSessionCardProps = {
  id: number;
  name: string;
  lastMessageTimestamp: string;
  isActive: boolean;
  onClick: (id: number) => void; // To handle session selection
};

const formatTimeAgo = (timestamp: string): string => {
  const messageDate = new Date(timestamp);
  if (isNaN(messageDate.getTime())) {
    return 'Invalid date'; 
  }
  return formatDistanceToNow(messageDate, { addSuffix: true });
};

const ChatSessionCard: React.FC<ChatSessionCardProps> = ({ id, name, lastMessageTimestamp, isActive, onClick }) => {
  return (
    <div className="mr-5">
      <div
        className={`session-card flex items-center w-full rounded-[10px] px-4 py-2 cursor-pointer h-auto sm:h-20 
        ${isActive ? 'bg-[#C8C8FF]' : 'bg-white'} my-2.5`}
        onClick={() => onClick(id)}
      >
        <div className="flex-grow flex justify-between items-center">
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <h3 className="text-sm font-medium sm:text-base">{name}</h3>
            <p className="text-xs text-[#76767CCC] sm:text-sm mt-1 sm:mt-0">
              {formatTimeAgo(lastMessageTimestamp)}
            </p>
          </div>
        </div>
      </div>
      <div className="border-b-[0.5px] border-[#76767ccc] mx-10"></div>
    </div>
  );
};

export default ChatSessionCard;
