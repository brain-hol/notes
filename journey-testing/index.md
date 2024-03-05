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

We end up with these two items:

- AM client to handle interactions with the backend AM server
- Vitest to handle test running, expectations, matchers, and result reporting

Putting them together we end up with a pretty simple yet still powerful and flexible enough solution to test the journeys we write for AM.

If we were to take the simple journey from above and start writing a test for it, we could write something like this:

```ts
import { describe, test, expect } from 'vitest'
import { AmClient, Journey } from '@trivir/forgerock-am-client'

// If you are familiar with JUnit's or Jest's lifecycle methods, Vitest has the same
// This will run before all the tests to setup the `AmClient` used by all the tests
let amClient: AmClient
beforeAll(() => {
	amClient = new AmClient({
		host: 'openam-example-sandbox.forgeblocks.com',
	})
})

// Vitest's `describe` function lets us group related tests together for reporting
describe('Login Journey', () => {

	// This will run before every test in this `describe` group and setup a `Journey`
	// to be used by each test case
	let journey: Journey
	beforeEach(() => {
		journey = new Journey('Login', amClient)
	})
	
	// This needs to be `async` since we will await the `journey.next` 
	test('Should ask if user wants to remember device', async () => {

		// Step 1: Username and password
		let authStep = await journey.start()
        let callback = authStep.getCallback().asNameCallback()
		// We can make expectations about the Callback
        expect(callback.getPrompt()).toEqual('User Name')
        callback.setInput(0, 'brian_test')

        callback = authStep.getCallback().asPasswordCallback()
        expect(callback.getPrompt()).toEqual('Password')
        callback.setInput(0, 'TriVir#1')
		
		// Step 2: Ask to remember this device
        authStep = await journey.next(authStep)
        callback = authStep.getCallback().asTextOutputCallback()
        expect(callback.getMessage()).toContain('remembered')
        callback = authStep.getCallback().asChoiceCallback()
        callback.setInput(0, 1)
		
		// Done, the journey should have succeeded
		authStep = await journey.next(authStep)
		// We can also make expectations about the result of `journey.next`
		expect(authStep.tokenId).not.toBeNull()
	})
})
```

Running this test, if the journey were successful, you would see something like the following reported by Vitest:

```sh
pnpm test

# > @trivir/forgerock-am-client@0.1.0 test C:\Users\brian\Work\forgerock-am-client
# > vitest run
# 
# 
#  RUN  v1.3.0 C:/Users/brian/Work/forgerock-am-client
# 
#  ✓ tests/first.test.ts (1) 1023ms
#    ✓ Login Journey (1) 1022ms
#      ✓ Should ask if user wants to remember device 1022ms
# 
#  Test Files  1 passed (1)
#       Tests  1 passed (1)
#    Start at  08:50:39
#    Duration  1.51s (transform 179ms, setup 0ms, collect 239ms, tests 1.02s, environment 0ms, prepare 84ms)

```
