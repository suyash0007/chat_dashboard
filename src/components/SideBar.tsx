import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ChatSessionCard from './ChatSessionCard';
import { useChatSession } from '../context/ChatSessionContext';
import SearchBar from './SearchBar'; 
const baseUrl=import.meta.env.VITE_API_BASE_URL
export type ChatSession = {
  id: number;
  name: string;
  messages: {
    id: number;
    action: string;
    content: string;
    timestamp: string;
  }[];
};

const Sidebar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { selectedSession, setSelectedSession } = useChatSession();
  const [searchQuery, setSearchQuery] = useState(''); 

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch chat sessions on mount and on page update
  useEffect(() => {
    fetchChatSessions(page);
  }, [page]);

  // Select the first chat session by default
  useEffect(() => {
    if (chatSessions.length > 0 && !selectedSession) {
      setSelectedSession(chatSessions[0]);
    }
  }, [chatSessions, selectedSession, setSelectedSession]);

  // Fetch chat sessions based on pagination
  const fetchChatSessions = async (page: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/chat_sessions?page=${page}&per_page=10`);
      const newSessions = response.data.chat_sessions;

      setChatSessions((prev) => [...prev, ...newSessions]);
      setHasMore(newSessions.length > 0);
    } catch (error) {
      console.error("Error fetching chat sessions", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle infinite scrolling
  const handleScroll = () => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      setPage((prev) => prev + 1);
    }
  };

  // Handle session click
  const handleSessionClick = (id: number) => {
    const session = chatSessions.find((s) => s.id === id);
    if (session) {
      setSelectedSession(session);
      if (onClose) onClose(); // Close sidebar on mobile when a session is selected
    }
  };

  // Filter chat sessions by search query
  const filteredSessions = chatSessions.filter((session) =>
    session.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen ml-5 mt-6">
      <div
        ref={containerRef}
        className="h-[95%] overflow-y-auto w-full bg-white"
        onScroll={handleScroll}
      >
        <h2 className="p-4 font-semibold text-2xl">Messaging</h2>

        <div className="sticky top-0 z-10 bg-white shadow-md">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

        <div className="session-list">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => {
              const lastMessageTimestamp = session.messages?.[session.messages.length - 1]?.timestamp || '';

              return (
                <ChatSessionCard
                  key={session.id}
                  id={session.id}
                  name={session.name}
                  lastMessageTimestamp={lastMessageTimestamp}
                  isActive={selectedSession?.id === session.id}
                  onClick={() => handleSessionClick(session.id)}
                />
              );
            })
          ) : (
            <p className="text-center p-4">No sessions found</p>
          )}
          {loading && <p className="text-center p-4">Loading...</p>}
          {!hasMore && !loading && <p className="text-center p-4">No more sessions</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
