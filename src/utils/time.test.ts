import { addSeconds, formatTime } from './time';

test('addSeconds adds correctly', () => {
  expect(addSeconds(1000, 2)).toBe(3000);
});

test('formatTime formats mm:ss', () => {
  expect(formatTime(61000)).toBe('01:01');
});
