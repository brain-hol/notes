# Postman Service Account Auth

When making API calls against a Ping AIC tenant, you need to have an access token of some sort. The most common way to do this is with a service account, but that requires the use of a JWT bearer grant for the access token exchange.

Ping has [documented instructions](https://backstage.forgerock.com/docs/idcloud/latest/developer-docs/authenticate-to-rest-api-with-access-token.html) for how to get an access token, but these steps are not possible as part of a Postman request. [documentation] documentation page has instructions for how to do this, these steps are not possible as part of a Postman request.

::: tip Quick and Easy Token
As a side note, the `frodo info` command will also print an access token.
:::

## Using the `jsrassign` Library

Although Postman does have some support for [external libraries](https://learning.postman.com/docs/tests-and-scripts/write-scripts/postman-sandbox-api-reference/#using-external-libraries), they do not have any functionality for RSA which is what Ping AIC uses to sign JWT's.

However, Postman does allow the user to create their own [package library](https://learning.postman.com/docs/tests-and-scripts/write-scripts/package-library/) for reusable pieces of code in pre-request and post-request scripts. We can use a publically avaliable JavaScript library, [`jsrassign`](https://github.com/kjur/jsrsasign) to handle the RSA and JWT methods.

Out of the box the script will not work because it uses global variables as its namespace and Postman evaluates library scripts in a module space. I modified the CDN version of the script to work for Postmand and made it available on TriVir's Nexus: [`jsrassign-postman.js`](https://nexus.trivir.com/repository/postman-libs/jsrassign-postman.js).

::: info
See Postman's docs on [adding a new package](https://learning.postman.com/docs/tests-and-scripts/write-scripts/package-library/#add-a-new-package) to add the script to your own library.

*Postman does not support importing or uploading the script. You will need to copy and paste it in manually.*
:::

## Setting Auth in Pre-Request Scripts

Now that we have the `jsrassign` library available for use in pre-request and post-reqeust scripts, we can set up the pre-request script that will exchange for the access token and assign it to a variable for use in the authorization header.

Here's an example script that reads the variables from the current Postman Environment and sets the `aic_access_token` variable to the access token.

```js
const { KJUR, KEYUTIL } = pm.require('jsrassign')

// Environment specific changes
const audience = `https://${pm.environment.get('tenant_fqdn')}/am/oauth2/access_token`;
const serviceAccountId = pm.environment.get('service_account_id');
const serviceAccountJwk = pm.environment.get('service_account_jwk');
const accessTokenVariableName = 'aic_access_token';

// Build JWT for auth request
const jwk = KJUR.jws.JWS.readSafeJSONString(serviceAccountJwk);
const key = KEYUTIL.getKey(jwk);
const header = {
    alg: 'RS256'
}
const payload = {
    iss: serviceAccountId,
    sub: serviceAccountId,
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 180,
    jti: pm.variables.replaceIn('{{$randomUUID}}')
}
const headerString = JSON.stringify(header);
const payloadString = JSON.stringify(payload);
const jwt = KJUR.jws.JWS.sign('RS256', headerString, payloadString, key);

// Send auth request
const authRequest = {
  url:  audience,
  method: 'POST',
  header: {
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: {
    mode: 'urlencoded',
    urlencoded : [
      { key: 'client_id', value: 'service-account' },
      { key: 'grant_type', value: 'urn:ietf:params:oauth:grant-type:jwt-bearer' },
      { key: 'assertion', value: jwt },
      { key: 'scope', value: 'fr:am:* fr:idm:*' },
    ]
  }
};
pm.sendRequest(authRequest, function (err, response) {
    const responseBody = response.json();
    pm.variables.set(accessTokenVariableName, responseBody.access_token);
});
```

The parts to change are under the comment "Environment specific changes". Specifically we need three environment variables:

1. `tenant_fqdn` - The FQDN of the tenant to authenticate to, e.g. `openam-trivir-dev2.forgeblocks.com`.
1. `service_account_id` - The ID of the service account to authenticate with.
1. `service_account_jwk` - The string contents of the JWK file Ping gives you when you created the service account you are authenticating with.

The last thing to change is the `accessTokenVariableName` which is the name of the varible the script will assign the access token to.

## Using the Pre-Request Script

This pre-request script can be set at either the request level or the collection level. You can then set the authorization for the request/collection to be of type Bearer Token with a value of <span v-pre>`{{aic_access_token}}`</span> (or whatever you name the variable).
