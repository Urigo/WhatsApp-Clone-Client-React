import auth from './auth.service'

// Will automatically append necessary data to params
export default (url, metadata) => {
  if (!url.includes('.')) {
    if (/^\//) {
      url = `http://${process.env.REACT_APP_APOLLO_SERVER_URI}${url}`
    }
    else {
      url = `http://${process.env.REACT_APP_APOLLO_SERVER_URI}/${url}`
    }
  }

  const auth = auth.getAuthHeader();

  if (auth) {
    metadata = Object.assign({}, metadata)
    metadata.headers = Object.assign({}, auth, headers)
  }

  return fetch(...args)
}
