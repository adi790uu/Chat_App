import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SocketComponent = () => {
  useEffect(() => {
    const socket = io('http://localhost:4000'); // Replace with your server URL

    // Socket.IO event listeners
    socket.on('connection', () => {
      console.log('Connected to the server');
    });

    socket.on('message', data => {
      console.log('Received a message:', data);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Socket.IO Example</div>;
};

export default SocketComponent;
