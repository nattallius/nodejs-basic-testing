import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const snapshot = {
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 2,
      },
      value: 1,
    };
    const list = generateLinkedList([1, 2]);
    expect(list).toStrictEqual(snapshot);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2, 3]);
    expect(list).toMatchSnapshot();
  });
});
