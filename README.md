### Setup
To get the project to compile successfully you must comment out the following line in `node_modules/ngx-electron/lib/electron.service.d.ts`:

```
    readonly isX86: boolean;
    readonly isX64: boolean;
    readonly isArm: boolean;
    readonly desktopCapturer: Electron.DesktopCapturer;
    readonly ipcRenderer: Electron.IpcRenderer;
    // readonly remote: Electron.Remote;    <--- Comment out this line
    readonly webFrame: Electron.WebFrame;
    readonly clipboard: Electron.Clipboard;
```