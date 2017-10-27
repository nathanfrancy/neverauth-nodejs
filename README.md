# neverauth

NeverAuth is a platform/service offered for authenticating your application users. To sign up for an account and start using NeverAuth, please use the [admin site](http://neverauth.io).

The code in this package is the nodejs implementation of the NeverAuth api - pretty much just REST calls to the API itself, which you could do yourself but this client makes it easier. :)

## Design

The API is broken into separate namespaces - as of right now we have: 
- **users**: This is the main API, which you'll use in your application to authenticate, register and manage your users from.
- **accounts**: Everything you can do on the admin site, you can do with REST calls here.

When you include NeverAuth in your project files, these APIs are namespaced, so for example...

```javascript
NeverAuthApi.users.doThing(...)
```

## Getting Started

Install to your project:
```bash
npm install neverauth --save
```

New up the client in the file you need it:

```javascript
let NeverAuthApi = require('neverauth')();
```

From here, you're ready to start calling the API. 

## API Documentation

For a complete listing of examples, check out `test.js` file in this project for examples of calling the API. This document may not have an example of every endpoint.

### Accounts

The `accounts` API is mainly used for administration purposes on your NeverAuth account. Pretty much everything you can do in the admin dashboard you can do through the `accounts` API itself. This means you could write your own dashboard if you wanted, or you can use the one provided by NeverAuth.

#### `accounts.register`

Registers a NeverAuth account.

```javascript 
NeverAuthApi.register().then()...
```

#### `accounts.authenticate`

Authenticates a NeverAuth account.