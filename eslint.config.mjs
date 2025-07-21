import oGrammarlyAttrs from './.eslintrules/o-grammarly-attrs.js'; // ❌ Broken import


import js from '@eslint/js';
import next from 'next/eslint';

export default [
  js.configs.recommended,
  next(),
];







