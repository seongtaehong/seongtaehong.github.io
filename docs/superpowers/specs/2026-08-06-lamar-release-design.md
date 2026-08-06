# LAMAR Release Update Design

## Goal

Add the July 2026 release of LAMAR to the personal website using metadata verified from the official arXiv paper and Hugging Face model card.

## Content changes

- Add a `Jul 2026` News item announcing the paper and open 600M-parameter model release.
- Add `LAMAR: An Open Language-Aware Multilingual Alignment Reranker` as a 2026 arXiv preprint.
- Use the official author order: Seongtae Hong, Youngjoon Jang, Jungseob Lee, Seungyoon Lee, and Heuiseok Lim.
- Mark Heuiseok Lim as the corresponding author using the website's existing dagger convention.
- Link the publication to arXiv and expose the Hugging Face model through the existing code/model link field.
- Add a publication detail markdown file with an editable Motivation section.
- Use a representative figure from the paper as the publication thumbnail.

## Data and UI behavior

- The publication remains sorted with other July 2026 entries by the existing parser.
- The News item is inserted among existing July 2026 entries and respects the five-item collapsed view.
- No new component or dependency is required.

## Verification

- Parse the updated TOML and BibTeX.
- Confirm the new publication fields, links, author notation, and detail file.
- Run TypeScript checking.
- Verify the home page responds successfully from the development server.
