import useFetch from 'fetch-suspense';
import { getAuthHeader } from './auth.service';

// Will automatically append necessary data to params
export default (url, metadata) => {
  if (!url.includes('.')) {
    url = /^\//.test(url)
      ? `http://${process.env.REACT_APP_APOLLO_SERVER_URI}${url}`
      : `http://${process.env.REACT_APP_APOLLO_SERVER_URI}/${url}`;
  }

  const auth = getAuthHeader();

  if (auth) {
    metadata = Object.assign({}, metadata);
    metadata.headers = Object.assign({}, auth, headers);
  }

  return useFetch(...args);
};
