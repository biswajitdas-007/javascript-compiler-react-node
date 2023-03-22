import { useState, useRef } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
import Axios from "axios";

function App() {
  const editorRef = useRef(null);

  const [compileRes, setCompileRes] = useState(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // Function to call the compile endpoint
  function compile() {
    setCompileRes(null);
    if (editorRef.current.getValue() === ``) {
      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:4001/compile`, {
      code: editorRef.current.getValue(),
      language: "javascript",
    }).then((res) => {
      console.log(res);
      setCompileRes(res.data);
    });
  }

  return (
    <div className="App">
      <div>
        <div>
          {/* <button onClick={showValue}>Show value</button> */}
          <Editor
            height="70vh"
            width="100%"
            theme="vs-dark"
            language="javascript"
            defaultLanguage="javascript"
            defaultValue="//Enter your code here"
            onMount={handleEditorDidMount}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
          <br />
          <textarea
            rows="4"
            cols="50"
            value={compileRes ? compileRes.output : ""}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
