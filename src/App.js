import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');

    const files = Array.from(e.dataTransfer.files).filter(
      (file) =>
        file.type === 'image/jpeg' ||
        file.name.toLowerCase().endsWith('.jpg') ||
        file.name.toLowerCase().endsWith('.jpeg')
    );

    if (files.length === 0) {
      setMessageType('error');
      setMessage('Please drop JPEG files only.');
      return;
    }

    setSelectedFiles([...selectedFiles, ...files]);
    setMessageType('');
    setMessage('');
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
    setMessageType('');
    setMessage('');
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setMessageType('error');
      setMessage('Please select at least one JPEG file.');
      return;
    }

    setConverting(true);
    setMessage('Converting images to PDF...');
    setMessageType('');

    try {
      const filePaths = selectedFiles.map((file) => file.path);
      const result = await window.electron.convertImages(filePaths);

      if (result.success) {
        setMessageType('success');
        setMessage(result.message);
        setSelectedFiles([]);
      } else {
        setMessageType('error');
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessageType('error');
      setMessage(`Conversion failed: ${error.message}`);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jason's Converter</h1>
        <p>Batch convert JPEG images to PDF</p>
      </header>

      <div className="container">
        <div
          className="drop-zone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="drop-zone-content">
            <svg
              className="drop-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h2>Drag and drop JPEG files here</h2>
            <p>or</p>
            <label className="file-input-label">
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg"
                onChange={handleFileInput}
                disabled={converting}
              />
              <span className="file-input-button">Select Files</span>
            </label>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="files-list">
            <h3>Selected Files ({selectedFiles.length})</h3>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFile(index)}
                    disabled={converting}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {message && (
          <div className={`message ${messageType}`}>
            {messageType === 'success' && '✓ '}
            {messageType === 'error' && '✗ '}
            {message}
          </div>
        )}

        <button
          className="convert-btn"
          onClick={handleConvert}
          disabled={selectedFiles.length === 0 || converting}
        >
          {converting ? 'Converting...' : 'Convert to PDF'}
        </button>
      </div>
    </div>
  );
}

export default App;