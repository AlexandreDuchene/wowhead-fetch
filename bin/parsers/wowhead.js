const xmlParser = require('xml2js');

function convertXmlItemToObject(xml)
{
    let object = {};
    xmlParser.parseString(xml, function(error, result) {
        object = result;
    });

    return object;
}

function extractJsonData(item) {
    const jsonString = item.json.toString() +',' + item.jsonEquip.toString();
    return JSON.parse('{' + jsonString + '}');
}

module.exports = { convertXmlItemToObject, extractJsonData };
