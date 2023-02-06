import apisauce, { ApiResponse, ApisauceInstance } from 'apisauce';
import { get, isEmpty, snakeCase } from 'lodash';
export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param {object} response A response from a network request
 *
 * @return {object} The parsed JSON from the request
 */

function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param {object} response A response from a network request
 *
 * @return {object | undefined} Returns either the response, or throw an error
 */

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

/**
 * Request a URL, returning a promise
 *
 * @param {string} url The URL we want to request
 * @param {object} [options] The options we want to pass to "fetch"
 *
 * @return {object} The response data
 */

export async function request(
  url: string,
  options?: RequestInit
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

/**
 * Create Http Instance
 * @param {string} APIEndpoint The URL we want to request
 *
 * @return {HttpRequest} The HttpRequest
 */

export class HttpRequest {
  request: ApisauceInstance;
  constructor(APIEndpoint: string) {
    this.request = apisauce.create({
      baseURL: APIEndpoint,
      headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '***',
        Accept: '*/*'
      },
      timeout: 3600000,
      withCredentials: true
    });

    this.request.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = ''; //get token
        config.headers.Authorization = token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.request.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const { response } = error;
        return Promise.reject(error);
      }
    );
  }
}
/**
 * Config Api Request
 */

export function configRequest(request: any) {
  const typeRequest = typeof request;
  let formatRequest: any = {};
  if (typeRequest === 'string') return snakeCase(request);
  if (typeRequest === 'object') {
    for (let i in request) {
      if (i === 'startDate' || i === 'endDate') {
        // formatRequest[snakeCase(i)] = AppHelper.formDateTimePost(request[i]);
      } else {
        formatRequest[snakeCase(i)] = request[i];
      }
    }
    return formatRequest;
  }
}

/**
 * Config Api Response
 */

export function configResponse(response: ApiResponse<any>): any | void {
  if (!response.ok) {
    if (response.status === 404 || response.status === 400) {
      throw new Error(
        get(response.data, 'message') ? get(response.data, 'message') : '404 Not Found'
      );
    }
    const message = get(response.data, 'message');
    if (isEmpty(response.data) || !message) {
      throw new Error(response.problem);
    }
    throw new Error(message);
  }
  const {
    data: { result }
  } = response;
  if (result) return result;
  return response.data;
}
