# Vimeo Test React

Vimeo API를 사용한 비디오 뷰어 테스트 프로젝트입니다.

## 기능

- Vimeo API를 통한 비디오 탐색 및 검색
- 비디오 정보 표시 (제목, 설명, 태그, 조회수 등)
- 사용자 비디오 목록 조회
- 반응형 비디오 플레이어
- Vimeo 비디오 ID 직접 입력 기능

## Vimeo API 키 설정하기

이 프로젝트를 실행하기 위해서는 Vimeo API 키가 필요합니다:

1. [Vimeo 개발자 페이지](https://developer.vimeo.com/)에 접속하여 계정 로그인
2. [My Apps](https://developer.vimeo.com/apps) 페이지에서 "Create App" 버튼 클릭
3. 앱 이름, 설명, 사용 목적 등 필요한 정보 입력 후 앱 생성
4. 생성된 앱에서 "Authentication" 탭으로 이동
5. Client ID(Identifier)와 Access Token 정보 확인
6. 프로젝트 루트 디렉토리에 `.env` 파일 생성 (`.env.example` 파일을 참고)
7. `.env` 파일에 API 키 정보 입력:
   ```
   REACT_APP_VIMEO_CLIENT_ID=your_client_id_here
   REACT_APP_VIMEO_ACCESS_TOKEN=your_access_token_here
   ```

> ⚠️ 주의: `.env` 파일은 Git에 커밋하지 마세요. 이 파일은 `.gitignore`에 이미 포함되어 있습니다.

## 시작하기

1. 저장소 클론
   ```
   git clone https://github.com/efforthye/vimeo_test_react.git
   ```

2. 종속성 설치
   ```
   npm install
   ```

3. 환경 변수 설정
   ```
   cp .env.example .env
   ```
   그리고 `.env` 파일을 편집하여 실제 Vimeo API 키 정보 입력

4. 개발 서버 실행
   ```
   npm start
   ```

5. 브라우저에서 `http://localhost:3000` 접속

## 기술 스택

- React
- Vimeo Player SDK (@vimeo/player)
- Vimeo API

## 주요 파일 구조

```
src/
  ├── components/
  │   ├── VimeoPlayer.js - 비디오 플레이어 컴포넌트
  │   ├── VideoList.js - 비디오 목록 컴포넌트
  │   └── VideoInfo.js - 비디오 상세 정보 컴포넌트
  ├── services/
  │   └── vimeoService.js - Vimeo API 서비스 함수
  ├── App.js - 메인 애플리케이션 컴포넌트
  └── index.js - 진입점
```
