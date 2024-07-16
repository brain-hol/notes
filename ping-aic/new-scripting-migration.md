# New Scripting Migration

- Remove all java classes and importer

- Change `outcome` and `fr.Action` to `action.goTo()`

```js
// Before
outcome = 'outcome'

// Or
var fr = JavaImporter(org.forgerock.openam.auth.node.api.Action);
action = fr.Action.goTo("false").build();   1

// After
action.goTo('outcome')
```

- Library scripts

```js
// Before
var scriptLogger = logger;
if (!nodeState.isDefined('trivir_loggingLibrary')) {
    logger.error('Logging library script not found on shared state');
} else {
    var loggingLibrary = eval(String(nodeState.get('trivir_loggingLibrary').asString()));
    scriptLogger = new loggingLibrary.ScriptLogger('Common_SetSuccessUrlFromPortalRequestParam');
}

// After
var loggingLibrary = require('Library_Logging')(logger, requestHeaders)
var scriptLogger = new loggingLibrary.ScriptLogger('Common_SetSuccessUrlFromPortalRequestParam');
```

- HTTP Client

```js
function deleteMaskingData(guid) {
    var request = new org.forgerock.http.protocol.Request();
    request.setMethod('DELETE');
    var environment = systemEnv.getProperty('esv.passthru.tenant');
    var uri = BASE_URL + '/v1/masking/' + guid + '?env=' + environment;
    request.setUri(uri);
    var token = systemEnv.getProperty('esv.passthru.token');
    request.getHeaders().add('Authorization', 'Bearer ' + token);
    try {
        var response = httpClient.send(request).get();
        if (!response.getStatus().isSuccessful()) {
            throw new Error('Failed to delete data from API with GUID: ' + response.getStatus().getCode())
        }
        var responseBody = response.getEntity().getString();
        return JSON.parse(responseBody);
    } catch (ex) {
        throw new Error('Exception while deleting API masking data: ' + ex.toString())
    }
}

function deleteMaskingData(guid) {
    var environment = systemEnv.getProperty('esv.passthru.tenant');
    var uri = BASE_URL + '/v1/masking/' + guid + '?env=' + environment;
    var token = systemEnv.getProperty('esv.passthru.token');
    try {
        var response = httpClient.send(uri, {
            method: 'DELETE',
            token: token
        }).get();
        if (response.status !== 200) {
            throw new Error('Failed to delete data from API with GUID: ' + response.status)
        }
        return responseBody.json();
    } catch (ex) {
        throw new Error('Exception while deleting API masking data: ' + ex.toString())
    }
}
```

- Change idRepository to use identity

```js
```

- Optional: Remove .asString(), .asMap(), etc... from JsonValue items like nodeState.get()

- Callbacks
