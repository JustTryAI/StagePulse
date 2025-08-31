import { TimerConfig, TimerKind } from '../types';

// Export timers to specified format
export function exportTimers(timers: TimerConfig[], format: 'json' | 'csv'): string {
  if (format === 'json') {
    return JSON.stringify(timers, null, 2);
  }
  const header = 'id,title,kind,duration,startAt';
  const rows = timers.map((t) =>
    [
      t.id,
      escapeCsv(t.title),
      t.kind,
      t.duration ?? '',
      t.startAt ?? '',
    ].join(',')
  );
  return [header, ...rows].join('\n');
}

// Import timers from given data
export function importTimers(data: string, format: 'json' | 'csv'): TimerConfig[] {
  if (format === 'json') {
    const arr = JSON.parse(data);
    return Array.isArray(arr) ? arr.map(normalizeTimer) : [];
  }
  const lines = data.trim().split(/\r?\n/);
  const [, ...rows] = lines; // skip header
  return rows.filter(Boolean).map((line) => {
    const [id, title, kind, duration, startAt] = parseCsvLine(line);
    return normalizeTimer({ id, title, kind, duration, startAt });
  });
}

function normalizeTimer(obj: any): TimerConfig {
  return {
    id: String(obj.id),
    title: String(obj.title),
    kind: obj.kind as TimerKind,
    duration: obj.duration !== undefined && obj.duration !== '' ? Number(obj.duration) : undefined,
    startAt: obj.startAt !== undefined && obj.startAt !== '' ? Number(obj.startAt) : undefined,
  };
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
  }
  result.push(current);
  return result;
}
