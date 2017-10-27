let Client = require('node-rest-client').Client;
let client = new Client();

let request = (url, type, args) => {
    return new Promise((resolve, reject) => {
        client[type](url, args, (data, response) => {
            resolve({
                data: data,
                response: response
            });
        }).on('requestTimeout', (req) => {
            reject(new Error(`Request timeout occurred - ${req.method} ${req.path}`));
            req.abort();
        }).on('responseTimeout', (res) => {
            reject(new Error("Response timeout occurred."));
        }).on('error', (err) => {
            reject(err);
        });
    });
};

client.sendRequest = request;
module.exports = client;