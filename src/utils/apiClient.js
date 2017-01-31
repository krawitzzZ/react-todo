import { buildURL } from '../utils';

const API_ROOT = 'http://127.0.0.1:8000/api';
const defaultHeaders = {
  'Accept': 'application/json;text/*',
  'Content-Type': 'application/json;charset=utf-8',
};
const defaultRequestParams = {
  headers: new Headers(defaultHeaders),
  mode: 'cors',
  cache: 'default',
  redirect: 'follow',
  credentials: 'omit',
};

function formatUrl(path) {
  const adjustedPath = path[0] === '/' ? path : '/' + path;
  return `${API_ROOT}${adjustedPath}`;
}

function parseResponse (response) {
  const contentType = response.headers.get('Content-Type');

  if (~contentType.indexOf('text/')) {
    return response.text()
  }
  else if (~contentType.indexOf('application/json')) {
    return response.json();
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = parseResponse(response);
    throw error;
  }
}


export default class ApiClient {
  addHeaders(request, headers) {
    if (typeof headers !== 'undefined') {
      for (let key in headers) {
        request.headers.append(key, headers[key]);
      }
    }
  }

  fetch(request, resolve, reject) {
    fetch(request)
      .then(checkStatus)
      .then(parseResponse)
      .then(result => resolve(result))
      .catch(error => reject(error));
  }

  get(path, params = {}) {
    const { headers, query } = params;
    const url = buildURL(formatUrl(path), query);

    return new Promise((resolve, reject) => {
      const request = new Request(url, {
        ...defaultRequestParams,
        method: 'GET',
      });

      this.addHeaders(request, headers);
      this.fetch(request, resolve, reject);
    });
  }

  post(path, params = {}) {
    const { headers, data } = params;
    const url = formatUrl(path);

    return new Promise((resolve, reject) => {
      const request = new Request(url, {
        ...defaultRequestParams,
        method: 'POST',
        body: JSON.stringify(data)
      });

      this.addHeaders(request, headers);
      this.fetch(request, resolve, reject);
    });
  }

  put(path, params = {}) {
    const { headers, data } = params;
    const url = formatUrl(path);

    return new Promise((resolve, reject) => {
      const request = new Request(url, {
        ...defaultRequestParams,
        method: 'PUT',
        body: JSON.stringify(data)
      });

      this.addHeaders(request, headers);
      this.fetch(request, resolve, reject);
    });
  }

  patch(path, params = {}) {
    const { headers, data } = params;
    const url = formatUrl(path);

    return new Promise((resolve, reject) => {
      const request = new Request(url, {
        ...defaultRequestParams,
        method: 'PATCH',
        body: JSON.stringify(data)
      });

      this.addHeaders(request, headers);
      this.fetch(request, resolve, reject);
    });
  }

  del(path, params = {}) {
    const { headers } = params;
    const url = formatUrl(path);

    return new Promise((resolve, reject) => {
      const request = new Request(url, {
        ...defaultRequestParams,
        method: 'DELETE',
      });

      this.addHeaders(request, headers);
      this.fetch(request, resolve, reject);
    });
  }
}
