# Build the Windows EXE using GitHub Actions

This package is configured to build a Windows installer on a Windows GitHub Actions runner.

1. Create a new GitHub repository and upload all files/folders from this package (including the hidden `.github` folder).
2. Open the repository's **Actions** tab.
3. Select **Build Windows EXE** from the workflow list.
4. Click **Run workflow** and confirm.
5. When it completes, open that workflow run and scroll to **Artifacts**.
6. Download `PC-Floating-Voice-Typing-Windows-Installer`; extract it to get the `.exe` installer.

You can also build on a Windows PC with Node.js installed by running `npm install` and then `npm run dist:win` in PowerShell. The installer will be created in `dist`.

Note: this is a prototype. Speech recognition relies on Chromium/Web Speech API availability and usually needs internet. Test microphone permissions and paste behavior on your PC before relying on it.
