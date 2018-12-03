// @ts-ignore
import * as prompt from 'prompt';
import { generate } from 'graphql-code-generator';

interface Credentials {
  username: string;
  password: string;
}

async function getCredentials(): Promise<Credentials> {
  return new Promise<Credentials>(resolve => {
    prompt.start();
    prompt.get(['username', 'password'], (_err: Error, result: Credentials) => {
      resolve({
        username: result.username,
        password: result.password,
      });
    });
  });
}

function generateHeaders({ username, password }: Credentials): string[] {
  const Authorization = `Basic ${Buffer.from(
    `${username}:${password}`,
  ).toString('base64')}`;

  return [`Authorization: ${Authorization}`];
}

async function main() {
  const credentials = await getCredentials();
  const headers = generateHeaders(credentials);

  await generate(
    {
      schema: `http://${process.env.REACT_APP_APOLLO_SERVER_URI}`,
      template: 'graphql-codegen-typescript-react-apollo-template',
      out: './src/graphql.ts',
      args: ['./src/graphql/**/*.ts'],
      header: headers,
      overwrite: true,
    },
    true,
  );
}

main();
