# Seongtae Hong — Academic Homepage

PRISM 기반 개인 연구 홈페이지입니다. 공개 전 로컬에서 확인할 수 있으며, 콘텐츠는 `content/` 중심으로 관리합니다.

## Local preview

```bash
npm ci
npm run dev -- --hostname 0.0.0.0 --port 3000
```

브라우저에서 `http://localhost:3000`을 열거나 원격 IDE의 Ports 탭에서 3000번 포트를 전달합니다.

## Content editing

관리 위치와 논문별 Motivation 작성 방법은 [`content/README.md`](content/README.md)를 참고하세요.

## Production build

```bash
npm run build
```

정적 결과물은 `out/`에 생성됩니다. GitHub Pages 배포 워크플로는 수동 실행 상태이므로 소스 수정만으로 자동 공개되지 않습니다.

## Credits

Built from [PRISM](https://github.com/xyjoey/PRISM), licensed under the MIT License.
