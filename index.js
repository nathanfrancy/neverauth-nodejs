let Client = require('node-rest-client').Client;
let client = new Client();

let request = require('./request').sendRequest;

function NeverAuthApi(args) {
    if (!args) args = {};

    // TODO: Change these to use https when we get that set up.
    this.urlRoot = "https://api.neverauth.io";
    let protocol = "https";

    // Set up variables for this instance
    this.accountAccessToken = args.accountAccessToken || null;
    this.userAccessToken = args.userAccessToken || null;
    this.clientId = args.clientId || null;
    this.secretKey = args.secretKey || null;

    if (!!args.urlRoot) {
        this.urlRoot = args.urlRoot;
    } else {
        if (!!args.protocol) {
            this.urlRoot = `${args.protocol}://api.neverauth.io`;
        } // Otherwise, use the default.
    }

    let context = this;

    /**
     * NeverAuth accounts API impl.
     */
    this.accounts = {

        /**
         * Registers for a NeverAuth account
         * @param data.name: required
         * @param data.email: required
         * @param data.password: required
         * @returns {Promise.<TResult>|*}
         */
        register: (data) => {
            let args = {
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password
                },
                headers: { "Content-Type": "application/json" }
            };

            return request(`${context.urlRoot}/accounts/register`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Authenticates a NeverAuth account
         * @param data.email
         * @param data.password
         * @returns {Promise.<TResult>|*}
         */
        authenticate: (data = {}) => {
            let args = {
                data: {
                    email: data.email,
                    password: data.password
                },
                headers: { "Content-Type": "application/json" }
            };

            return request(`${context.urlRoot}/accounts/authenticate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else {
                    context.accountAccessToken = restResponse.token;
                    return restResponse.data;
                }
            });
        },

        /**
         * De-authenticates a NeverAuth account access token
         * @param data.token
         * @returns {Promise.<TResult>|*}
         */
        deauthenticate: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/deauthenticate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Deactivates a NeverAuth account
         * @param data.token
         * @returns {Promise.<TResult>|*}
         */
        deactivate: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/deactivate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Checks the status of a NeverAuth account token
         * @param data.token
         * @returns {Promise.<TResult>|*}
         */
        checkToken: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/checktoken`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Gets the current account profile with NeverAuth token
         * @param data.token
         * @returns {*|comb.Promise|Promise.<TResult>}
         */
        getProfile: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/profile`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Gets the apps registered to a NeverAuth account
         * @param data.token
         * @returns {Promise.<TResult>|*}
         */
        getApps: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/apps`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Gets a specific app registered to a NeverAuth account
         * @param data.token
         * @param data.appId
         * @returns {Promise.<TResult>|*}
         */
        getApp: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/apps/${data.appId}`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.error);
                }
                else return restResponse.data;
            });
        },

        /**
         * Gets app users for a specific app tied to a NeverAuth account
         * @param data.token
         * @param data.appId
         * @returns {Promise.<TResult>|*}
         */
        getAppUsers: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/apps/${data.appId}/users`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.data.message);
                }
                else return restResponse.data;
            });
        },

        /**
         * Creates an app for a NeverAuth account
         * @param data.token
         * @param data.name
         * @param data.description
         * @returns {Promise.<TResult>|*}
         */
        createApp: (data = {}) => {
            let args = {
                data: {
                    name: data.name,
                    description: data.description
                },
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/apps`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.data.message);
                }
                else return restResponse.data;
            });
        },

        /**
         * Deletes an app for a NeverAuth account
         * @param data.token
         * @param data.appId
         * @returns {Promise.<TResult>|*}
         */
        deleteApp: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/apps/${data.appId}`, `delete`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.data.message);
                }
                else return true;
            });
        },

        /**
         * Searches for
         * @param data.token
         * @param data.appId
         * @param data.searchOptions
         * @returns {*|comb.Promise|Promise.<TResult>}
         */
        searchAppActivity: (data = {}) => {
            if (!searchOptions) searchOptions = {};

            let args = {
                parameters: data.searchOptions,
                headers: {
                    "x-neverauth-account-access-token": data.token || this.accountAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/accounts/apps/${data.appId}/activity`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) {
                    throw new Error(restResponse.data.message);
                }
                else return restResponse.data;
            });
        }
    };
    
    /**
     * App Users API
     */
    this.users = {

        /**
         * Creates a user
         * @param data.clientId
         * @param data.secretKey
         * @param data.name
         * @param data.email
         * @param data.password
         * @param data.settings
         * @returns {Promise.<TResult>|*}
         */
        create: (data = {}) => {
            let args = {
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    settings: data.settings || {}
                },
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * Authenticates a user
         * @param data.clientId
         * @param data.secretKey
         * @param data.email
         * @param data.password
         * @returns {Promise.<TResult>|*}
         */
        authenticate: (data = {}) => {
            let args = {
                data: {
                    email: data.email,
                    password: data.password
                },
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users/auth/authenticate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else {
                    context.userAccessToken = restResponse.token;
                    return restResponse.data;
                }
            });
        },

        /**
         * Checks an access token
         * @param data.clientId
         * @param data.secretKey
         * @param data.accessToken
         * @returns {Promise.<TResult>|*}
         */
        checkToken: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "x-neverauth-access-token": data.accessToken || this.userAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users/auth/checktoken`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return true;
            });
        },

        /**
         * De-authenticates a user
         * @param data.clientId
         * @param data.secretKey
         * @param data.accessToken
         * @returns {Promise.<TResult>|*}
         */
        deauthenticate: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "x-neverauth-access-token": data.accessToken || this.userAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users/auth/deauthenticate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else {
                    context.userAccessToken = null;
                    return true;
                }
            });
        },

        /**
         * Deactivates a user
         * @param data.clientId
         * @param data.secretKey
         * @param data.accessToken
         * @returns {Promise.<TResult>|*}
         */
        deactivate: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "x-neverauth-access-token": data.accessToken || this.userAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users/deactivate`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else {
                    context.userAccessToken = null;
                    return true;
                }
            });
        },

        /**
         * Gets the profile of the current user
         * @param data.clientId
         * @param data.secretKey
         * @param data.accessToken
         * @returns {Promise.<TResult>|*}
         */
        getProfile: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "x-neverauth-access-token": data.accessToken || this.userAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Gets the current user's settings
         * @param data.clientId
         * @param data.secretKey
         * @param data.accessToken
         * @returns {Promise.<TResult>|*}
         */
        getSettings: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "x-neverauth-access-token": data.accessToken || this.userAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users/settings`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Gets a specific setting for a user
         * @param data.clientId
         * @param data.secretKey
         * @param data.accessToken
         * @param data.key
         * @returns {Promise.<TResult>|*}
         */
        getSetting: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "x-neverauth-access-token": data.accessToken || this.userAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users/settings/${data.key}`, `get`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Saves user settings
         * @param data.clientId
         * @param data.secretKey
         * @param data.accessToken
         * @param data.settings
         * @returns {Promise.<TResult>|*}
         */
        saveSettings: (data = {}) => {
            let args = {
                data: data.settings || {},
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "x-neverauth-access-token": data.accessToken || this.userAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users/settings`, `post`, args).then((restResponse) => {
                if (restResponse.response.statusCode !== 200) throw new Error(restResponse.data.message);
                else return restResponse.data;
            });
        },

        /**
         * Deletes a specific user setting by key value
         * @param data.clientId
         * @param data.secretKey
         * @param data.accessToken
         * @param data.key
         * @returns {Promise.<TResult>|*}
         */
        deleteSetting: (data = {}) => {
            let args = {
                headers: {
                    "x-neverauth-clientid": data.clientId || this.clientId,
                    "x-neverauth-secretkey": data.secretKey || this.secretKey,
                    "x-neverauth-access-token": data.accessToken || this.userAccessToken,
                    "Content-Type": "application/json"
                }
            };

            return request(`${context.urlRoot}/users/settings/${data.key}`, `delete`, args).then((restResponse) => {
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