/**
 * DroneTerminal-owned transport configuration. The upstream SDK remains unmodified.
 * Production uses same-origin /api; local development uses the API's actual :6001.
 */
export type BrowserEndpointLocation = Pick<Location, 'protocol' | 'hostname' | 'host'>

export function resolveDroneTerminalEndpoints(location: BrowserEndpointLocation) {
  const loopback = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
  const apiBase = loopback
    ? `http://${location.hostname}:6001`
    : `${location.protocol}//${location.host}/api`
  const websocketScheme = loopback ? 'ws:' : (location.protocol === 'https:' ? 'wss:' : 'ws:')
  const websocketBase = loopback
    ? `${websocketScheme}//${location.hostname}:6001/live`
    : `${websocketScheme}//${location.host}/api/live`

  return {
    restApiBaseUrl: apiBase,
    liveWebsocketBaseUrl: websocketBase,
  }
}

/**
 * Targeted multipart workaround for the npm SDK's unconditional JSON header.
 * Existing upstream API calls are unchanged; callers must opt in to this helper.
 *
 * Cookies are browser-managed: never extract or log Set-Cookie.
 * Do not assign Content-Type; fetch supplies the actual multipart boundary.
 */
export async function postDroneTerminalMultipart(
  restApiBaseUrl: string,
  relativePath: string,
  fields: Record<string, string | number | Blob | ReadonlyArray<string | number | Blob>>,
  options: { signal?: AbortSignal; fetchImpl?: typeof fetch } = {},
): Promise<unknown> {
  if (!/^\/[a-zA-Z0-9_./%-]+$/.test(relativePath) || relativePath.includes('..') || relativePath.includes('//')) {
    throw new Error('Multipart endpoint must be a safe relative API path')
  }
  const url = new URL(relativePath.slice(1), restApiBaseUrl.replace(/\/+$/, '') + '/')
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Multipart URL must use HTTP(S) without embedded credentials')
  }
  const data = new FormData()
  for (const [name, raw] of Object.entries(fields)) {
    const values = Array.isArray(raw) ? raw : [raw]
    for (const value of values) {
      if (value === undefined || value === null) continue
      if (value instanceof Blob) data.append(name, value)
      else data.append(name, String(value))
    }
  }
  const response = await (options.fetchImpl ?? fetch)(url.toString(), {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
    body: data,
    signal: options.signal,
  })
  if (!response.ok) throw new Error(`Multipart request failed: HTTP ${response.status}`)
  const body = await response.text()
  if (body.length === 0) return undefined
  return JSON.parse(body)
}
