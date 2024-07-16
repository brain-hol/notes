# Identify Existing User Node

This node can be a little confusing due to the similarly named configuration options.

The basic outline for this node follows this psuedocode:

```
identity = objectAttributes[config.identityAttribute] ?: sharedState.username

managedObject = objectWhere(object[config.identityAttribute] === identity)

if managedObject is empty {
    return false
}

objectAttributes.aliasList = managedObject.aliasList
sharedState._id = managedObject._id

if config.identifier and managedObject[config.identifier] not empty {
    sharedState.username = managedObject[config.identifier]
    objectAttributes[config.identifier] = managedObject[config.identifier]
}

return true
```
