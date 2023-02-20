# Electron Demo

This application serves as a Demo of Electron and Desktop capture.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Compiles and minifies for ARM64 SBC
```bash
npm run electron:build -- --linux deb --arm64
```

## Electron build

Electron main process code is at `src/background.js`. This process launches a renderer process in a window, which will take the code at `src/main.js`.
It has been installed and configured using [electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/) for Vue.
This plugin bundles the current application with Vue and it is ready to launch electron in development.

### Installation

The following steps have been taken:

- Vue-Cli must be installed.
- Use `vue add electron-builder` to wrap the project with electron.
- Now you can run the `electron:serve` and `electron:build` scripts.
