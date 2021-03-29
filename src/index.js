const config = require('../config.json');

global.gConfig = config;

const apis = require('../bin/apis/index');

module.exports = { apis };

process.on('uncaughtException', err => {
    console.error('An error occurred', err)
    process.exit(1) //mandatory (as per the Node.js docs)
});
