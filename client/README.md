# Client – Vue.js Frontend

This [Vue.js](https://vuejs.org/) template provides sample code how to connect to the ExpressJS backend.

## Client Structure

| File        | Purpose           | What you do?  |
| ------------- | ------------- | ----- |
| [README.md](./README.md) | Everything about the client | **READ ME** carefully! |
| [public/favicon.ico](public/favicon.ico) | [Favicon](https://en.wikipedia.org/wiki/Favicon) website icon | — |
| [public/index.html](public/index.html) | Static HTML entry point page | — |
| `src/` | src (i.e., source code) | All your code goes in here |
| [src/Api.js](src/Api.js) | Configures HTTP library to communicate with backend | — |
| [src/App.vue](src/App.vue) | Main Vue layout template for all view (or pages) | Change your global template for all views |
| `src/assets/` | Graphical resources | Add your images, logos, etc |
| `src/components/` | Vue components that are reusable LEGO blocks | Add your custom components here |
| [src/main.js](src/main.js) | Main JavaScript entry point | — |
| [src/router.js](src/router.js) | Vue routes configuration | Register new routes/pages/views |
| `src/views/` | Vue components that are separate pages/views | Add new routes/pages/views |
| [src/views/Home.vue](src/views/Home.vue) | Home page/view | Replace with your home page/view |
| [package.json](package.json) | Project meta-information | —|
| [vue.config.js](vue.config.js) | Vue configuration | — |

> NOTE: The (mandatory) exercises are essential for understanding this template and will *save* you time!

Optional: Learn how to create such a project template in this [tutorial](https://www.vuemastery.com/courses/real-world-vue-js/vue-cli).

## Requirements

* [Server](../server/README.md) backend running on `http://localhost:3000`
* [Node.js](https://nodejs.org/en/download/) (v12) => installation instructions for [Linux](https://github.com/nodesource/distributions)
* [Visual Studio Code (VSCode)](https://code.visualstudio.com/) as IDE
  * [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) plugin for Vue tooling
  * [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) plugin for linting Vue, JS, and HTML code
  * [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) plugin for debugging
* [Google Chrome](https://www.google.com/chrome/) as web browser
  * [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) plugin for debugging

## Project setup

Make sure, you are in the client directory `cd client`

Installs all project dependencies specified in [package.json](./package.json).

```sh
npm install
```

### Compiles and hot-reloads for development

Automatically recompiles and refreshes the browser tab if you save any changes to local files.

```sh
npm run serve
```

### Compiles and minifies for production

Builds the production-ready website into the `dist` directory.

```sh
npm run build
```

### Lints and fixes files

```sh
npm run lint
```

* [JavaScript Standard Style](https://standardjs.com/rules-en.html)
* [Are Semicolons Necessary in JavaScript? (8' background explanation)](https://youtu.be/gsfbh17Ax9I)

> The Vue.js community [favors](https://forum.vuejs.org/t/semicolon-less-code-my-thoughts/4229) omitting optional semicolons `;` in Javascript.

## Axios HTTP Library

* [Documentation with Examples](https://github.com/axios/axios#axios)

## Bootstrap 4 and BootstrapVue

* [BootstrapVue Components](https://bootstrap-vue.js.org/docs/components)
  * [Layout and Grid System](https://bootstrap-vue.js.org/docs/components/layout/)
  * [Link](https://bootstrap-vue.js.org/docs/components/link)
  * [Button](https://bootstrap-vue.js.org/docs/components/button)
  * [Form](https://bootstrap-vue.js.org/docs/components/form)
* [BootstrapVue Online Playground](https://bootstrap-vue.js.org/play/)

> Plain [Bootstrap 4](https://getbootstrap.com/) uses a popular JS library called [jQuery](http://jquery.com/) for dynamic components (e.g., dropdowns). However, using jQuery with Vue is [problematic](https://vuejsdevelopers.com/2017/05/20/vue-js-safely-jquery-plugin/) and therefore we use BootstrapVue here.

## Debug in VSCode with Chrome

1. **[VSCode]** Set a breakpoint in your Javascript code
2. **[Terminal]** Run `npm run serve` to serve the client
3. **[VSCode]** Select *Debug > Start Debugging (F5)* to automatically start a debug session in Chrome[<sup>1</sup>](#1)
4. **[Chrome]** Browse in Chrome to trigger your breakpoint and the focus will jump back to VSCode

Find illustrated instructions in the [Vuejs Debug Docs](https://vuejs.org/v2/cookbook/debugging-in-vscode.html).

<a class="anchor" id="1"><sup>1</sup></a> Chrome will launch with a separate user profile (not to mess up with your familiar daily Chrome profile) in a temp folder as described in the VSCode [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome). It is recommended to install the [vue-devtools](https://github.com/vuejs/vue-devtools) [Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) there.
