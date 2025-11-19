import { test } from 'node:test';
import assert from 'node:assert';
import { classifyArchetype } from './archetype_classifier.ts';

test('INT dominant returns mage', () => {
  const result = classifyArchetype({ INT: 60, STR: 30, DEX: 10 });
  assert.strictEqual(result.primary, 'mage');
  assert.strictEqual(result.label, 'Mage');
});

test('STR dominant returns tank', () => {
  const result = classifyArchetype({ INT: 20, STR: 55, DEX: 25 });
  assert.strictEqual(result.primary, 'tank');
  assert.strictEqual(result.label, 'Tank');
});

test('DEX dominant returns rogue', () => {
  const result = classifyArchetype({ INT: 10, STR: 20, DEX: 52 });
  assert.strictEqual(result.primary, 'rogue');
  assert.strictEqual(result.label, 'Rogue');
});

test('STR and DEX tie creates hybrid label with STR priority', () => {
  const result = classifyArchetype({ INT: 10, STR: 45, DEX: 45 });
  assert.strictEqual(result.primary, 'tank');
  assert.ok(result.label.startsWith('Hybrid'));
  assert.ok(result.label.includes('Tank'));
  assert.ok(result.label.includes('Rogue'));
});

test('Equality follows INT > STR > DEX priority order', () => {
  const tripleTie = classifyArchetype({ INT: 40, STR: 40, DEX: 40 });
  assert.strictEqual(tripleTie.primary, 'mage');
  assert.ok(tripleTie.label.includes('Hybrid'));

  const dexStrTie = classifyArchetype({ INT: 30, STR: 50, DEX: 50 });
  assert.strictEqual(dexStrTie.primary, 'tank');
});
