import test from 'ava';
import { filter } from '../../src';
import { fromNumericArray, pairsFrom } from '../test-utils';

let values0: number[],
    values1: number[],
    values2: number[];
const predicate1 = (_: any, n: number) => ((n >>> 1) << 1) !== n;
const predicate2 = (_: any, n: number) => ((n >>> 1) << 1) === n;
test.before(() => {
  values0 = [1, 2, 3, 5, 8, 13, 21, 34, 55];
  values1 = [1, 3, 5, 13, 21, 55];
  values2 = [2, 8, 34];
});

test('items are considered excluded if the predicate returns a falsey value', t => {
  const map0 = fromNumericArray(values0);
  const map1 = filter(predicate1, map0);
  t.deepEqual(Array.from(map1), pairsFrom(values1));
});

test('items are considered included if the predicate returns a truthy value', t => {
  const map0 = fromNumericArray(values0);
  const map1 = filter(predicate2, map0);
  t.deepEqual(Array.from(map1), pairsFrom(values2));
});
