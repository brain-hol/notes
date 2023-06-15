# ForgeRock Cloud

## Wrap your auth script as a function

In order to determine the output of a scripted decision node, an auth script can use either of the following options:

1. Set the `output` variable to a `string` (this is the most simple).
2. Set the `action` variable to an `org.forgerock.openam.auth.node.api.Action` (this is useful for setting an error message or session property at the same time).

An outcome specified with the Action.goTo method overrides the value set for the outcome variable. For example:

```js
action = Action.goTo("false").build() // Evaluation continues along the "false" outcome.
outcome = "true"                      // No effect.
```

Both of these options can be overriden at anytime in the script. This causes an issue when using guard statements in your code. For example:

```js
var wasSuccessful = doNetworkCall();
if (!wasSuccessful) {
    outcome = "false";
}
outcome = "true"; // Overwrites the about outcome = "false"
```

You would have to write this in if/else blocks and do nested if's.

If instead we wrap this in a function, we can return immediately after setting the outcome (or really whenever we want). For example:

```js
(function () {
    var wasSuccessful = doNetworkCall();
    if (!wasSuccessful) {
        outcome = "false";
        return;
    }
    outcome = "true";
})();
```

You could also name this function and call it instead:

```js
function main() {
    var wasSuccessful = doNetworkCall();
    // ...
}

main();
```

## Snippets

These are common snippets, useful for copy and paste with a couple of modifications.

### Export Library Module onto Shared State

```js
var module = `
(function() {

    // ... module items

    return {
        // ... public items
    }

})();
`;

nodeState.putShared('trivir_<LIBRARY_NAME>Library', module);
outcome = 'true';
```

### Import Library Module from Shared State

```js
if (!nodeState.isDefined('trivir_<LIBRARY_NAME>Library')) {
    logger.error('<LIBRARY_NAME> library script not found on shared state');
}
var <LIBRARY_NAME>Library = eval(String(nodeState.get('trivir_<LIBRARY_NAME>Library').asString()));
```

### Reading a Request Paramater

```js
var REQUEST_PARAM_NAME = '<NAME_OF_YOUR_REQUEST_PARAM>';
if (!requestParameters.get(REQUEST_PARAM_NAME) || !requestParameters.get(REQUEST_PARAM_NAME).get(0)) {
    action = fr.Action.goTo('false').withErrorMessage('No ' + REQUEST_PARAM_NAME + ' parameter provided').build();
    return;
}
var <VARIABLE_NAME> = String(requestParameters.get(REQUEST_PARAM_NAME).get(0));
```
