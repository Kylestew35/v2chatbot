import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const Chatbot = () => {
  const [input, setInput] = useState('Enter your question here');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === '' || input === 'Enter your question here') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      console.log('Sending message:', input);
      const res = await axios.post('/api/chat', { message: input });
      console.log('Received response:', res.data.response);

      const botMessage = { sender: 'bot', text: res.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput(''); // Clear the input field after sending
  };

  const handleFocus = () => {
    if (input === 'Enter your question here') {
      setInput(''); // Clear the input value when the user clicks on the field
    }
  };

  const handleBlur = () => {
    if (input === '') {
      setInput('Enter your question here'); // Restore the placeholder if input is empty
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (e.g., form submission)
      handleSend(); // Call the handleSend function when Enter is pressed
    }
  };
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: 2
      }}
    >
      <Typography variant="h4" mb={2}>Chat with GPT-4</Typography>
      
      <Paper 
        elevation={3}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
          marginBottom: 2,
          backgroundColor: '#f9f9f9'
        }}
      >
        {messages.map((message, index) => (
          <Box 
            key={index} 
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 1
            }}
          >
            <Box 
              sx={{
                maxWidth: '75%',
                padding: 1.5,
                borderRadius: 2,
                backgroundColor: message.sender === 'user' ? '#1976d2' : '#e0e0e0',
                color: message.sender === 'user' ? 'white' : 'black'
              }}
            >
              <Typography>{message.text}</Typography>
            </Box>
          </Box>
        ))}
      </Paper>

      <Box 
        sx={{
          display: 'flex'
        }}
      >
        <TextField
          fullWidth
          value={input}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          InputProps={{
            sx: {
              backgroundColor: '#f0f0f0', // Change this to your desired background color
              borderRadius: '5px',
              color: input === 'Enter your question here' ? 'grey' : 'black', // Grey text when it's the placeholder, black when user types
            },
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleSend} 
          sx={{ 
            marginLeft: 1 
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
