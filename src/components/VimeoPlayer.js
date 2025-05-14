import React, { useEffect, useRef } from 'react';
import Player from '@vimeo/player';

const VimeoPlayer = ({ videoId, width = '100%', height = '500px' }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && videoId) {
      // 이전 플레이어 제거
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      // 새 플레이어 생성
      playerRef.current = new Player(containerRef.current, {
        id: videoId,
        width,
        height,
        responsive: true,
      });

      // 이벤트 리스너 설정
      playerRef.current.on('play', () => {
        console.log('Video is playing');
      });

      playerRef.current.on('pause', () => {
        console.log('Video is paused');
      });

      playerRef.current.on('ended', () => {
        console.log('Video playback completed');
      });

      // 플레이어 로드 오류 처리
      playerRef.current.on('error', (error) => {
        console.error('Vimeo player error:', error);
      });
    }

    // 컴포넌트 언마운트 시 플레이어 제거
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, width, height]);

  return <div ref={containerRef} className="vimeo-player-container"></div>;
};

export default VimeoPlayer;
