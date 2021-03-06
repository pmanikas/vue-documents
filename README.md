# Vue Documents

This is a clone of Google Docs using Vue.js, Node.js, Sockets and Quill. You can collaboratively compose a document with anyone else having access to the same document url.

## Client Side

Client is using `Vue.js`, `sockets.io-client` and `quill`

### Client Installation

#### Enter client folder

```bash
cd client
```

#### Install dependencies

```bash
yarn install
```

#### Compile and hot-reload for development

```bash
yarn serve
```

#### Compile and minify for production

```bash
yarn build
```

#### Lint and fix files

```bash
yarn lint
```

## Server Side

Server is using `Node.js`, `sockets.io` and `mongo db (mongoose)`

### Server Installation

#### Enter server folder

```bash
cd server
```

#### Install server dependencies

```bash
yarn install
```

#### Serve and hot-reload for development

```bash
yarn install
```

## Future Features

- Add to homepage a list of documents user had worked on (local storage and later on, server-side).
- Implement Authentication and doc access per user permissions.
