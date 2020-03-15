const { promisify } = require('util');
var S3 = require('aws-sdk/clients/s3');

var s3 = new S3({
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.ACCESS_TOKEN,
    region: 'ru-central1',
    endpoint: 'https://storage.yandexcloud.net'
});

module.exports.handler = async function handler(event) {
    const { key } = event.queryStringParameters;

    if (!key) {
        return {
            statusCode: 400,
            body: 'Query parameter "key" was not provided.'
        };
    }

    /**
     * Обработка GET
     */
    if (event.httpMethod === 'GET') {
        try {
            const response = await promisify(s3.getObject.bind(s3))({
                Bucket: process.env.BUCKET,
                Key: key
            });

            return {
                statusCode: 200,
                body: response.Body.toString()
            };
        } catch (error) {
            return {
                statusCode: error.statusCode,
                body: error.message
            };
        }
    }

    /**
     * Обработка POST
     */
    if (event.httpMethod === 'POST') {
        const data = event.isBase64Encoded
            ? Buffer.from(event.body, 'base64').toString()
            : event.body;

        await promisify(s3.putObject.bind(s3))({
            Bucket: process.env.BUCKET,
            Key: key,
            Body: data
        });

        return { statusCode: 200 };
    }

    /**
     * Обработка всего остального
     */
    return {
        statusCode: 400,
        body: `Method ${event.httpMethod} not supported.`
    };
};
