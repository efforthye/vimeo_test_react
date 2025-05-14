// Vimeo API와 통신하기 위한 서비스 함수들

const VIMEO_API_BASE_URL = 'https://api.vimeo.com';
const ACCESS_TOKEN = process.env.REACT_APP_VIMEO_ACCESS_TOKEN;

// API 통신을 위한 기본 설정
const headers = {
  'Authorization': `bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.vimeo.*+json;version=3.4'
};

// 비디오 정보 가져오기
export const getVideoInfo = async (videoId) => {
  try {
    const response = await fetch(`${VIMEO_API_BASE_URL}/videos/${videoId}`, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('비디오 정보를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 사용자 비디오 목록 가져오기
export const getUserVideos = async (userId = 'me', page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${VIMEO_API_BASE_URL}/users/${userId}/videos?page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: headers
      }
    );

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('비디오 목록을 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 비디오 검색
export const searchVideos = async (query, page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${VIMEO_API_BASE_URL}/videos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: headers
      }
    );

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('비디오 검색 중 오류 발생:', error);
    throw error;
  }
};

// ESLint 경고를 피하기 위해 객체를 변수에 할당 후 내보내기
const vimeoService = {
  getVideoInfo,
  getUserVideos,
  searchVideos
};

export default vimeoService;
