---
title: How To Make A GraphQL Server With Bun
date: "2022-07-29T22:12:03.284Z"
description: "How To Make A GraphQL Server With Bun"
---

This is my first post on my new blog, how exciting!

Today, I was trying to find an example of how to make a GraphQL server with Bun, but I couldn't find one. I decided to create one instead.

You can read all about Bun here [bun.sh](https://bun.sh/).

Bun has a lot of the Node API built in, but it provides its own, faster, HTTP server. This causes incompatibilities with the traditional methods I use to create a GraphQL server (Apollo Server or ExpressJS). Thankfully, [Hono](https://github.com/honojs/hono) is compatible with Bun. It claims to be "a small, simple, and ultrafast web framework for Cloudflare Workers, Deno, Bun, and others."

Additionally, luck would have it, there is a new package for [GraphQL Server with Hono](https://www.npmjs.com/package/@honojs/graphql-server) which we can utilize to get a GraphQL server up and running. It was build as a fork of graphql-express, and it depends on the [GraphQL.js package](https://www.npmjs.com/package/graphql) to work.

The GraphQL.js package does not fully support Bun at this time, but we only need one part of it in order to get this server to work, the `buildSchema` function.

Now to get started:

* Install Bun: 
```bash
curl https://bun.sh/install | bash
```

* Create a new project. I personally did `npm init` to create a `package.json` file.
```bash
mkdir bun-graphql
cd bun-graphql
npm init
```

* We'll need a few dependencies:
```bash
bun add graphql
bun add hono
bun add @honojs/graphql-server
```

* Create an index.js file and add the following code:
```javascript
import { Hono } from 'hono';
import { graphqlServer } from '@honojs/graphql-server';
import { buildSchema } from 'graphql/utilities/buildASTSchema.js';

export const app = new Hono();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => 'Hello Hono!',
};


app.use(
  '/graphql',
  graphqlServer({
    schema,
    rootValue,
  })
);

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};
```

This is based off the example file from Hono's GraphQL Server package, but tweaked to match Hono's Bun example.

It's important to import `buildSchema` directly from `''graphql/utilities/buildASTSchema.js'`, otherwise your app will fail because the GraphQL.js library isn't fully Bun compatible, but this essential function is. 

* Run the server:
```bash
bun index.js
```
You won't see any logs in the console, but you should see a GraphQL server running if you query the endpoint. `http://localhost:3000/graphql`

* Let's deploy this app using a Dockerfile. I followed a guide from [Northflank](https://northflank.com/guides/deploying-a-bun-app-on-northflank) for creating a Dockerfile to run a Bun application. Create a new file called `Dockerfile` and add the following code:
```
FROM jarredsumner/bun:edge
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY . .
EXPOSE 3000
ENTRYPOINT ["bun", "index.js"]
```

You can test the file locally if you have Docker installed by running the following command:
```bash
docker build .
```

* Commit and push up the code to a new repository. I suggest adding `node_modules/` to the `.gitignore` file.

* Me personally, I deployed using [Render](https://render.com/), but there are tons of options to deploy an application in a Docker Container.

I selected "New +" and then selected "Web Service". Once I connected my repository to the service, it detected my Dockerfile and was building and deploying in minutes.

To test that deployment works, run the same `hello` query against the GraphQL server on the newly deployed endpoint.

Congrats, if everything worked you have a GraphQL server running on Bun in the cloud!

You can find the source code for my example GraphQL Server w/ Bun on GitHub (here)[https://github.com/mattlgroff/bun-graphql]