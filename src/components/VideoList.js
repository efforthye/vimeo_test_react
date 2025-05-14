import React, { useState, useEffect } from 'react';
import { searchVideos, getUserVideos } from '../services/vimeoService';
import './VideoList.css';

const VideoList = ({ onVideoSelect }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState('user'); // 'user' 또는 'search'

  // 초기 로드 시 사용자 비디오 가져오기
  useEffect(() => {
    const fetchUserVideos = async () => {
      setLoading(true);
      try {
        const data = await getUserVideos();
        setVideos(data.data || []);
        setError(null);
      } catch (err) {
        setError('비디오를 불러오는데 실패했습니다. API 키를 확인하세요.');
        console.error('비디오 로드 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserVideos();
  }, []);

  // 검색 처리
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const data = await searchVideos(searchQuery);
      setVideos(data.data || []);
      setSearchMode('search');
      setError(null);
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
      console.error('검색 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 내 비디오 로드
  const handleLoadMyVideos = async () => {
    setLoading(true);
    try {
      const data = await getUserVideos();
      setVideos(data.data || []);
      setSearchMode('user');
      setSearchQuery('');
      setError(null);
    } catch (err) {
      setError('비디오를 불러오는데 실패했습니다.');
      console.error('비디오 로드 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 비디오 선택 처리
  const handleVideoClick = (video) => {
    if (onVideoSelect) {
      // 비메오 URL에서 ID 추출 (예: /videos/123456789 -> 123456789)
      const videoId = video.uri.split('/').pop();
      onVideoSelect(videoId);
    }
  };

  return (
    <div className="video-list-container">
      <div className="video-list-header">
        <h2>{searchMode === 'user' ? '내 비디오' : '검색 결과'}</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="비디오 검색..."
            className="search-input"
          />
          <button type="submit" className="search-button">검색</button>
        </form>
        {searchMode === 'search' && (
          <button onClick={handleLoadMyVideos} className="my-videos-button">
            내 비디오 보기
          </button>
        )}
      </div>

      {loading && <div className="loading">로딩 중...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && videos.length === 0 && (
        <div className="no-videos">비디오가 없습니다.</div>
      )}

      <div className="video-grid">
        {videos.map((video) => (
          <div
            key={video.uri}
            className="video-item"
            onClick={() => handleVideoClick(video)}
          >
            {video.pictures && video.pictures.sizes && (
              <img
                src={video.pictures.sizes[2].link}
                alt={video.name}
                className="video-thumbnail"
              />
            )}
            <div className="video-info">
              <h3 className="video-title">{video.name}</h3>
              <p className="video-duration">
                {formatDuration(video.duration)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 비디오 재생 시간 포맷팅 (초 -> MM:SS)
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default VideoList;
