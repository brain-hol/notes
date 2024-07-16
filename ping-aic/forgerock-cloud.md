<script setup>
import { ref } from 'vue';

const libraryName = ref('replaceMe');
const requestParamName = ref('replaceMe')
const requestParamVarName = ref('replaceMe')
const requestParamValueVar = ref('replaceMe')
</script>

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

::: info Snippet Customization
You can customize these snippets for easy copy and paste by changing the value of the input fields above the snippet block.
:::

### Export Library Module onto Shared State

<InputWithLabel v-model="libraryName" fieldName="libraryName" label="Library Name:" />

```js-vue
var module = `
(function() {

    // ... module items

    return {
        // ... public items
    }

})();
`;

nodeState.putShared('trivir_{{ libraryName }}Library', module);
outcome = 'true';
```

### Import Library Module from Shared State

<InputWithLabel v-model="libraryName" fieldName="libraryName" label="Library Name:" />

```js-vue
if (!nodeState.isDefined('trivir_{{ libraryName }}Library')) {
    logger.error('{{ libraryName }} library script not found on shared state');
}
var {{ libraryName }}Library = eval(String(nodeState.get('trivir_{{ libraryName }}Library').asString()));
```

### Reading a Request Paramater

<InputWithLabel v-model="requestParamName" fieldName="requestParam" label="Request Paramater Name:" />
<InputWithLabel v-model="requestParamVarName" fieldName="requestParamVar" label="Request Paramater Variable Name:" />
<InputWithLabel v-model="requestParamValueVar" fieldName="requestParamValueVar" label="Request Paramater Value Variable Name:" />

```js-vue
var {{ requestParamVarName }} = '{{ requestParamName }}';
if (!requestParameters.get({{ requestParamVarName }}) || !requestParameters.get({{ requestParamVarName }}).get(0)) {
    action = fr.Action.goTo('false').withErrorMessage('No ' + {{ requestParamVarName }} + ' parameter provided').build();
    return;
}
var {{ requestParamValueVar }} = String(requestParameters.get({{ requestParamVarName }}).get(0));
```
