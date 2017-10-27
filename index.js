let Client = require('node-rest-client').Client;
let client = new Client();

let request = require('./request').sendRequest;

function NeverAuthApi(args) {
    if (!args) args = {};
    this.urlRoot = "https://api.neverauth.io";
    this.protocol = "https";

    if (!!args.urlRoot) {
        this.urlRoot = args.urlRoot;
    } else {
        if (!!args.protocol) {
            this.urlRoot = `${args.protocol}://api.neverauth.io`;
        } // Otherwise, use the default.
    }

    /**
     * My Account API service.
     */
    this.myAccount = {

        /**
         * Registers for a NeverAuth account
         * @param name
         * @param email
         * @param password
         * @returns {Promise.<TResult>|*}
         */
        register: (name, email, password) => {
            let args = {
                data: {
                    name: name,
                    email: email,
                    password: password
                },
                headers: { "Content-Type": "application/json" }
            };

            return request(`${this.urlRoot}/accounts/register`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Authenticates a NeverAuth account
         * @param email
         * @param password
         * @returns {Promise.<TResult>|*}
         */
        authenticate: (email, password) => {
            let args = {
                data: {
                    email: email,
                    password: password
                },
                headers: { "Content-Type": "application/json" }
            };

            return request(`${this.urlRoot}/accounts/authenticate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * De-authenticates a NeverAuth account access token
         * @param token
         * @returns {Promise.<TResult>|*}
         */
        deauthenticate: (token) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/deauthenticate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Deactivates a NeverAuth account
         * @param token
         * @returns {Promise.<TResult>|*}
         */
        deactivate: (token) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/deactivate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Checks the status of a NeverAuth account token
         * @param token
         * @returns {Promise.<TResult>|*}
         */
        checkToken: (token) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/checktoken`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Gets the current account profile with NeverAuth token
         * @param token
         * @returns {*|comb.Promise|Promise.<TResult>}
         */
        getProfile: (token) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/profile`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Gets the apps registered to a NeverAuth account
         * @param token
         * @returns {Promise.<TResult>|*}
         */
        getApps: (token) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/apps`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Gets a specific app registered to a NeverAuth account
         * @param token
         * @param appid
         * @returns {Promise.<TResult>|*}
         */
        getApp: (token, appid) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/apps/${appid}`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.error);
                }
                else return restResponse.data;
            });
        },

        /**
         * Gets app users for a specific app tied to a NeverAuth account
         * @param token
         * @param appid
         * @returns {Promise.<TResult>|*}
         */
        getAppUsers: (token, appid) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/apps/${appid}/users`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.data.message);
                }
                else return restResponse.data;
            });
        },

        /**
         * Creates an app for a NeverAuth account
         * @param token
         * @param name
         * @param description
         * @returns {Promise.<TResult>|*}
         */
        createApp: (token, name, description) => {
            let args = {
                data: {
                    name: name,
                    description: description
                },
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/apps`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.data.message);
                }
                else return restResponse.data;
            });
        },

        /**
         * Deletes an app for a NeverAuth account
         * @param token
         * @param appid
         * @returns {Promise.<TResult>|*}
         */
        deleteApp: (token, appid) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/apps/${appid}`, `delete`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.data.message);
                }
                else return true;
            });
        },

        /**
         * Searches for
         * @param token
         * @param appid
         * @param searchOptions
         * @returns {*|comb.Promise|Promise.<TResult>}
         */
        searchAppActivity: (token, appid, searchOptions) => {
            if (!searchOptions) searchOptions = {};

            let args = {
                parameters: searchOptions,
                headers: {
                    "x-neverauth-account-access-token": token,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/accounts/apps/${appid}/activity`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.data.message);
                }
                else return restResponse.data;
            });
        }
    };
    
    /**
     * App User API
     */
    this.user = {

        /**
         * Creates a user
         * @param clientid
         * @param secretkey
         * @param name
         * @param email
         * @param password
         * @param settings
         * @returns {Promise.<TResult>|*}
         */
        create: (clientid, secretkey, name, email, password, settings) => {
            let args = {
                data: {
                    name: name,
                    email: email,
                    password: password,
                    settings: settings || {}
                },
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Authenticates a user
         * @param clientid
         * @param secretkey
         * @param email
         * @param password
         * @returns {Promise.<TResult>|*}
         */
        authenticate: (clientid, secretkey, email, password) => {
            let args = {
                data: {
                    email: email,
                    password: password
                },
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users/auth/authenticate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Checks an access token
         * @param clientid
         * @param secretkey
         * @param accessToken
         * @returns {Promise.<TResult>|*}
         */
        checkToken: (clientid, secretkey, accessToken) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "x-neverauth-access-token": accessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users/auth/checktoken`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * De-authenticates a user
         * @param clientid
         * @param secretkey
         * @param accessToken
         * @returns {Promise.<TResult>|*}
         */
        deauthenticate: (clientid, secretkey, accessToken) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "x-neverauth-access-token": accessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users/auth/deauthenticate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Deactivates a user
         * @param clientid
         * @param secretkey
         * @param accessToken
         * @returns {Promise.<TResult>|*}
         */
        deactivate: (clientid, secretkey, accessToken) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "x-neverauth-access-token": accessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users/deactivate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Gets the profile of the current user
         * @param clientid
         * @param secretkey
         * @param accessToken
         * @returns {Promise.<TResult>|*}
         */
        getProfile: (clientid, secretkey, accessToken) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "x-neverauth-access-token": accessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Gets the current user's settings
         * @param clientid
         * @param secretkey
         * @param accessToken
         * @returns {Promise.<TResult>|*}
         */
        getSettings: (clientid, secretkey, accessToken) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "x-neverauth-access-token": accessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users/settings`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Gets a specific setting for a user
         * @param clientid
         * @param secretkey
         * @param accessToken
         * @param settingKey
         * @returns {Promise.<TResult>|*}
         */
        getSetting: (clientid, secretkey, accessToken, settingKey) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "x-neverauth-access-token": accessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users/settings/${settingKey}`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Saves user settings
         * @param clientid
         * @param secretkey
         * @param accessToken
         * @param settings
         * @returns {Promise.<TResult>|*}
         */
        saveSettings: (clientid, secretkey, accessToken, settings) => {
            let args = {
                data: settings || {},
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "x-neverauth-access-token": accessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users/settings`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Deletes a specific user setting by key value
         * @param clientid
         * @param secretkey
         * @param accessToken
         * @param key
         * @returns {Promise.<TResult>|*}
         */
        deleteSetting: (clientid, secretkey, accessToken, key) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": clientid,
                    "x-neverauth-secretkey": secretkey,
                    "x-neverauth-access-token": accessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${this.urlRoot}/users/settings/${key}`, `delete`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        }
    }

    return this;
};

module.exports = (args) => {
    return new NeverAuthApi(args);
};