
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


