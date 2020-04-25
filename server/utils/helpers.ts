const util = require('util');
const fs = require('fs');
const rr = require("rimraf");
const cp = require('child_process');

const spawn = util.promisify(cp.spawn);
const exec = util.promisify(cp.exec);
const rimraf = util.promisify(rr);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);


export default { spawn, exec, rimraf, stat, readFile };
