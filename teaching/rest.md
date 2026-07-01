# REST

- Start by showing the table in the database with the presentations.

```sh
> sqlite3 ./data.sqlite
# SQLite version 3.50.2 2025-06-28 14:00:48
# Enter ".help" for usage hints.
sqlite> .mode qbox
sqlite> SELECT * FROM presentation;
# ┌────────────┬──────────────┬──────────────────┬─────────────────────────────────────────────────────┐
# │   author   │     date     │      topic       │                      recording                      │
# ├────────────┼──────────────┼──────────────────┼─────────────────────────────────────────────────────┤
# │ 'Jeremiah' │ '2025-07-02' │ 'Git Stuff'      │ x'2f7b2c9c6d1c09e3b348f19d0c3e3c2c890e69780e0c2ee9' │
# │ 'Huston'   │ '2025-07-09' │ 'Docker at home' │ x'9036a6f61bca32bb14b88322636ff957faf48a96e4ef206f' │
# │ 'Brian'    │ '2025-07-16' │ 'Yappin'         │ x'd23c8da5c23f7d034b56543c0d455130b1ff38193ac4d84d' │
# └────────────┴──────────────┴──────────────────┴─────────────────────────────────────────────────────┘
sqlite>
```

- Talk about this isn't convenient because the user has to know how to run these commands, etc.
- If someone creates the API instead, we can just do this all in code without having to know `sqlite`.
- Write `main.ts`:

```ts
import { getAllPresentations } from "./database.ts";

export function getAllAuthors() {
  const presentations = getAllPresentations();
  return presentations.map((p) => {
    return p.author;
  });
}

if (import.meta.main) {
  const authors = getAllAuthors();
  for (const author of authors) {
    console.log(author);
  }
}

```

- Talk about how this is useful, but someone has to know how to write JavaScript and they still have to have disk access to my database to be able to use this.
- Show that Python won't work with this.

```py
from database import get_all_presentations

def get_all_authors():
    presentations = get_all_presentations()
    return [p['author'] for p in presentations]

if __name__ == '__main__':
    authors = get_all_authors()
    for author in authors:
        print(author)

```

- Talk about our two needs:
	1. It needs to be language/platform agnostic.
	2. It needs to be accessible without disk access.
- There was already an existing protocol that does this: HTTP.
- Show your browser making a GET request to example.com, it returns a document, but we can return any text.
- Show a browser call to https://api.restful-api.dev/objects
- We just need a way to serialize/deserialize the data in the body and we can essentially make a function call to someone else's computer and we can write this in any language as long as it can do HTTP.
- So let's build a server instead.

```ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getAllAuthors } from "./main.ts";

const app = new Hono();
app.use(cors());

app.all("/", (c) => {
return c.text("listening");
});

app.all("/getAuthors", (c) => {
const authors = getAllAuthors();
return c.json(authors);
});

serve(app);

```

- This code works, we can use http://localhost:3000/getAuthors to get it.
- Show postman and show that we can use any method, which isn't good.

> REST is a set of architectural constraints, not a protocol or a standard. API developers can implement REST in a variety of ways.
> RedHat

> Representational State Transfer (REST) is a software architecture that imposes conditions on how an API should work. REST was initially created as a guideline to manage communication on a complex network like the internet.
> Amazon

> To be restful, an interface must obey these architectural principles. They’re designed to ensure that an application can be scaled in a cloud environment:
> rattertintattertins from Reddit

## Hands On

- Short Recap of last time's discussion.
- Talk about HAR
- Talk about cURL
- Talk about Crest
- Talk about OpenAPI
- Talk about Postman
- JsonPlaceholder

```
Invoke-WebRequest -Uri "https://jsonplaceholder.typicode.com/posts/1" -Method GET
```
