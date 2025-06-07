import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../App/Store';
import { FaPaperPlane } from 'react-icons/fa';
import { Editor } from 'primereact/editor';
import 'primereact/resources/themes/saga-blue/theme.css'; // Light theme
import 'primereact/resources/themes/arya-blue/theme.css';  // Dark theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// NOTE: Removed AntdTinymce.config since we are using ReactQuill

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const [content, setContent] = useState<string | null>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentContent = content || ''; // Ensure content is a string for trimming
    if (currentContent.trim() && currentContent !== '<p><br></p>') {
      onSendMessage(currentContent);
      setContent('');
    }
  };

  const headerTemplate = (
    <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
      <button className="ql-link" aria-label="Link"></button>
      <button className="ql-blockquote" aria-label="Blockquote"></button>
      <button className="ql-list" value="ordered" aria-label="Ordered List"></button>
      <button className="ql-list" value="bullet" aria-label="Unordered List"></button>
      <button className="ql-image" aria-label="Image"></button>
    </span>
  );

  const quillModules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'script', 'sub', 'super',
    'direction',
    'size',
    'color', 'background',
    'font',
    'align',
    'clean'
  ];

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 p-4 rounded-xl shadow-lg h-[calc(85vh-9rem)] ${
      theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
    }`}>
      <div className="flex-grow">
        <Editor 
          value={content || ''}
          onTextChange={(e) => setContent(e.htmlValue)}
          headerTemplate={headerTemplate}
          style={{ height: '50vh' }}
          className={`editor-custom-theme ${theme === 'dark' ? 'p-editor-dark' : 'p-editor-light'}`}
          modules={quillModules}
          formats={quillFormats}
        />
      </div>
      <button
        type="submit"
        className={`btn px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <FaPaperPlane /> Send
      </button>
    </form>
  );
};

export default MessageInput; 