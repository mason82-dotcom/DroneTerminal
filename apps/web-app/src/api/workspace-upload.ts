import { postDroneTerminalMultipart } from './transport-compat'

type WorkspaceFileConfig = {
  params: { workspaceId: number }
  data: { file: File; filename: string }
}

/**
 * Small, targeted fix for the only generated SDK multipart endpoint:
 * POST /workspace/{workspaceId}/file
 *
 * The original npm SDK retains all other REST operations. No DJI commands.
 */
export function makeWorkspaceFileUpload(
  restApiBaseUrl: string,
  options: { fetchImpl?: typeof fetch } = {},
) {
  return async function uploadWorkspaceFile(config: WorkspaceFileConfig): Promise<unknown> {
    const id = config?.params?.workspaceId
    if (typeof id !== 'number' || !Number.isSafeInteger(id) || id <= 0) {
      throw new Error('Workspace id must be a positive safe integer')
    }
    if (!config?.data || !(config.data.file instanceof Blob) || typeof config.data.filename !== 'string') {
      throw new Error('Workspace upload requires a file and filename')
    }

    return postDroneTerminalMultipart(restApiBaseUrl, `/workspace/${id}/file`, {
      file: config.data.file,
      filename: config.data.filename,
    }, options)
  }
}
