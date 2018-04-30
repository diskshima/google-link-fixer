# link-fixer

Browser extension to remove link redirects in Google search results.
Works in Chrome and Firefox.

## Installation

### Install nvm (optional but recommended)

1. Install [nvm](https://github.com/creationix/nvm#install-script).
1. Install the nvm version in `.nvmrc`.
    ```bash
    nvm install v8.9.4
    ```

## Building The Code

1. Install [yarn](https://yarnpkg.com/).
    ```bash
    npm install -g yarn
    ```
1. Run `yarn install`.
    ```bash
    yarn install
    ```
1. Run the below to transpile the code.
    ```bash
    yarn build
    ```
1. Run the below to build XPI.
    ```bash
    yarn build-xpi
    ```

## Built with

- [babel](https://babeljs.io/)
- [Flow](https://flow.org/)
