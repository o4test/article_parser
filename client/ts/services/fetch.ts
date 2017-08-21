// create default headers for local requests
const defaultHeaders = new Headers();
defaultHeaders.set('X-Requested-With', 'XMLHttpRequest');
defaultHeaders.set('Accept', 'application/json');
defaultHeaders.set('Content-Type', 'application/json');
const DEFAULT_OPTIONS = {
  cors: true,
  credentials: 'same-origin',
  headers: defaultHeaders,
};

/**
 * Simple error handle
 * @param {any} message
 */
const responseError = ({message}: any) => {
  console.log(message);
};

/**
 * Parse our response
 * @param {Response} response
 * @returns {Promise<any>}
 */
const parseJSONResponse = (response: Response): Promise<any> => {
  return new Promise((resolve) => response.json()
    .then((json: any) => resolve({
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      json,
    })));
};

/**
 * Return a promise for a fetch request done to the SAS service
 * handles different answer statuses
 *
 * @param  {string} url The network request
 * @param  {object} options An options object
 *
 * @return {object} The parsed JSON response and handles special statuses
 */
export function fetchFromLocal(url: string, options?: any) {
  return new Promise((resolve, reject) => fetch(url, Object.assign({}, DEFAULT_OPTIONS, options))
    .then(parseJSONResponse)
    .then(({ status, json }: any) => {
      if (status >= 200 && status < 300) {
        return resolve(json);
      } else {
        return reject(responseError(json));
      }
    })
    .catch((error: Error) => reject(responseError(error))),
  );
}
