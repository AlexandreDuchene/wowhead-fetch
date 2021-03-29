const client = require('https');
const parser = require('../parsers/wowhead');

const apiEndPoint = global.gConfig.wowhead.api_endpoints.classic;
const apiRoutes = {
    'getItem': global.gConfig.wowhead.api_routes.get_item
}

function fetchItem(itemName, locale = 'en', format = 'xml') {
    let url = apiEndPoint + apiRoutes.getItem + itemName + '&' + format;

    // Append subdomain locale if not english
    if (locale !== 'en') {
        url = locale + '.' + url;
    }

    url = 'https://' + url;

    return new Promise(function (resolve, reject) {
        client.get(url, (result) => {
            const { statusCode } = result;

            if (statusCode !== 200) {
                reject(new Error(
                    'Request GET ' + url + ' failed.\n' +
                    'Status Code:' + statusCode
                ));
                return;
            }

            result.setEncoding('utf8');
            let rawData = '';
            result.on('data', (chunk) => {
                rawData += chunk;
            });
            result.on('end', () => {
                try {
                    const item = parser.convertXmlItemToObject(rawData);
                    resolve(item.wowhead.item[0]);
                } catch(e) {
                    reject(e);
                }
            });
        }).on('error', (e) => {
            reject(new Error(
                'Request GET ' + url + ' failed.\n' +
                'Error: ' + e.message
            ));
        });
    });
}

module.exports = { fetchItem };
