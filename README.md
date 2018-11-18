# socket.io-connections

![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)

[![npm version][version-badge]][version-url]
[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-url]
[![dependency status][dependency-badge]][dependency-url]
[![devdependency status][devdependency-badge]][devdependency-url]
[![Code Climate][maintainability-badge]][maintainability-url]
[![downloads][downloads-badge]][downloads-url]

[![NPM][npm-stats-badge]][npm-stats-url]

> Events-based socket.io connections monitoring.

## Installation

`npm install --save socket.io-connections`

## Usage

```javascript
const io = require('socket.io')(80);
const SocketMonitoring = require('socket.io-connections');

const monitoring = new SocketMonitoring(io, {
  namespaces: 'chat' // Optional
});

monitoring.on('connections-count-change', (count, socket) => {
  // ...
});

monitoring.start();
```

## License

MIT License

Copyright (c) 2018 **Nicolas COUTIN**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[version-badge]: https://img.shields.io/npm/v/socket.io-connections.svg
[version-url]: https://www.npmjs.com/package/socket.io-connections
[vulnerabilities-badge]: https://snyk.io/test/npm/socket.io-connections/badge.svg
[vulnerabilities-url]: https://snyk.io/test/npm/socket.io-connections
[dependency-badge]: https://david-dm.org/ilshidur/socket.io-connections.svg
[dependency-url]: https://david-dm.org/ilshidur/socket.io-connections
[devdependency-badge]: https://david-dm.org/ilshidur/socket.io-connections/dev-status.svg
[devdependency-url]: https://david-dm.org/ilshidur/socket.io-connections#info=devDependencies
[maintainability-badge]: https://api.codeclimate.com/v1/badges/392fe7727ba401215c0d/maintainability
[maintainability-url]: https://codeclimate.com/github/Ilshidur/socket.io-connections/maintainability
[downloads-badge]: https://img.shields.io/npm/dt/socket.io-connections.svg
[downloads-url]: https://www.npmjs.com/package/socket.io-connections
[npm-stats-badge]: https://nodei.co/npm/socket.io-connections.png?downloads=true&downloadRank=true
[npm-stats-url]: https://nodei.co/npm/socket.io-connections
