import React from 'react'
import { format } from 'date-fns'

export type ChatBubbleProps = {
  action: string  // "USER" or "AI"
  content: string
  timestamp: string
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ action, content, timestamp }) => {
  const formattedTime = format(new Date(timestamp), 'HH:mm')  // Format timestamp to hours:minutes

  return (
    <div className={`flex flex-col ${action === 'USER' ? 'items-end' : 'items-start'} mb-4`}>
      <div
        className={`px-3 py-2 max-w-[70%] text-sm leading-[21px] w-[272px] ${
          action === 'USER' ? 'bg-[#2E3B5B] text-white shadow-custom-purple rounded-tl-[10px] rounded-b-[10px]' : 'bg-[#000929] text-white shadow-custom-shadow rounded-tr-[10px] rounded-b-[10px] '
        }`}
      >
        {content}
      </div>
      <span className="text-xs text-gray-500 mt-1">{formattedTime}</span>
    </div>
  )
}

export default ChatBubble