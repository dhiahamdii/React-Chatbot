// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React + Dhia</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App

// import ChatBot from "./components/ChatBot";

// function App() {
//   return (
//     <div>
//       <ChatBot />
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import Chatbot from "./components/ChatBot"; // Import the Chatbot component
// import Sidebar from "./components/SideBar"; // Import the Sidebar component

// const App = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         style={{
//           position: "relative",
//           top: "20px",
//           left: "20px",
//           zIndex: 1000,
//           backgroundColor: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           padding: "10px 15px",
//           cursor: "pointer",
//           borderRadius: "5px",
//         }}
//       >
//         {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
//       </button>

//       {/* Sidebar */}
//       {isSidebarVisible && <Sidebar />}

//       {/* Main content area */}
//       <div
//         style={{
//           flex: 1,
//           marginLeft: isSidebarVisible ? "250px" : "0",
//           transition: "margin-left 0.3s ease",
//         }}
//       >
//         <Chatbot />
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import Chatbot from "./components/ChatBot"; // Import the Chatbot component
// import Sidebar from "./components/SideBar"; // Import the Sidebar component
// import "./App.css";

// const App = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [isNightMode, setIsNightMode] = useState(false); // Assuming you have night mode

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   const logoSrc = isNightMode
//     ? "src/assets/logo-dynamix2.png"
//     : "src/assets/logo-dynamix2.png"; // Adjust the path accordingly

//   return (
//     <div>
//       {/* Header */}
//       <div className="header">{/* Your header content */}</div>

//       <div style={{ display: "flex", marginTop: "62px" }}>
//         {/* Sidebar Toggle Logo */}
//         <img
//           src={logoSrc}
//           alt="Toggle Sidebar"
//           onClick={toggleSidebar}
//           style={{
//             position: "fixed",
//             top: "20px",
//             left: "20px",
//             zIndex: 1000,
//             cursor: "pointer",
//             height: "40px", // Adjust the size as needed
//           }}
//         />

//         {/* Sidebar */}
//         {isSidebarVisible && <Sidebar />}

//         {/* Main content area */}
//         <div
//           style={{
//             flex: 1,
//             marginLeft: isSidebarVisible ? "250px" : "0",
//             transition: "margin-left 0.3s ease",
//           }}
//         >
//           <Chatbot />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import Chatbot from "./components/ChatBot"; // Import the Chatbot component
import Sidebar from "./components/SideBar"; // Import the Sidebar component
import "./App.css";

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar hidden initially
  const [isNightMode, setIsNightMode] = useState(false); // Toggle night mode

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const logoSrc = isNightMode
    ? "src/assets/logo-dynamix2.png"
    : "src/assets/logo-dynamix2.png"; // Adjust the path accordingly

  return (
    <div className={isNightMode ? "night-mode" : ""}>
      {/* Header */}
      <div className="header">
        {/* Add night mode toggle button */}
        <button onClick={toggleNightMode}>
          {isNightMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div style={{ display: "flex", marginTop: "62px" }}>
        {/* Sidebar Toggle Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1000,
            cursor: "pointer",
          }}
          // onClick={toggleSidebar}
        >
          <img
            src={logoSrc}
            alt="Toggle Sidebar"
            style={{
              height: "40px", // Adjust the size as needed
              marginRight: "10px",
            }}
          />
          {isSidebarVisible && (
            <span
              style={{
                color: "#fff",
                fontSize: "18px",
                transition: "opacity 0.3s ease",
              }}
            >
              Dynamix Services
            </span>
          )}
        </div>

        {/* Sidebar */}

        {/* {isSidebarVisible && <Sidebar isNightMode={isNightMode} />} */}

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            marginLeft: isSidebarVisible ? "250px" : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default App;
