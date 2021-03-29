const xmlParser = require('xml2js');

function convertXmlItemToObject(xml)
{
    let object = {};
    xmlParser.parseString(xml, function(error, result) {
        object = result;
    });

    return object;
}

module.exports = { convertXmlItemToObject };
