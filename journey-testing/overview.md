# Journey Testing

ForgeRock journeys start simple but can quickly grow in complexity to meet client needs. As they evolve, keeping track of all possible branches and edge cases becomes a challenge. That's why we wanted to create a way to unit test them.

Just like testing any other software, writing unit tests for ForgeRock Journeys is important. They help ensure that everything runs smoothly for deployments, hopefully catching bugs before they cause a problem.

## Vitest as the Testing Framework

ForgeRock doesn't offer any testing solutions so we had to improvise and make our own. I chose to use Vitest as the backing testing framework to encourage quick iteration and to reuse some of the experience we have from writing custom scripts for Scripted Decision nodes. Vitest is very similar to Jest if you have experience with that tool, but supports TypeScript out of the box and has other nice-to-have's.

I'm not going to go into too much depth, but for a quick example of how a Vitest test works, we can look at this example test for a simple `sum` function:

```ts
// sum.ts
export function sum(a: number, b: number): number {
  return a + b
}
```

```ts
// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

For more information on Vitest see their [official documentation](https://vitest.dev/). Specifically for differences between it and other test runners, see their [comparisons page](https://vitest.dev/guide/comparisons.html)

## The AM Client

Even though Vitest offers us a very useful and powerful testing framework, we still need a method of interacting with AM server on the backend. I was going to use ForgeRock's JavaScript SDK, but I found quickly that its TypeScript is pretty hacky and lackluster, and it is missing functionality for operations on the user like getting, setting, and removing attributes, etc.

Instead, I decided to start writing a simple TypeScript implementation of an AM client. The hope is that we can iterate on this library as we need more functionality. For now, it includes the basics of authenticating with a journey headlessly over REST.

For a very simple Login journey the code would look something like this. First we create the `AmClient`:

```ts
import { AmClient } from '@trivir/forgerock-am-client'

const amClient = new AmClient({
	host: 'openam-example-sandbox.forgeblocks.com',
})
```

With this new `AmClient`, we can create a `Journey`:

```ts
import { Journey } from '@trivir/forgerock-am-client'

const journey = new Journey('Login', amClient)
```

We can then start the journey and progress through each step. Every step will return us an `AuthStep` that we can use to get the callbacks we need to set inputs on:

```ts
// Step 1: Username and password
let authStep = await journey.start()
let callback = authStep.getCallback().asNameCallback()
callback.setInput(0, 'brian_test')
callback = authStep.getCallbacK().asPasswordCallback()
callback.setInput(0, 'Password123!')

// Step 2: Ask to remember this device
authStep = await journey.next(authStep)
authStep.getCallback() // Skip the message callback
callback = authStep.getCallback().asChoiceCallback()
callback.setInput(0, 1)

// Done, the journey should have succeeded
authStep = await journey.next(authStep)
console.log(authStep.tokenId)
```

## Putting Them Together

## User Functionality

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

## Next Steps
