# How to create WhatsApp Clone with React and GraphQL

- Why are React and GraphQL are strong technologies as for themselves.
- Why do they make for such a powerful combination.
- Why is this tutorial useful and what we're gonna learn from it.
- Mention that we use the most recent version of React where we use hooks and Suspense.

# Step 1 - Creating a React App with Apollo Server

- Create a TypeScript project with `create-react-app`.
- Add SASS support and test it.
- Create a basic Apollo-Server.
- Serve some in-memory chats data.
- Create basic Query.
- Setup GraphQL-Codegen and to generate TypeScript definitions.
- Initialize Apollo-Client and provide it to the React App.
- Query the data and show it on the app.

# Step 2 - Creating a Chat App

- Add Material-UI core/icons
- Modify index.scss to contain basic global rules, add theme variables, modify existing material-ui component's color scheme.
- Modify app to look like main WhatsApp chats screen, using material design.
- Create app router with /chats and /chats/:id routes.
- Create a chat view which looks like WhatApp.
- Add navigation logic between the 2 views.

# Step 3 - Mutations, subscriptions, and DB migration

- Create addMessage mutation
- Use the mutation in the client app and demonstrate it
- Implement subscription transport in our Apollo-Server
- Create messages subscription
- Use the subscription in the client app and demonstrate it with 2 different sessions
- Implement addChat mutation
- Implement users-list component where we can select users and use it to add chats.
- Implement deleteChat mutation
- Implement chat-removal mechanism.
- Migrate our back-end to use MongoDB
- Test in the client, restart the server to show persistence, show data in DB

# Step 4 - Authentication

- Implement Twilio SMS authentication in our back end.
- Implement an auth service in the client which is responsible for auth token and current user.
- Test authentication in dev-tools and see how it affects data shown on screen.
- Add phone registration screen.
- Add verification screen.
- Add profile screen.
- Add route restrictions.
- Edit pop-over menu to contain links to profile screen and log-out.

# Step 5 - Image uploading

- Introduce people to FileStack service
- Setup FileStack credentials in our app, use a free account of ours by default
- Add distinction between messages types - picture message and text message
- Implement a special resolver to accept a multi-part request and stream it to FileStack
- Use the resolver both in picture messages and profile picture.
- Use FileStack React modal in client
