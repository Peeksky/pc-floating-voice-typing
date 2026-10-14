# PC Floating Voice Typing (Windows prototype)

A small always-on-top floating voice typing window. The global shortcut **Ctrl+Shift+Space** starts/stops listening; **Ctrl+Shift+Esc** stops. Recognized final speech is pasted into the app that was focused before the floating panel was opened, e.g. WhatsApp Desktop/Web, Notepad, Word, etc.

## Run it
1. Install Node.js LTS from the official Node.js website.
2. Extract this folder.
3. Open PowerShell in this folder.
4. Run `npm install`
5. Run `npm start`

## Important limitations
- This is a source-code prototype, not a signed installer. It needs Node.js and internet during first setup.
- The speech recognizer is the Web Speech API available in the embedded Chromium runtime; its availability and accuracy can vary. The browser-based HTML recognizer you like may behave differently in Electron. If recognition is unavailable in the app, the next step is a native Windows speech engine or Whisper-based implementation.
- Speech recognition usually requires internet and microphone access. No permission can be silently granted by the code.
- Hindi, English India, English US are supported by locale selection. Hinglish currently uses Hindi recognition and is experimental; it does not guarantee Roman-script transliteration.
- To paste into another app, keep the target app focused when you start speaking. The app uses the clipboard for recognized text, so it may replace the previous clipboard contents.

## Package contents
- `main.js`: floating window and global shortcuts
- `preload.js`: safe bridge between UI and desktop functions
- `overlay.html`, `renderer.js`: voice UI and recognition logic
- `master-caption-reference.html`: copy of the user's reference HTML for comparison
