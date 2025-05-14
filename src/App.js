import React, { useState } from 'react';
import './App.css';
import VimeoPlayer from './components/VimeoPlayer';
import VideoList from './components/VideoList';
import VideoInfo from './components/VideoInfo';

function App() {
  const [videoId, setVideoId] = useState('');
  const [inputVideoId, setInputVideoId] = useState('');
  const [showVideoInfo, setShowVideoInfo] = useState(false);

  const handleVideoIdChange = (e) => {
    setInputVideoId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVideoId.trim()) {
      setVideoId(inputVideoId.trim());
      setShowVideoInfo(true);
    }
  };

  const handleVideoSelect = (selectedVideoId) => {
    setVideoId(selectedVideoId);
    setInputVideoId(selectedVideoId);
    setShowVideoInfo(true);
    // 화면 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Vimeo Video Viewer</h1>
        <p>To Be Doctor Campus</p>
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
        
        {videoId ? (
          <>
            <div className="video-container">
              <VimeoPlayer videoId={videoId} />
            </div>
            {showVideoInfo && <VideoInfo videoId={videoId} />}
          </>
        ) : (
          <div className="no-video-message">
            <p>Vimeo 비디오 ID를 입력하거나 아래 목록에서 비디오를 선택하세요.</p>
          </div>
        )}
        
        <VideoList onVideoSelect={handleVideoSelect} />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 To Be Doctor Campus - Vimeo API Test</p>
      </footer>
    </div>
  );
}

export default App;
