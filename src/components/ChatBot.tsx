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
    <div id="wrapper" className={isNightMode ? "night-mode" : ""}>
      {/* <Sidebar isNightMode={isNightMode} /> */}
      <div className="header">
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
                ? "src/assets/LIGHT-MODE.png"
                : "src/assets/DARK-MODE.png"
            }
            height="36px"
            alt="Logo"
          />
        </figure>
      </div>

      {/* <button className="night-mode-toggle" onClick={toggleNightMode}>
        {isNightMode ? "Light Mode" : "Dark Mode"}
      </button> */}

      {/* <button className="bn3 bn4" id="clearButton" onClick={clearMessages}>
        Clear
      </button> */}

      <div className="container">
        <div id="modal1" className="modal">
          <canvas id="modal-chart"></canvas>
        </div>

        <div
          className="chats"
          id="chats"
          style={{
            position: "absolute",
            right: "15%",
            width: "68%",
            top: "12%",
            overflow: "auto",
            bottom: "15%",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-bubble ${
                msg.sender === "bot" ? "bot-bubble" : "user-bubble"
              }`}
            >
              <strong>{msg.sender === "bot" ? "Bot" : "You"}:</strong>{" "}
              {msg.text}
            </div>
          ))}
        </div>

        <div
          className={`keypad ${isNightMode ? "night-mode" : ""}`}
          style={{
            position: "absolute",
            bottom: 10, // Align it to the bottom of the viewport
            left: 270, // Align it to the left of the viewport

            width: "65%", // Make sure it spans the full width of the viewport
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.3)", // Optional: add some shadow for better visibility
          }}
        >
          <textarea
            id="userInput"
            placeholder="Type a message..."
            className={`usrInput ${isNightMode ? "night-mode" : ""}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
