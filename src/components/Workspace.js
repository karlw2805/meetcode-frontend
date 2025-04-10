import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./works.css"; // or whatever CSS file you added styles to

const Workspace = () => {
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("h1 { color: blue; }");
  const [js, setJs] = useState("console.log('Hello from JS')");

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <div className="editor-container">
      <div className="editor-section">
        <div className="editor-pane">
          <Editor
            height="100%"
            defaultLanguage="html"
            defaultValue={html}
            onChange={(value) => setHtml(value)}
          />
        </div>
        <div className="editor-pane">
          <Editor
            height="100%"
            defaultLanguage="css"
            defaultValue={css}
            onChange={(value) => setCss(value)}
          />
        </div>
        <div className="editor-pane">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={js}
            onChange={(value) => setJs(value)}
          />
        </div>
      </div>
      <div className="preview">
        <iframe
          srcDoc={srcDoc}
          title="Live Preview"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Workspace;
