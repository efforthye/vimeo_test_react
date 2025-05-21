import React, { useState } from 'react';
import './App.css';
import VimeoPlayer from './components/VimeoPlayer';
// import VideoList from './components/VideoList';
// import VideoInfo from './components/VideoInfo';

function App() {
  const [videoId, setVideoId] = useState('');
  const [inputVideoId, setInputVideoId] = useState('');
  const [showVideoInfo, setShowVideoInfo] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [additionalPlayers, setAdditionalPlayers] = useState([]);

  const handleVideoIdChange = (e) => {
    setInputVideoId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVideoId.trim()) {
      setVideoId(inputVideoId.trim());
      setShowVideoInfo(true);
      setStartTime(0); // 새 비디오는 처음부터 시작
    }
  };

  const handleVideoSelect = (selectedVideoId) => {
    setVideoId(selectedVideoId);
    setInputVideoId(selectedVideoId);
    setShowVideoInfo(true);
    setStartTime(0); // 새 비디오는 처음부터 시작
    // 화면 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 추가 플레이어 생성 (특정 시점부터 시작)
  const handleAddPlayerFromTime = (id, time) => {
    const newPlayer = {
      id: Date.now(), // 고유 키
      videoId: id,
      startTime: time
    };
    
    setAdditionalPlayers([...additionalPlayers, newPlayer]);
  };

  // 시간 포맷팅 (초 -> MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
              <VimeoPlayer 
                videoId={videoId}
                startTime={startTime}
                onAddPlayer={handleAddPlayerFromTime}
              />
            </div>
            {/* {showVideoInfo && <VideoInfo videoId={videoId} />} */}
          </>
        ) : (
          <div className="no-video-message">
            <p>Vimeo 비디오 ID를 입력하세요.</p>
          </div>
        )}
        
        {additionalPlayers.length > 0 && (
          <div className="additional-players">
            <h2>특정 시점부터 시작하는 영상</h2>
            {additionalPlayers.map(player => (
              <div key={player.id} className="additional-player-container">
                <h3>{formatTime(player.startTime)}부터 시작하는 비디오</h3>
                <VimeoPlayer 
                  videoId={player.videoId} 
                  startTime={player.startTime}
                  onAddPlayer={handleAddPlayerFromTime}
                />
              </div>
            ))}
          </div>
        )}
        
        {/* <VideoList onVideoSelect={handleVideoSelect} /> */}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 To Be Doctor Campus - Vimeo API Test</p>
      </footer>
    </div>
  );
}

export default App;
