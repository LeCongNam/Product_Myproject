# Product_Myproject
[Markdown](http://https://vi.wikipedia.org/wiki/Markdown)




```bash
npm i @uiw/react-markdown-editor
```



``bash
npm i @uiw/react-markdown-editor
``



``` jsx
import React, { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

function App() {
  const [markdown, setMarkdown] = useState("");
  return (
    <MarkdownEditor
      value="# This is a H1  \n## This is a H2  \n###### This is a H6"
      onChange={(value, viewUpdate) => setMarkdown(value)}
    />
  );
}

export default App;
```



<p align="center">
  <a href="https://github.com/uiwjs/react-markdown-editor/actions">
    <img alt="Build & Deploy" src="https://github.com/uiwjs/react-markdown-editor/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/@uiw/react-markdown-editor">
    <img alt="NPM Download" src="https://img.shields.io/npm/dm/@uiw/react-markdown-editor.svg?style=flat">
  </a>
  <a href="https://www.npmjs.com/package/@uiw/react-markdown-editor">
    <img alt="npm version" src="https://img.shields.io/npm/v/@uiw/react-markdown-editor.svg">
  </a>
</p>

<p align="center">
  A markdown editor with preview, implemented with React.js and TypeScript.
</p>