# HerSpace Fake Call Voice

The Fake Call feature now plays bundled audio instead of showing a text conversation.

## Included

The project includes five local voice demo files in `src/assets/audio/` for Mom, Dad, Riya, Aisha and Priya.

These are **generated speech demo recordings**, not recordings of real people and not OpenAI AI-generated voices.

## Replacing them with AI-generated recordings

For the hackathon, you can generate your final voice clips with a text-to-speech service and replace the five MP3 files with your own AI-generated MP3s using the same filenames:

- `mom-call.mp3`
- `dad-call.mp3`
- `riya-call.mp3`
- `aisha-call.mp3`
- `priya-call.mp3`

No backend is needed for prerecorded audio. Vite bundles these files with the frontend and the browser plays them locally.

The active call screen will automatically use the replacement files.
