'use client';

import FileManager from "@/components/file_manager";
import TextDisplay from "@/components/text_display";
import { useState } from 'react';


export default function Home() {
  const [fileContent, setFileContent] = useState({ content:'', heading: ''});

  const handleInputChange = (fileName, file_heading) => {
    fetchFileContent(fileName, file_heading);
  };

  const fetchFileContent = async (fileName, file_heading) => {
    if (!fileName) return;

    try {
      const response = await fetch(`pages/${fileName}`);
      if (!response.ok) {
        throw new Error('File not found or unreadable');
      }
      const data = await response.text();
      setFileContent({ content:data, heading: file_heading});
    } catch (error) {
      setFileContent(error.message);
    }
  };

  
  return (
  <main className="flex min-h-screen flex-col items-start justify-center bg-[#181616] text-white">
    <div className="flex flex-row w-screen items-start">
      <div className="nav-panel">
        <h1>a</h1>
        <FileManager selectionCallback={handleInputChange}></FileManager>
      </div>
      <div className="content-panel">
        <h1>
          {`<${fileContent.heading}/>`}
        </h1>
        <div className="content-panel__content">
            <TextDisplay content={fileContent.content}></TextDisplay>
        </div>
      </div>
    </div>
  </main>
  );
}
