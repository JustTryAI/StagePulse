import { addSeconds, formatTime } from './time';

test('addSeconds adds correctly', () => {
  expect(addSeconds(1000, 2)).toBe(3000);
});

test('formatTime formats mm:ss', () => {
  expect(formatTime(61000)).toBe('01:01');
});

test('formatTime formats hh:mm:ss when over an hour', () => {
  expect(formatTime(3661000)).toBe('01:01:01');
});

