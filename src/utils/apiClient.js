import axios from 'axios';

const API_ROOT = 'http://swapi.co/api';
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

function formatUrl(path) {
  const adjustedPath = path[0] === '/' ? path : '/' + path;
  return `${API_ROOT}${adjustedPath}`;
}

export default class ApiClient {
  get(path, params = {}) {
    return new Promise((resolve, reject) => {
      // const request = new Request(formatGetUrl(path, params), {
      //   method: 'GET',
      //   headers: new Headers(defaultHeaders),
      //   mode: 'cors',
      //   cache: 'default',
      //   redirect: 'follow',
      //   credentials: 'omit',
      // });
      // console.log(request.headers.has('Content-Type'));
      //
      // if (params.headers) {
      //   for (let key in params.headers) {
      //     request.headers.set(key, params.headers[key]);
      //   }
      // }

      // fetch(request)
      axios.get(formatUrl(path))
        .then(
          (result) => resolve(result),
          (error) => reject(error),
        );
    });
  }
}
