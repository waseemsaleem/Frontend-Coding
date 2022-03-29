export function fetchJSON(url: string, method = 'GET'): Promise<Response> {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}
