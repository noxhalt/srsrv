"use strict";
const srsrv = require("./main").Srsrv;
const path = require("path");

const server = new srsrv();
server.route("/", path.join(__dirname, 'README.md'), { 'Content-Type': 'text/plain; charset=UTF-8' });
server.start(8080);
