
import {describe, expect, test} from '@jest/globals';
import {ChapterOne} from './ChapterOne';



describe('Test get() and set() methods', () => {
  test('Sets name and finds proper value', () => {
    const hashTable = new ChapterOne.HashTable();
    hashTable.set('name', 'jake');
    expect(hashTable.get('name')).toBe('jake');
  });
});


describe('Test set() collision', () => {
  test('Sets name and finds colided value (expected)', () => {
    const hashTable = new ChapterOne.HashTable();
    hashTable.set('name', 'jake');
    hashTable.set('name', 'stu');
    expect(hashTable.get('name')).toBe('stu');
  });
});


// TODO: TEST ArrayList

// TODO: TEST StringBuilder


/**
 * ChapterOne Questions Test Suite
 */
const questions = new ChapterOne.Questions();


describe('Test Questions.isUnique() and Questions.isUniquePrimitive()', () => {
  test('', () => {
    expect(questions.isUnique('abcd')).toBe(true);
    expect(questions.isUnique('aacd')).toBe(false);
    expect(questions.isUniquePrimitive('abcd')).toBe(true);
    expect(questions.isUniquePrimitive('acda')).toBe(false);
  });
});
