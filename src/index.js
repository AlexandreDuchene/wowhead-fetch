const config = require('../config.json');

global.gConfig = config;

const apis = require('../bin/apis/index');
const parser = require('../bin/parsers/wowhead')

module.exports = { apis, parser };

process.on('uncaughtException', err => {
    console.error('An error occurred', err)
    process.exit(1) //mandatory (as per the Node.js docs)
});
