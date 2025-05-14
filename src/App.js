import React, { useState } from 'react';
import './App.css';
import VimeoPlayer from './components/VimeoPlayer';

function App() {
  // 예시 비디오 ID (Vimeo 샘플 비디오)
  const [videoId, setVideoId] = useState('76979871');
  const [inputVideoId, setInputVideoId] = useState('');

  const handleVideoIdChange = (e) => {
    setInputVideoId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVideoId.trim()) {
      setVideoId(inputVideoId.trim());
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Vimeo Video Viewer</h1>
      </header>
      <main>
        <div className="video-input-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="video-id">Vimeo 비디오 ID:</label>
            <input
              type="text"
              id="video-id"
              value={inputVideoId}
              onChange={handleVideoIdChange}
              placeholder="Vimeo 비디오 ID를 입력하세요"
            />
            <button type="submit">비디오 로드</button>
          </form>
        </div>
        <div className="video-container">
          {videoId ? (
            <VimeoPlayer videoId={videoId} />
          ) : (
            <p>비디오 ID를 입력하세요</p>
          )}
        </div>
        <p>
          <small>현재 로드된 비디오 ID: {videoId}</small>
        </p>
      </main>
    </div>
  );
}

export default App;
