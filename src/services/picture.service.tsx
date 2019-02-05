import { UploadProfilePicture } from "../graphql/types";
import { apolloClient } from "../apollo-client";
import gql from "graphql-tag";

export const pickPicture = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = e => {
      const target = e.target as HTMLInputElement
      resolve(target.files[0])
    }
    input.onerror = reject
    input.click()
  })
}

export const uploadProfilePicture = async file => {
  debugger;
  const result = await apolloClient.mutate<UploadProfilePicture.Mutation, UploadProfilePicture.Variables>({
    mutation: gql`
      mutation UploadProfilePicture($file: Upload!) {
        uploadPicture(file: $file) {
          url
        }
      }
    `,
    variables: {
      file
    }
  });
  return result.data.uploadPicture;
}
