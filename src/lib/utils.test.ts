import { expect, test } from 'vitest';
import { camelCaseFormatter, formatNumber } from './utils';

test('show 25000123 as 25,000,123', () => {
  expect(formatNumber(25_000_123)).toBe('25,000,123');
});

test('show multisig-contract as multisigContract', () => {
  expect(camelCaseFormatter('multisig-contract')).toBe('multisigContract');
});
