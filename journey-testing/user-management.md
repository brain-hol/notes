# User Management

```ts
// Reset the user to a known state
const brianTestId = 'eb8de678-d69d-4543-87cd-55153910ff46'
await amClient.resetOathDevices(brianTestId)
await amClient.updateUser(brianTestId, {
	'fr-attr-date1': [],
	description: [],
	'fr-attr-str4': [],
})
```
