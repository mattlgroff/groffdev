---
title: How To Make An Apollo Server With Bun
date: "2023-02-02T14:05:00.284Z"
description: "How To Make An Apollo Server With Bun"
---

In a previous post, [I wrote about how to make a GraphQL Server with Hono](https://groff.dev/bun-graphql/) but today I'm super excited to show you how to make an Apollo Server with Bun, which was previously not possible prior to Bun v0.5.4.

To get started:

* Install Bun: 
Bun works on Linux, Mac, and Windows (WSL Only) as of the writing of this post.

```bash
curl -fsSL https://bun.sh/install | bash
```

* Create a new folder in your working directory. I'm going to call mine `bun-apollo`:
```bash
mkdir bun-apollo
cd bun-apollo
```
* Next inside that folder create a new file called `package.json`
```json
{
  "name": "bun-apollo",
  "version": "1.0.0",
  "description": "Bun Apollo Server",
  "main": "src/index.js",
  "scripts": {
    "start": "bun index.js"
  }
}
```

* We'll need a few dependencies:
```bash
bun add graphql @apollo/server
```

If successful you'll see something like this:
```bash
bun add v0.5.4 (0dfde6f8)

 installed @apollo/server@4.3.2
 installed graphql@16.6.0

[1321.00ms] done
```

* Now create an index.js file and add the following code to it:
```javascript
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 4000;

await startStandaloneServer(server, {
  listen: { port },
});

console.log(`🚀  Server ready at: http://localhost:${port}/graphql`);
```

This is based off the example from the Apollo's [getting started documentation](https://www.apollographql.com/docs/apollo-server/getting-started/)


* Run the server:
```bash
bun run index.js
```

You should see something like this:
```bash
🚀  Server ready at: http://localhost:4000/graphql
```

---

## Deploying Apollo Server on Bun with Docker

* Let's deploy this app using a Dockerfile. Create a new file called `Dockerfile` and add the following code:
```dockerfile
FROM oven/bun:0.5
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY index.js index.js
EXPOSE 4000
ENTRYPOINT ["bun", "run", "index.js"]
```

You can test the Dockerfile locally if you have Docker installed by running the following command:
```bash
docker build -t bun-apollo .

docker run -p 4000:4000 bun-apollo
```

* Commit and push up the code to a new repository. I suggest adding `node_modules/` to the `.gitignore` file.

* I deployed using [Render](https://render.com/), but there are tons of options to deploy an application in a Docker Container.

I selected "New +" and then selected "Web Service". Once I connected my repository to the service, it detected my Dockerfile and was building and deploying in minutes.

To test that the deployment works, run the `books` query against the Apollo Server on the newly deployed endpoint.

Congrats, if everything worked you have an Apollo GraphQL Server running on Bun in the cloud!

You can find the source code for my example Apollo Server w/ Bun on GitHub [here](https://github.com/mattlgroff/bun-apollo).
