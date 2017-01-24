const API_ROOT = 'http://swapi.co/api';
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

function formatUrl(path) {
  const adjustedPath = path[0] === '/' ? path : '/' + path;
  return `${API_ROOT}${adjustedPath}`;
}

function formatGetUrl() {

}

export default class ApiClient {
  get(path, params) {
    return new Promise((resolve, reject) => {
      const request = new Request(formatUrl(path), {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default',
        redirect: 'follow',
      });

      console.log(request);
      const request1 = new Request(request);
      request1.body = {
        a: 125,
      };
      console.log(request1);

      fetch(request)
        .then(
          (result) => resolve(result),
          (error) => reject(error),
        );
    });
  }
}
