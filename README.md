# WhatsApp Clone - Client

<a href="https://medium.com/the-guild/react-graphql-typescript-postgresql-whatsapp-de1840c27d21"><p align="center"><img src="https://cdn-images-1.medium.com/max/1040/1*fFUJd7moWtjvMZ5dE-A80g.gif" alt="whatsapp" width="240"></p></a>

### Run instructions

Make sure to clone the server first

    $ git clone git@github.com:Urigo/WhatsApp-Clone-server.git

Run yarn

    $ yarn install

Run codegen to generate TypeScript types

    $ yarn generate

Note that the types are generated from the server! So if you clone the server project in a different path be sure to update the `codegen.yml` file.

Start the server, see run [instructions](https://github.com/Urigo/WhatsApp-Clone-server/blob/master/README.md).

Run start

    $ yarn start

Note that the server should run on port `4000`. If you decide to change that, be sure to edit the `.env` file
