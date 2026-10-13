# Website content guide

대부분의 수정은 이 `content/` 폴더 안에서 끝납니다.

| 수정하려는 내용 | 파일 |
|---|---|
| 이름, 소속, 링크, 상단 메뉴 | `config.toml` |
| 자기소개와 연구 관심사 | `bio.md`, `about.toml` |
| News | `news.toml` |
| 논문 메타데이터, selected 여부, 썸네일 | `publications.bib` |
| 논문별 Motivation과 개인 메모 | `publications/<연도-짧은제목>.md` |

## 논문별 페이지

각 BibTeX citation key가 상세 페이지 주소와 Markdown 파일명을 결정합니다.

예시:

- BibTeX key: `2026-clear-cross-lingual-enhancement-retrieval-reverse`
- 페이지: `/publications/2026-clear-cross-lingual-enhancement-retrieval-reverse/`
- Motivation: `publications/2026-clear-cross-lingual-enhancement-retrieval-reverse.md`

Markdown 파일의 `Motivation`과 `Notes` 부분만 자유롭게 수정하면 됩니다.

## 논문 썸네일

`public/papers/`에 이미지를 넣고 `publications.bib`의 `preview` 값을 파일명으로 지정합니다.
현재는 공통 기본 이미지 `publication-default.svg`를 사용합니다.
