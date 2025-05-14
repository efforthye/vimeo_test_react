import React, { useEffect, useState } from 'react';
import { getVideoInfo } from '../services/vimeoService';
import './VideoInfo.css';

const VideoInfo = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      if (!videoId) return;

      setLoading(true);
      try {
        const data = await getVideoInfo(videoId);
        setVideoData(data);
        setError(null);
      } catch (err) {
        setError('비디오 정보를 불러오는데 실패했습니다.');
        console.error('비디오 정보 로드 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [videoId]);

  if (loading) {
    return <div className="video-info-loading">비디오 정보 로딩 중...</div>;
  }

  if (error) {
    return <div className="video-info-error">{error}</div>;
  }

  if (!videoData) {
    return null;
  }

  return (
    <div className="video-info-container">
      <h2 className="video-info-title">{videoData.name}</h2>
      
      <div className="video-info-details">
        <div className="video-info-stats">
          <span>조회수: {videoData.stats?.plays || 0}</span>
          <span>좋아요: {videoData.metadata?.connections?.likes?.total || 0}</span>
          <span>댓글: {videoData.metadata?.connections?.comments?.total || 0}</span>
        </div>
        
        <div className="video-info-upload">
          업로드: {new Date(videoData.created_time).toLocaleDateString()}
        </div>
      </div>
      
      {videoData.description && (
        <div className="video-info-description">
          <h3>설명</h3>
          <p>{videoData.description}</p>
        </div>
      )}
      
      {videoData.tags && videoData.tags.length > 0 && (
        <div className="video-info-tags">
          <h3>태그</h3>
          <div className="tags-container">
            {videoData.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInfo;
