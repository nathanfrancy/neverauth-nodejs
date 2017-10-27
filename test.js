let assert = require('assert');

let NeverAuthApi = require('./index')();

let $appName = "Test Application";
let $appDescription = "This is a test application description";
let $clientId = null;
let $secretKey = null;
let $accountToken = null;
let $email = "test@test.com";
let $password = "password";
let $name = "Test Name";
let $appid = null;
let $token = null;

let $settings = {
    admin: true,
    favoriteColor: 'blue'
};

let $moreSettings = {
    admin: false,
    favoriteMovie: 'Top Gun'
};

console.log(`==== REGISTER ====`);
NeverAuthApi.accounts.register({
    name: $name,
    email: $email,
    password: $password
}).then(async (registerResult) => {
    console.log(`${JSON.stringify(registerResult)}`);
    assert.equal(registerResult, true);
    console.log(`- passed -\n`);

    console.log(`==== AUTHENTICATE ====`);
    let authenticateResult = await NeverAuthApi.accounts.authenticate({
        email: $email,
        password: $password
    });
    console.log(`${JSON.stringify(authenticateResult)}`);
    assert.notEqual(authenticateResult.email, undefined);
    assert.notEqual(authenticateResult.token, undefined);
    assert.notEqual(authenticateResult.token.value, undefined);
    assert.equal(authenticateResult.apps.length, 0);
    console.log(`- passed -\n`);

    $accountToken = authenticateResult.token.value;

    console.log(`==== CHECK TOKEN ====`);
    let checkTokenResult = await NeverAuthApi.accounts.checkToken({
        token: $accountToken
    });
    console.log(`${JSON.stringify(checkTokenResult)}`);
    assert.equal(checkTokenResult, true);
    console.log(`- passed -\n`);

    console.log(`==== CREATE APP ====`);
    let createAppResult = await NeverAuthApi.accounts.createApp({
        token: $accountToken,
        name: $appName,
        description: $appDescription
    });
    console.log(`${JSON.stringify(createAppResult)}`);
    assert.notEqual(createAppResult.id, undefined);
    assert.notEqual(createAppResult.id, null);
    assert.notEqual(createAppResult.clientid, undefined);
    assert.notEqual(createAppResult.secretkey, undefined);
    assert.notEqual(createAppResult.clientid, null);
    assert.notEqual(createAppResult.secretkey, null);
    console.log(`- passed -\n`);

    $clientId = createAppResult.clientid;
    $secretKey = createAppResult.secretkey;
    $appid = createAppResult.id;

    console.log(`==== GET SINGLE APP ====`);
    let getSingleAppResult = await NeverAuthApi.accounts.getApp({
        token: $accountToken,
        appId: $appid
    });
    console.log(`${JSON.stringify(getSingleAppResult)}`);
    assert.equal(getSingleAppResult.name, $appName);
    assert.equal(getSingleAppResult.description, $appDescription);
    console.log(`- passed -\n`);

    console.log(`==== CREATE APP USER ====`);
    let createAppUserResult = await NeverAuthApi.users.create({
        clientId: $clientId,
        secretKey: $secretKey,
        name: $name,
        email: $email,
        password: $password,
        settings: $settings
    });
    console.log(`${JSON.stringify(createAppUserResult)}`);
    assert.equal(createAppUserResult, true);
    console.log(`- passed -\n`);

    console.log(`==== AUTHENTICATE APP USER ====`);
    let authenticateAppUserResult = await NeverAuthApi.users.authenticate({
        clientId: $clientId,
        secretKey: $secretKey,
        email: $email,
        password: $password
    });
    console.log(`${JSON.stringify(authenticateAppUserResult)}`);
    console.log(`- passed -\n`);
    $token = authenticateAppUserResult.token.value;

    console.log(`==== GET APP USER DETAILS ====`);
    let userDetailsResult = await NeverAuthApi.users.getProfile({
        clientId: $clientId,
        secretKey: $secretKey,
        accessToken: $token
    });
    console.log(`${JSON.stringify(userDetailsResult)}`);
    console.log(`- passed -\n`);

    console.log(`==== GET APP USER SETTINGS ====`);
    let userSettingsFirstResult = await NeverAuthApi.users.getSettings({
        clientId: $clientId,
        secretKey: $secretKey,
        accessToken: $token
    });
    console.log(`${JSON.stringify(userSettingsFirstResult)}`);
    assert.equal(userSettingsFirstResult.favoriteColor, "blue");
    console.log(`- passed -\n`);

    console.log(`==== SAVE APP USER SETTINGS ====`);
    let saveUserSettingsResult = await NeverAuthApi.users.saveSettings({
        clientId: $clientId,
        secretKey: $secretKey,
        accessToken: $token,
        settings: $moreSettings
    });
    console.log(`${JSON.stringify(saveUserSettingsResult)}`);
    assert.equal(saveUserSettingsResult.admin, "0");
    assert.equal(saveUserSettingsResult.favoriteColor, "blue");
    assert.equal(saveUserSettingsResult.favoriteMovie, "Top Gun");
    console.log(`- passed -\n`);

    console.log(`==== DELETE APP USER SINGLE SETTING ====`);
    let deleteUserSettingResult = await NeverAuthApi.users.deleteSetting({
        clientId: $clientId,
        secretKey: $secretKey,
        accessToken: $token,
        key: 'favoriteColor'
    });
    console.log(`${JSON.stringify(deleteUserSettingResult)}`);
    assert.equal(deleteUserSettingResult.admin, "0");
    assert.equal(deleteUserSettingResult.favoriteColor, undefined);
    assert.equal(deleteUserSettingResult.favoriteMovie, "Top Gun");
    console.log(`- passed -\n`);

    console.log(`==== GET SINGLE APP USER SETTING ====`);
    let getSettingResult = await NeverAuthApi.users.getSetting({
        clientId: $clientId,
        secretKey: $secretKey,
        accessToken: $token,
        key: 'favoriteMovie'
    });
    console.log(`${JSON.stringify(getSettingResult)}`);
    assert.equal(getSettingResult, "Top Gun");
    console.log(`- passed -\n`);

    console.log(`==== DEAUTHENTICATE APP USER ====`);
    let deauthenticateAppUserResult = await NeverAuthApi.users.deauthenticate({
        clientId: $clientId,
        secretKey: $secretKey,
        accessToken: $token
    });
    console.log(`${JSON.stringify(deauthenticateAppUserResult)}`);
    console.log(`- passed -\n`);

    console.log(`==== GET APP USER SETTINGS (should fail) ====`);
    try {
        let userSettingsSecondResult = await NeverAuthApi.users.getSettings({
            clientId: $clientId,
            secretKey: $secretKey,
            accessToken: $token
        });
        assert.fail();
    }
    catch (err) {
        console.log(`Error thrown, can't get setting after de-authenticating`);
        console.log(`- passed -\n`);
    }

    console.log(`==== AUTHENTICATE APP USER 2nd ====`);
    authenticateAppUserResult = await NeverAuthApi.users.authenticate({
        clientId: $clientId,
        secretKey: $secretKey,
        email: $email,
        password: $password
    });
    console.log(`${JSON.stringify(authenticateAppUserResult)}`);
    console.log(`- passed -\n`);
    $token = authenticateAppUserResult.token.value;

    console.log(`==== DEACTIVATE APP USER ====`);
    let deactivateAppUserResult = await NeverAuthApi.users.deactivate({
        clientId: $clientId,
        secretKey: $secretKey,
        accessToken: $token
    });
    console.log(`${JSON.stringify(deactivateAppUserResult)}`);
    console.log(`- passed -\n`);

    console.log(`==== GET APPS 1st ====`);
    let getApps1Result = await NeverAuthApi.accounts.getApps({
        token: $accountToken
    });
    console.log(`${JSON.stringify(getApps1Result)}`);
    assert.equal(getApps1Result.length, 1);
    console.log(`- passed -\n`);

    console.log(`==== CREATE ANOTHER APP ====`);
    let createAnotherAppResult = await NeverAuthApi.accounts.createApp({
        token: $accountToken,
        name: $appName,
        description: $appDescription
    });
    console.log(`${JSON.stringify(createAnotherAppResult)}`);
    assert.notEqual(createAnotherAppResult.id, undefined);
    assert.notEqual(createAnotherAppResult.id, null);
    assert.notEqual(createAnotherAppResult.clientid, undefined);
    assert.notEqual(createAnotherAppResult.secretkey, undefined);
    assert.notEqual(createAnotherAppResult.clientid, null);
    assert.notEqual(createAnotherAppResult.secretkey, null);
    console.log(`- passed -\n`);

    console.log(`==== GET APPS 2nd ====`);
    let getApps2Result = await NeverAuthApi.accounts.getApps({
        token: $accountToken
    });
    console.log(`${JSON.stringify(getApps2Result)}`);
    assert.equal(getApps2Result.length, 2);
    console.log(`- passed -\n`);

    console.log(`==== DELETE APP ====`);
    let deleteAppResult = await NeverAuthApi.accounts.deleteApp({
        token: $accountToken,
        appId: createAnotherAppResult.id
    });
    console.log(`${JSON.stringify(deleteAppResult)}`);
    assert.equal(deleteAppResult, true);
    console.log(`- passed -\n`);

    console.log(`==== GET APPS 3rd ====`);
    let getApps3Result = await NeverAuthApi.accounts.getApps({
        token: $accountToken
    });
    console.log(`${JSON.stringify(getApps3Result)}`);
    assert.equal(getApps3Result.length, 1);
    console.log(`- passed -\n`);

    console.log(`==== DEAUTHENTICATE ACCOUNT ====`);
    let deauthenticateResult = await NeverAuthApi.accounts.deauthenticate({
        token: $accountToken
    });
    console.log(`${JSON.stringify(deauthenticateResult)}`);
    assert.equal(deauthenticateResult, true);
    console.log(`- passed -\n`);

    console.log(`==== DEACTIVATE ACCOUNT (should fail) ====`);
    try {
        let deactivateFirstTryResult = await NeverAuthApi.accounts.deactivate({
            token: $accountToken
        });
        assert.fail();
    }
    catch (err) {
        console.log(`Error thrown, can't deactivate after deauthenticate, must re-authenticate first`);
        console.log(`- passed -\n`);
    }

    console.log(`==== AUTHENTICATE BEFORE DEACTIVATE ====`);
    let authenticateBeforeDeactivateResult = await NeverAuthApi.accounts.authenticate({
        email: $email,
        password: $password
    });
    console.log(`${JSON.stringify(authenticateBeforeDeactivateResult)}`);
    assert.notEqual(authenticateBeforeDeactivateResult.email, undefined);
    assert.notEqual(authenticateBeforeDeactivateResult.token, undefined);
    assert.notEqual(authenticateBeforeDeactivateResult.token.value, undefined);
    assert.equal(authenticateBeforeDeactivateResult.apps.length, 1);
    console.log(`- passed -\n`);
    $accountToken = authenticateBeforeDeactivateResult.token.value;

    console.log(`==== DEACTIVATE ACCOUNT ====`);
    let deactivateSecondTryResult = await NeverAuthApi.accounts.deactivate({
        token: $accountToken
    });
    console.log(`${JSON.stringify(deactivateSecondTryResult)}`);
    assert.equal(deactivateSecondTryResult, true);
    console.log(`- passed -\n`);

    console.log(`- ALL TESTS PASSED -`);

}).catch((err) => {
    console.log(err);
});