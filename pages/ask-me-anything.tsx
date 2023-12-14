import Spinner from "@/components/Spinner";
import MainLayout from "@/layouts/MainLayout";
import checkAuth from "@/utils/checkAuth";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";

interface Message {
  message: string;
  direction: string;
  sender: string;
}

export const getServerSideProps = async (ctx: GetServerSideProps) => {
  //@ts-ignore
  let res = await checkAuth({ ctx });
  return { ...res, props: { ...res.props } };
};

export default function GoalTrackerPage({ userName }: { userName: string }) {

  const API_KEY = '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';
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "Welcome to Fincodez AI Assistant! Your personalized financial companion for smart money management and investment insights. Ask me anything related to personal finance, investment strategies, market trends, or get advice on optimizing your financial portfolio. Whether you're an individual looking to grow your wealth or a business aiming for financial success, I'm here to help. Begin by asking a question or seeking guidance on a specific financial topic. How can I assist you today?",
      direction: 'incoming',
      sender: "FinBot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newMessage: Message = {
      message: inputMessage,
      direction: 'outgoing',
      sender: userName,
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
        setInputMessage('')
      }
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages: Message[]) {
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

  return (
    <MainLayout>
      <main className="p-8 pt-0 w-full overflow-hidden">
        <div className="chat-box">
          <div className="chat-history relative px-4" style={{ width: "100%", overflowY: 'scroll', scrollbarWidth: 'none' }}>
            {messages.map((message) => (
              <div key={message.sender} className={`flex ${message.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                <div className={`chat-message bg-green-500 rounded-xl mb-4 w-96 ${message.direction === 'outgoing' ? 'mr-0' : 'bg-neutral-600'}`}>
                  <p className={`chat-sender font-bold p-2 rounded-t-xl ${message.direction === 'outgoing' ? ' bg-green-600 ' : 'bg-neutral-800'}`}>{message.sender}</p>
                  <p className="chat-text p-4">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <form className="chat-input mt-10" onSubmit={handleSubmit}>
            <input
              className="message-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Enter your message..."
            />
            <button type='submit' className="bg-primary text-white rounded p-2 px-8">
              {isTyping ? (
                <Spinner />
              ) : (
                <p>
                  Send
                </p>
              )}
            </button>
          </form>
        </div>
      </main>
    </MainLayout >
  );
};