import momAudio from '../assets/audio/mom-call.mp3';
import dadAudio from '../assets/audio/dad-call.mp3';
import riyaAudio from '../assets/audio/riya-call.mp3';
import aishaAudio from '../assets/audio/aisha-call.mp3';
import priyaAudio from '../assets/audio/priya-call.mp3';

export const fakeCallers = [
  { id: 'mom', name: 'Mom', label: 'Mom', audio: momAudio },
  { id: 'dad', name: 'Dad', label: 'Dad', audio: dadAudio },
  { id: 'best-friend', name: 'Riya', label: 'Best Friend', audio: riyaAudio },
  { id: 'roommate', name: 'Aisha', label: 'Roommate', audio: aishaAudio },
  { id: 'work', name: 'Priya (Work)', label: 'Manager', audio: priyaAudio },
];

export const fakeCallDelays = [
  { id: 0, label: 'Right now', seconds: 0 },
  { id: 1, label: 'In 10 seconds', seconds: 10 },
  { id: 2, label: 'In 30 seconds', seconds: 30 },
  { id: 3, label: 'In 1 minute', seconds: 60 },
];

// Kept as metadata for future accessibility/TTS improvements.
// The active call screen does not display these lines as the conversation UI.
export const fakeConversation = [
  { speaker: 'them', line: 'Hey! Where are you right now?' },
  { speaker: 'them', line: 'Okay good — call me when you are inside.' },
  { speaker: 'them', line: 'I will wait. Let me know if you need me.' },
];
