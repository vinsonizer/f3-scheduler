const baseUrl = process.env.REACT_APP_ENDPOINT

export function getApi(path = '', callback) {
  fetch(baseUrl + path)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(err => callback(err))
};

export async function postApi(path = '', data = {}, callback) {
  // Default options are marked with *
  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }
  fetch(baseUrl + path, options)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(err => callback(err));
}