import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingImage from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage()
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }

    setInputText('');
    setIsLoading(true);

    // set temporary chat messages and input text
    setChatMessages([
      ...chatMessages, {
      id: crypto.randomUUID(),
      sender: "user",
      message: inputText,
    }, {
      id: crypto.randomUUID(),
      sender: "robot",
      message: <img src={LoadingImage} className="loading-spinner" />,
    }])

    const response = await Chatbot.getResponseAsync(inputText);

    // set chat messages and input text
    setChatMessages([
      ...chatMessages, {
      id: crypto.randomUUID(),
      sender: "user",
      message: inputText,
    }, {
      id: crypto.randomUUID(),
      sender: "robot",
      message: response,
    }])
    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to ChatBot"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}