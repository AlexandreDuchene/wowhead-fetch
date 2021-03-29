const client = require('http');

const apiEndPoint = global.gConfig.wowhead.api_endpoints;
const apiRoutes = {
    'getItem': global.gConfig.wowhead.api_routes.get_item
}

exports.fetchItem = function(itemName, locale = 'en', format = 'xml') {
    let url = apiEndPoint + apiRoutes.getItem;

    // Append subdomain locale if not english
    if (locale !== 'en') {
        url = locale + '.' + url;
    }

    url += itemName + '&' + format;

    client.get(url, (result) => {
        const { statusCode } = result;

        if (statusCode !== 200) {
            result.resume();

            throw new Error(
                'Request GET ' + url + ' failed.\n' +
                'Status Code:' + statusCode
            );
        }

        result.setEncoding('utf8');
        let rawData = '';
        result.on('data', (chunk) => { rawData += chunk; });
        result.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        throw new Error(
            'Request GET ' + url + ' failed.\n' +
            'Error: ' + e.message
        );
    });

}
