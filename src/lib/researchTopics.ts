// Editorial groupings; publication metadata remains in publications.bib.
export const researchTopics = [
  {
    "id": "retrieval",
    "label": "Retrieval",
    "caption": "Find across languages",
    "question": "How can we find knowledge beyond the language of a query?",
    "description": "I study multilingual representations and sparse and dense retrieval, with an interest in transferring retrieval capabilities across languages and resource settings.",
    "connection": "The next question: which of the retrieved passages should a system trust and use?",
    "paperIds": [
      "2026-sembridge-language-transfer-sparse-encoders-multilingual",
      "2026-improving-semantic-proximity-english-centric-information",
      "2026-shift-semantic-harmonization-index-side-feature",
      "2026-mimo-multilingual-information-retrieval-monolingual-objectives",
      "2026-reducing-representational-interference-retrieval-embeddings-trainable-prefix-tokens",
      "2026-improving-korean-english-cross-lingual-retrieval",
      "2026-beyond-hard-negatives-importance-score-distribution",
      "2026-query-synergy-leveraging-high-resource-languages",
      "2026-clear-cross-lingual-enhancement-retrieval-reverse",
      "2026-rescaling-mlm-head-neural-sparse-retrieval",
      "2026-semantic-fragment-similarity-representation-learning-information"
    ]
  },
  {
    "id": "reranking",
    "label": "Reranking",
    "caption": "Select relevant evidence",
    "question": "What makes a passage useful, beyond semantic similarity?",
    "description": "I explore how rerankers select evidence by considering relevance, language coherence, and how documents are represented within a limited context budget.",
    "connection": "Between retrieval and generation: selecting the evidence that an answer will be built on.",
    "paperIds": [
      "2026-renderrank-learning-rerank-text-compressed-visual-tokens",
      "2026-lamar-open-language-aware-multilingual-alignment-reranker"
    ]
  },
  {
    "id": "generation",
    "label": "Generation",
    "caption": "Use evidence, reason efficiently",
    "question": "How can models use evidence and reason more efficiently?",
    "description": "I work on retrieval-augmented generation and adaptive reasoning, from making retrieved context clearer to deciding how much thinking a question needs.",
    "connection": "Back to the evidence: better answers depend on what is retrieved, selected, and understood.",
    "paperIds": [
      "2026-dart-draft-agreement-routing-training-free",
      "2025-ambiguity-accuracy-transformative-effect-coreference-resolution",
      "2024-intelligent-predictive-maintenance-rag-framework-power",
      "2026-distilling-directional-verification",
      "2026-i-dont-need-solution-i-need",
      "2026-beyond-penalizing-mistakes-stabilizing-efficiency-training",
      "2025-revise-framework-revising-ocred-text-practical"
    ]
  },
  {
    "id": "transfer",
    "label": "Multilingual",
    "caption": "",
    "question": "How can a capability travel from one language to another?",
    "description": "I explore cross-lingual adaptation through code-switching, embedding transfer, and representation alignment, with the aim of reducing the need to learn each language independently.",
    "connection": "A shared foundation for retrieval and generation across languages.",
    "paperIds": [
      "2025-cross-lingual-optimization-language-transfer-large",
      "2025-semantic-aware-linear-transfer-by-recycling",
      "2025-migrate-cross-lingual-adaptation-domain-specific",
      "2026-shift-semantic-harmonization-index-side-feature",
      "2026-mimo-multilingual-information-retrieval-monolingual-objectives",
      "2026-sembridge-language-transfer-sparse-encoders-multilingual",
      "2026-improving-korean-english-cross-lingual-retrieval",
      "2026-query-synergy-leveraging-high-resource-languages",
      "2026-clear-cross-lingual-enhancement-retrieval-reverse",
      "2026-improving-semantic-proximity-english-centric-information",
      "2024-translation-multifaceted-data-without-re-training"
    ]
  },
  {
    "id": "evaluation",
    "label": "Evaluation & Diagnostics",
    "caption": "",
    "question": "What do our evaluations reveal—and what do they miss?",
    "description": "I study how to evaluate multilingual retrieval, diagnose fragile alignment in model representations, and test complex instruction following with verifiable criteria.",
    "connection": "A way to examine the models and evidence used across the whole pipeline.",
    "paperIds": [
      "2026-mlaire-multilingual-language-aware-information-retrieval",
      "2026-skin-deep-geometric-diagnostic-alignment-fragility",
      "2025-metric-calculating-benchmark-code-verifiable-complicate",
      "2026-refusal-localizes-damage-relocates-safety-layers",
      "2024-kocommongen-v2-benchmark-navigating-korean-commonsense"
    ]
  },
  {
    "id": "inference",
    "label": "Efficient Inference",
    "caption": "",
    "question": "Where should a model spend its computation?",
    "description": "I explore adaptive thinking budgets, early stopping, and speculative decoding to make reasoning and generation more efficient without treating every input as equally difficult.",
    "connection": "A complementary view of generation: not only what to answer, but how to compute it.",
    "paperIds": [
      "2026-vision-not-overhead-one-pass-block-drafting",
      "2026-funnel-thoughts-efficient-test-time-scaling",
      "2026-dart-draft-agreement-routing-training-free",
      "2026-activation-kv-cache-sparsity-cross-llm-decoding",
      "2026-beyond-penalizing-mistakes-stabilizing-efficiency-training"
    ]
  }
];
