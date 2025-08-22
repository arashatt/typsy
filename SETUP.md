# Windows (on a system with no Adminstrator privilages)

Because I suffered so much to configure and run this projec On a Windows system with no Administor permissions, I want to add this file for the next person that may want to setup fast:

## Download Git and Node.Js

first you should download Portable Git, and of course, pre built Node.js binaries.

[Git Download page](https://git-scm.com/downloads/win) -> [Link to Portable files](https://github.com/git-for-windows/git/releases/download/v2.51.0.windows.1/PortableGit-2.51.0-64-bit.7z.exe)

[Node.Js Installation](https://nodejs.org/en/download) -> [Stand Alone Binary zip](https://nodejs.org/dist/v22.18.0/node-v22.18.0-win-x64.zip)

## Config Git only once in your vsCodes' lifetime

Then to configure
![git](image.png)
press `ctrl + ,` and search `git.path` and add this:

```
    "git.path": "<git portable executable directory>\\git.exe",

```

This is done only once, but the following configurations for vsCode launch.json and settings.json should be done everytime you have a new project.

## Node.Js and npm

Then open `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node-terminal",
      "name": "Run Script: build",
      "request": "launch",
      "command": "npm run build",
      "cwd": "${workspaceFolder}"
    },
    {
      "type": "node-terminal",
      "name": "Run Script: dev",
      "request": "launch",
      "command": "npm run dev",
      "cwd": "${workspaceFolder}"
    },
    {
      "type": "node-terminal",
      "name": "Install Dependencies",
      "request": "launch",
      "command": "npm install",
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

And Also `.vscode/settings.json`:

```json
{
  // VS Code internal Node path for debugging and extensions
  "node.path": "C:/Users/a.atari/<Path-To-node-Directory>/node.exe",

  // Terminal profiles for Windows
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    },
    "Command Prompt": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [
        "/k",
        "set PATH=C:/Users/<Your-UserName>/<Path-To-npm-Directory>;%PATH%"
      ],
      "icon": "terminal-cmd"
    },
    "Git Bash": {
      "source": "Git Bash"
    }
  },
  "terminal.integrated.defaultProfile.windows": "Command Prompt"
}
```
