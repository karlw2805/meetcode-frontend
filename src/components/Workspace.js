import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./workspace.css";

const defaultCodeTemplates = {
  javascript: `console.log("Hello from JS!");`,
  python: `print("Hello from Python!")`,
  cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello from C++!" << endl;\n  return 0;\n}`,
  html: `<!DOCTYPE html>\n<html>\n<head><title>New Page</title></head>\n<body>\n  <h1>Hello HTML</h1>\n</body>\n</html>`,
};

const Workspace = () => {
  const [activePanel, setActivePanel] = useState("files");
  const [activeFile, setActiveFile] = useState("index.html");
  const [showModal, setShowModal] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [stdin, setStdin] = useState("");
  const [newFileLang, setNewFileLang] = useState("javascript");
  const [chatMessages, setChatMessages] = useState([
    "Hello chat !!",
    "Talk here !!",
    "Spread love and positivity.",
  ]);
  const [chatInput, setChatInput] = useState("");
  const [files, setFiles] = useState({});
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);


  const getLanguageFromFilename = (filename) => {
    if (filename.endsWith(".js")) return "javascript";
    if (filename.endsWith(".css")) return "css";
    if (filename.endsWith(".html")) return "html";
    if (filename.endsWith(".py")) return "python";
    if (filename.endsWith(".cpp")) return "cpp";
    return "plaintext";
  };

  const handleCreateFile = () => {
    if (!newFileName) return;

    let extension = "";
    if (newFileLang === "javascript") extension = ".js";
    else if (newFileLang === "python") extension = ".py";
    else if (newFileLang === "cpp") extension = ".cpp";
    else if (newFileLang === "html") extension = ".html";

    const fullFileName = newFileName + extension;
    setFiles({ ...files, [fullFileName]: defaultCodeTemplates[newFileLang] });
    setActiveFile(fullFileName);
    setShowModal(false);
    setNewFileName("");
    setNewFileLang("javascript");
  };

  const handleSendMessage = () => {
    const trimmed = chatInput.trim();
    if (trimmed) {
      setChatMessages([...chatMessages, trimmed]);
      setChatInput("");
    }
  };

  const handleRunCode = async () => {
    const language = getLanguageFromFilename(activeFile);
    const supportedLanguages = ["python", "javascript", "cpp"];

    if (!supportedLanguages.includes(language)) {
      setOutput("⚠️ This file type is not supported for execution.");
      return;
    }

    setIsRunning(true);
    setOutput("⏳ Running...");

    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch("http://10.81.66.115:8000/api/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: files[activeFile],
          language: language,
          stdin: stdin,
        }),
      });

      const result = await res.json();

      if (result.stderr) {
        setOutput(`❌ Error:\n${result.stderr}`);
      } else if (result.compile_output) {
        setOutput(`⚙️ Compilation Error:\n${result.compile_output}`);
      } else if (result.output) {
        setOutput(`✅ Output:\n${result.output}`);
      } else {
        setOutput(`❌ Unknown Error:\n${JSON.stringify(result, null, 2)}`);
      }
    } catch (err) {
      setOutput("❗ Failed to execute code.");
      console.error("Execution error:", err);
    }

    setIsRunning(false);
  };

  const handleDeleteFile = (filename) => {
    if (window.confirm(`Are you sure you want to delete "${filename}"?`)) {
      setFiles((prevFiles) => {
        const updated = { ...prevFiles };
        delete updated[filename];

        if (activeFile === filename) {
          const remaining = Object.keys(updated);
          setActiveFile(remaining.length ? remaining[0] : "");
        }

        return updated;
      });
    }
  };

  const renderSidebarContent = () => {
    if (activePanel === "chat") {
      return (
        <div className="chat-box">
          <h3>Team Chat</h3>
          <div className="chat-messages">
            {chatMessages.map((msg, idx) => (
              <p key={idx}>{msg}</p>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Type a message..."
              className="chat-message-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="chat-send-btn" title="Send" onClick={handleSendMessage}>
              ➤
            </button>
          </div>
        </div>
      );
    }

    if (activePanel === "output") {
      return (
        <div>
          <div className="output-panel">
            <div>
              <h3>Standard Input (stdin)</h3>
              <textarea className="stdin-input"
                rows={4}
                placeholder="Enter input for the program..."
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                style={{ width: "100%", padding: "8px", fontFamily: "monospace" }}
              />
            </div>
            <h3>Execution Output</h3>
            <pre className="code-output" style={{ whiteSpace: "pre-wrap" }}>
              {output || "No output yet."}
            </pre>
          </div>
          <div className="run-controls">
            <button onClick={handleRunCode} disabled={isRunning}>
              {isRunning ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>Your Files</h3>
        <button className="chat-send-btn" onClick={() => setShowModal(true)}>
          ➕ Add File
        </button>
        <ul className="file-list">
          {Object.keys(files).map((filename) => (
            <li
              key={filename}
              className={activeFile === filename ? "active-file" : ""}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                onClick={() => setActiveFile(filename)}
                style={{ flex: 1, cursor: "pointer" }}
              >
                {filename}
              </span>
              <button
                onClick={() => handleDeleteFile(filename)}
                title="Delete File"
                style={{
                  background: "none",
                  border: "none",
                  color: "#f55",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginLeft: "8px",
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="workspace-container">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New File</h3>
            <input
              type="text"
              placeholder="Enter file name (no extension)"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
            />
            <select
              value={newFileLang}
              onChange={(e) => setNewFileLang(e.target.value)}
            >
              <option value="javascript">JavaScript (.js)</option>
              <option value="python">Python (.py)</option>
              <option value="cpp">C++ (.cpp)</option>
              <option value="html">HTML (.html)</option>
            </select>
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleCreateFile}>Create</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="workspace-main">
        <div className="vertical-toolbar">
          <button title="Files" onClick={() => setActivePanel("files")}>🗂</button>
          <button title="Chat" onClick={() => setActivePanel("chat")}>💬</button>
          <button title="Output" onClick={() => setActivePanel("output")}>📤</button>
        </div>

        <div className="file-sidebar">
          {renderSidebarContent()}
        </div>

        <div className="code-editor">
          <div className="editor-pane">
            {activeFile in files ? (
              <Editor
                language={getLanguageFromFilename(activeFile)}
                value={files[activeFile] || ""}
                onChange={(value) =>
                  setFiles((prev) => ({ ...prev, [activeFile]: value || "" }))
                }
                theme="vs-dark"
                options={{
                  fontSize: 16,
                  minimap: { enabled: false },
                  fontFamily: "Courier New, monospace",
                  automaticLayout: true,
                }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#888",
                  fontSize: "18px",
                  fontStyle: "italic",
                }}
              >
                Select or create a file to start editing...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
