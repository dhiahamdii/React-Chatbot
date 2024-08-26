import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import Sidebar from "./SideBar";
import "./Chatbot.css";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef<boolean>(false);
  const senderIdRef = useRef<string>(uuidv4());
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => console.log("Microphone access granted."))
      .catch((error) => console.log("Microphone access denied: ", error));
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: senderIdRef.current, text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Show typing bubble
      setIsTyping(true);

      try {
        const response = await axios.post(
          "http://localhost:5005/webhooks/rest/webhook",
          {
            sender: senderIdRef.current,
            message: input,
          }
        );

        const botMessages = response.data.map((msg: any) => ({
          sender: "bot",
          text: msg.text,
        }));
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
      } catch (error) {
        console.error("Error sending message to Rasa server:", error);
      }

      // Hide typing bubble
      setIsTyping(false);

      setInput("");
    }
  };

  const record = () => {
    if (!isRecordingRef.current) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = "fr-FR";
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.start();
      isRecordingRef.current = true;
      document.getElementById("voiceButton")!.style.color = "#EF0107";

      recognitionRef.current.onresult = (event: any) => {
        const speechResult =
          event.results[event.results.length - 1][0].transcript;
        setInput(speechResult);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.log("Speech recognition error: ", event.error);
      };
    } else {
      recognitionRef.current.stop();
      isRecordingRef.current = false;
      document.getElementById("voiceButton")!.style.color = "";
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div
      id="wrapper"
      className={isNightMode ? "night-mode" : ""}
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className={`header ${isNightMode ? "night-mode" : ""}`}>
        <figure className="fig2" id="clearButton" onClick={clearMessages}>
          <img
            src={
              isNightMode
                ? "src/assets/LOGO-LIGHT.png"
                : "src/assets/LOGO-DARK.png"
            }
            height="62px"
            alt="Bot"
          />
        </figure>
        <figure className="fig1" onClick={toggleNightMode}>
          <img
            src={
              isNightMode
                ? "src/assets/image (6).png"
                : "src/assets/DARK-MODE.png"
            }
            height="36px"
            alt="Logo"
          />
        </figure>
      </div>

      <div className={`container ${isNightMode ? "night-mode" : ""}`}>
        <div id="modal1" className="modal">
          <canvas id="modal-chart"></canvas>
        </div>

        <div
          className={`chats ${isNightMode ? "night-mode" : ""}`}
          id="chats"
          style={{
            position: "absolute",
            top: "20%",
            bottom: "5%",
            left: "15%",
            right: "15%",
            overflowY: "auto" /* Enable vertical scrolling */,
            paddingBottom: "100px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-bubble ${
                msg.sender === "bot" ? "bot-bubble" : "user-bubble"
              } ${isNightMode ? "night-mode" : ""}`}
            >
              <strong>{msg.sender === "bot" ? "Bot" : "You"}:</strong>{" "}
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </div>

        <div
          className={`keypad ${isNightMode ? "night-mode" : ""}`}
          style={{
            position: "fixed",
            bottom: 10,
            left: "15%",
            width: "68%",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
            background: isNightMode ? "#000" : "#fff",
          }}
        >
          <textarea
            id="userInput"
            placeholder="Type a message..."
            className={`usrInput ${isNightMode ? "night-mode" : ""}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent adding a new line
                handleSend();
              }
            }}
            style={{
              position: "relative",
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginRight: "10px",
              outline: "none",
            }}
          ></textarea>
          <div
            id="sendButton"
            onClick={handleSend}
            style={{
              padding: "10px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            <i
              className="fa fa-paper-plane"
              aria-hidden="true"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
          <button
            id="voiceButton"
            onClick={record}
            className="fa fa-microphone"
            aria-hidden="true"
            style={{
              fontSize: "22px",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "50%",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4CAF50")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#333")}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
