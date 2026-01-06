import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage.jsx';
import './ChatMessages.css';

function useAutoScroll(dependencies) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }), dependencies;

  return chatMessagesRef
}

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}
    >
      {chatMessages.map(({id, sender, message}) => {
        return (
          <ChatMessage
            sender={sender}
            message={message}
            key={id}
          />
        );
      })}
    </div>
  );
}