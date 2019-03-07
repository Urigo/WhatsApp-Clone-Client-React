# Whatsapp Clone Client

[//]: # (head-end)


A full working React client for a WhatsApp clone written in latest versions of:
* [React](https://github.com/facebook/react)
* [Material-UI](https://github.com/mui-org/material-ui)
* [Styled Components](https://github.com/styled-components/styled-components)
* [GraphQL](https://github.com/graphql/graphql-js)
* [Typescript](https://github.com/microsoft/TypeScript)
* [Apollo-Client](https://github.com/apollographql/apollo-client)
* [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator)
* [Jest](https://github.com/facebook/jest)

This React client constantly being updated by using CI tests and renovate.

You can watch this repository to learn about new updates or check out the git diffs between new versions on the [tutorial's version diff pages](https://www.tortilla.academy/Urigo/WhatsApp-Clone-Tutorial) (at the top of the screen).

It can be used as a boilerplate, a full blown example app and even as a [tutorial](https://github.com/Urigo/WhatsApp-Clone-Tutorial).

It also is being accompanied by a WhatsApp clone server located in [this repository](https://github.com/Urigo/WhatsApp-Clone-Server).

## Running locally

Clone the project.

Clone the [server](https://github.com/Urigo/WhatsApp-Clone-Server) -> make sure both projects are under the same folder and that the server folder
is named by the default name of the server repo `Whatsapp-Clone-Server`.

Install dependencies:

`yarn`

Run the the codegen to generate Typescript types from GraphQL (this step requires the server to be cloned under the same repo and its folder to be with it's default name):

`yarn codegen`

Run tests to make sure everything is ok:

`yarn test`

Start the client:

`yarn start`


This repository is using the Tortilla project for creating tutorials from real apps and git. For more information, see https://www.tortilla.academy/ and https://www.npmjs.com/package/tortilla.


[//]: # (foot-start)

[{]: <helper> (navStep)

| [Begin Tutorial >](.tortilla/manuals/views/step1.md) |
|----------------------:|

[}]: #
