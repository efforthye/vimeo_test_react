import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import './VimeoPlayer.css';

const VimeoPlayer = ({ videoId, width = '100%', height = '500px', startTime = 0, onAddPlayer }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState('');

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

      // 실시간 재생 위치 업데이트
      playerRef.current.on('timeupdate', (data) => {
        setCurrentTime(data.seconds);
      });

      // 1초마다 직접 현재 시간 가져오기 (timeupdate 이벤트 보완)
      const timeInterval = setInterval(() => {
        if (playerRef.current) {
          playerRef.current.getCurrentTime().then(seconds => {
            setCurrentTime(seconds);
            
            // 5초마다 백엔드로 진행 상태 저장 예시
            if (Math.floor(seconds) % 5 === 0) {
              // 실제 구현 시 아래 함수 호출
              // saveProgressToDatabase(videoId, seconds, duration);
            }
          }).catch(err => {
            console.error('getCurrentTime 오류:', err);
          });
        }
      }, 1000);

      // 초기 로딩 시 플레이어 설정
      playerRef.current.ready().then(() => {
        // 초기 비디오 길이 가져오기
        playerRef.current.getDuration().then(videoDuration => {
          setDuration(videoDuration);
          console.log('비디오 길이:', videoDuration);
        });
        
        // 지정된 시작 시간이 있으면 해당 위치로 이동
        if (startTime > 0) {
          playerRef.current.setCurrentTime(startTime).then(() => {
            console.log(`${startTime}초부터 시작`);
            // 자동 재생 시작
            playerRef.current.play();
          });
        }
      });

      // 기타 이벤트 리스너
      playerRef.current.on('play', () => {
        console.log('비디오 재생 시작');
      });

      playerRef.current.on('pause', () => {
        console.log('비디오 일시 정지');
        
        // 일시 정지 시 즉시 현재 위치 저장 (선택 사항)
        playerRef.current.getCurrentTime().then(seconds => {
          // 실제 구현 시 아래 함수 호출
          // saveProgressToDatabase(videoId, seconds, duration);
        });
      });

      playerRef.current.on('ended', () => {
        console.log('비디오 재생 완료');
        
        // 재생 완료 시 완료 상태로 저장 (선택 사항)
        // saveCompletionToDatabase(videoId);
      });

      // 플레이어 로드 오류 처리
      playerRef.current.on('error', (error) => {
        console.error('Vimeo player error:', error);
      });

      // 컴포넌트 언마운트 시 플레이어 및 타이머 제거
      return () => {
        clearInterval(timeInterval);
        if (playerRef.current) {
          playerRef.current.off('play');
          playerRef.current.off('pause');
          playerRef.current.off('timeupdate');
          playerRef.current.off('ended');
          playerRef.current.destroy();
          playerRef.current = null;
        }
      };
    }
  }, [videoId, width, height, startTime, duration]);

  // 특정 시간부터 새 플레이어 추가
  const handleCreateNewPlayer = (e) => {
    e.preventDefault();
    const timeInSeconds = parseFloat(seekTime);
    
    if (!isNaN(timeInSeconds) && timeInSeconds >= 0 && timeInSeconds < duration) {
      // 부모 컴포넌트에 새 플레이어 추가 요청
      if (onAddPlayer) {
        onAddPlayer(videoId, timeInSeconds);
        // 입력 필드 초기화
        setSeekTime('');
      }
    } else {
      alert('유효한 시간(초)을 입력하세요');
    }
  };

  // 시간 포맷팅 (초 -> MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="vimeo-player-wrapper">
      <div ref={containerRef} className="vimeo-player-container"></div>
      
      <div className="simple-progress-container">
        <div className="progress-display">
          <div className="progress-bar">
            <div 
              className="progress-indicator" 
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="time-display">
            현재 재생 위치: {formatTime(currentTime)} / {formatTime(duration)} 
            {duration > 0 && ` (${Math.round((currentTime / duration) * 100)}%)`}
          </div>
        </div>
        
        <form onSubmit={handleCreateNewPlayer} className="seek-form">
          <input
            type="text"
            value={seekTime}
            onChange={(e) => setSeekTime(e.target.value)}
            placeholder="시간(초)을 입력하세요"
            className="seek-input"
          />
          <button type="submit" className="seek-button">
            새 플레이어 생성 (입력한 시간부터 시작)
          </button>
        </form>
      </div>
    </div>
  );
};

export default VimeoPlayer;