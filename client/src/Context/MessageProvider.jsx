import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  // const [messages, setMessages] = useState([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const MessageState = () => {
  return useContext(MessageContext);
};

export default MessageProvider;
