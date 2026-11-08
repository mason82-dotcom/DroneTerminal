import { OpenFlightHubApi } from 'openflighthub-api-client-sdk'
import { resolveDroneTerminalEndpoints } from './transport-compat'

/**
 * Explicitly choose REST and WebSocket endpoints together.
 * The original SDK otherwise uses localhost:6001 for REST but localhost:9001
 * for WebSocket. This file is a DroneTerminal-specific integration change.
 */
export const transportEndpoints = resolveDroneTerminalEndpoints(window.location)
const api = new OpenFlightHubApi(transportEndpoints)

export { postDroneTerminalMultipart } from './transport-compat'
export default api
