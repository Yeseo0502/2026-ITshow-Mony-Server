# 2026 ITshow Mony Server

Mony 서비스의 백엔드/API 서버와 프론트엔드 연동용 프로젝트입니다.

## 프로젝트 개요

- 백엔드: Node.js + Express
- 프론트엔드: React + Vite
- 데이터베이스: Supabase
- 문서화: Swagger UI
- 보안: 환경 변수 기반 설정, CORS 제한, .env 파일 제외

## 폴더 구조

```text
.
├── .env.example
├── .gitignore
├── README.md
├── backend/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   ├── swagger.js
│   ├── middleware/
│   ├── routes/
│   └── utils/
├── package.json
├── src/
│   ├── api/
│   └── components/
├── public/
├── index.html
├── vite.config.js
├── eslint.config.js
└── package-lock.json
```

## 설치 및 실행

### 1) 의존성 설치

루트 프로젝트:

```bash
npm install
```

백엔드:

```bash
cd backend
npm install
```

### 2) 환경 변수 설정

루트 `.env` 파일 생성:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

백엔드 `backend/.env` 파일 생성:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
FRONTEND_URL=http://localhost:5173
PORT=3001
ALLOWED_ORIGINS=http://localhost:5173
```

예시는 다음 파일을 참고하세요:

- `.env.example`
- `backend/.env.example`

### 3) 서버 실행

프론트엔드:

```bash
npm run dev
```

백엔드:

```bash
cd backend
npm run dev
```

또는 프로덕션 모드:

```bash
cd backend
npm start
```

## API 문서

백엔드 실행 후 Swagger 문서 확인:

```text
http://localhost:3001/api-docs
```

## 보안 정책

다음 사항을 반드시 지켜주세요.

- `.env` 파일은 Git 저장소에 절대 커밋하지 않습니다.
- Supabase Service Role Key는 서버 환경 변수로만 사용합니다.
- 클라이언트 코드에는 공개 가능한 anon key만 사용합니다.
- 프로덕션 환경에서는 `ALLOWED_ORIGINS`을 명확하게 제한합니다.
- GitHub에 코드를 올리기 전에 secret scanning 결과를 확인합니다.

## 보안 체크리스트

- [x] `.env` 제외 설정 적용
- [x] `.env.example` 작성
- [x] CORS 허용 오리진 제한
- [x] 환경 변수 누락 시 명확한 에러 메시지 추가
- [ ] 운영용 실제 키는 GitHub Secrets 또는 서버 환경 변수로 관리
- [ ] 실제 배포 서버의 secret rotate 여부 확인

## 참고

이 프로젝트는 학습/프로토타이핑용으로 구성되었으며, 운영 배포 전에는 아래 항목을 추가로 점검하는 것을 권장합니다.

- JWT 기반 인증 도입
- rate limiting 적용
- 입력값 검증 강화
- request logging 및 보안 로깅
- HTTPS 및 정적 자산 보호

## 라이선스

본 프로젝트는 교육/프로젝트 용도로 사용되며, 별도 라이선스 정책이 지정되지 않은 경우 팀 내부 사용을 기준으로 관리합니다.
