import { OpenFlightHubApi } from 'openflighthub-api-client-sdk'
import { resolveDroneTerminalEndpoints } from './transport-compat'
import { makeWorkspaceFileUpload } from './workspace-upload'

/**
 * Explicitly choose REST and WebSocket endpoints together.
 * The original SDK otherwise uses localhost:6001 for REST but localhost:9001
 * for WebSocket. This file is a DroneTerminal-specific integration change.
 */
export const transportEndpoints = resolveDroneTerminalEndpoints(window.location)
const api = new OpenFlightHubApi(transportEndpoints)

// The upstream SDK sets JSON Content-Type even for multipart/form-data.
// Replace only its single generated multipart operation. Other SDK
// methods and the original MIT-licensed source remain untouched.
api.rest.workspace.file.post = makeWorkspaceFileUpload(
  transportEndpoints.restApiBaseUrl,
) as typeof api.rest.workspace.file.post

export { postDroneTerminalMultipart } from './transport-compat'
export default api
