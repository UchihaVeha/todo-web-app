import queryString from 'querystring';

const request = async ({
  params = {},
  cache = 'default',
  credentials = 'omit',
  headers = {},
  method = 'GET',
  mode = 'cors',
  url = ''
}) => {
  const init = {
    cache,
    credentials,
    headers: new Headers(headers),
    method,
    mode
  };
  let input = url;

  if (method === 'GET' || method === 'HEAD' || method === 'DELETE') {
    input += Object.keys(params).length
      ? `?${queryString.stringify(params)}`
      : '';
  } else {
    init.body = JSON.stringify(params);
    init.headers.append('Content-Type', 'application/json');
    init.headers.append('Content-Length', init.body.length.toString());
  }

  try {
    const response = await fetch(input, init);
    return response.json();
  } catch (e) {
    if (__DEV__) {
      console.error('request:', e);
    }
    return null;
  }
};

export default request;
