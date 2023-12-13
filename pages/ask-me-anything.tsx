import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";

interface Message {
    message: string;
    direction: string;
    sender: string;
  }

export default function GoalTrackerPage() {
    
    const API_KEY = "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"
    const [messages, setMessages] = useState<Message[]>([
        {
          message: "Hello, I'm FinBot! Ask me anything!",
          direction: 'incoming',
          sender: "FinBot",
        },
      ]);
      const [isTyping, setIsTyping] = useState(false);
    
      const [inputMessage, setInputMessage] = useState('');


      const handleSendRequest = async (message: string): Promise<void> => {
        const newMessage: Message = {
          message,
          direction: 'outgoing',
          sender: 'user',
        };
    
        setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
        setIsTyping(true);
    
        try {
          const response = await processMessageToChatGPT([...messages, newMessage]);
          const content = response.choices[0]?.message?.content;
          if (content) {
            const chatGPTResponse: Message = {
              message: content,
              sender: 'FinBot',
              direction: 'incoming',
            };
            setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        } finally {
          setIsTyping(false);
        }
      };

      async function processMessageToChatGPT(chatMessages:Message[]) {
        const apiMessages = chatMessages.map((messageObject) => {
          const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
          return { role, content: messageObject.message };
        });
    
        const apiRequestBody = {
          "model": "gpt-3.5-turbo-1106",
          "messages": [
            { role: "system", content: "I'm a Student using ChatGPT for learning" },
            ...apiMessages,
          ],
        };
    
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        });
        const responseData = await response.json();

        console.log('response', responseData);
        return responseData;
      }

    //   console.log("response",messages)

    const Loader = () => (
        <div className="chat-loader">
          <div className="spinner" />
        </div>
      );
    
    


    return (
        <MainLayout>
            <main className="p-8" style={{width:"100%"}}>

            <div className="chat-box">
      <div className="chat-history">
        {messages.map((message) => (
          <div key={message.sender} className={`chat-message ${message.direction}`}>
            <span className="chat-sender">{message.sender}:</span>
            <span className="chat-text">{message.message}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          className="message-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter your message..."
        />
        <button onClick={() => handleSendRequest(inputMessage)} className="send-button">
          Send
        </button>
      </div>
      {isTyping && <Loader />}
    </div>
            </main>
        </MainLayout>
    );
};