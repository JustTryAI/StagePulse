export interface MessagePreset {
  key: string;
  placeholders?: string[];
}

// Preset messages with optional placeholders
export const messagePresets: MessagePreset[] = [
  { key: 'messages.preset.break' },
  { key: 'messages.preset.next', placeholders: ['name'] },
];
