import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./workspace.css";

const Workspace = () => {
  const [code, setCode] = useState(`function sayHi() {
  console.log("👋 Hello world");
}

sayHi();`);

  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [activePanel, setActivePanel] = useState("files"); // "files" | "chat"
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const newWidth = e.clientX - 50;
    if (newWidth > 100 && newWidth < 500) setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const renderSidebarContent = () => {
    // if (activePanel === "chat") {
    //   return (
    //     <div className="chat-box">
    //       <h3>Team Chat</h3>
    //       <div className="chat-messages">
    //         <p> Hello chat !! </p>
    //         <p> Here, You can talk.</p>
    //       </div>
    //       <input type="text" placeholder="Type a message..." />
    //     </div>
    //   );
    // }

    if (activePanel === "chat") {
      return (
        <div className="chat-box">
          <h3>Team Chat</h3>

          <div className="chat-messages">
            <p> Hello chat !! </p>
            <p> Talk here !! </p>
            <p> Spread love and positivity.</p>
          </div>

          {/* Message Input Bar */}
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Type a message..."
              className="chat-message-input"
            />
            <button className="chat-send-btn" title="Send">
              ➤
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>Your Files</h3>
        <ul>
          <li>index.js</li>
          <li>style.css</li>
          <li>app.js</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="workspace-container">
      <div className="workspace-main">
        {/* Vertical Toolbar */}
        <div className="vertical-toolbar">
          <button title="Files" onClick={() => setActivePanel("files")}>
            🗂
          </button>
          <button title="Chat" onClick={() => setActivePanel("chat")}>
            💬
          </button>
        </div>

        {/* Sidebar */}
        <div className="file-sidebar" style={{ width: ` ${sidebarWidth}px` }}>
          {renderSidebarContent()}
        </div>

        {/* Resizer */}
        <div className="resizer" onMouseDown={handleMouseDown} />

        {/* Code Editor */}
        <div className="code-editor">
          <Editor
            language="javascript"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              fontFamily: "Courier New, monospace",
              automaticLayout: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

//   return (
//     <div className="workspace-container">
//       <div className="workspace-main">
//         {/* Vertical Toolbar */}
//         <div className="vertical-toolbar">
//           <button title="Files" onClick={() => setActivePanel("files")}>🗂</button>
//           <button title="Chat" onClick={() => setActivePanel("chat")}>💬</button>
//         </div>

//         {/* Sidebar */}
//         <div className="file-sidebar" style={{ width: ${sidebarWidth}px }}>
//           {renderSidebarContent()}
//         </div>

//         {/* Resizer */}
//         <div className="resizer" onMouseDown={handleMouseDown} />

//         {/* Code Editor */}
//         <div className="code-editor">
//           <Editor
//             language="javascript"
//             value={code}
//             onChange={(value) => setCode(value || "")}
//             theme="vs-dark"
//             options={{
//               fontSize: 16,
//               minimap: { enabled: false },
//               fontFamily: "Courier New, monospace",
//               automaticLayout: true,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

export default Workspace;
