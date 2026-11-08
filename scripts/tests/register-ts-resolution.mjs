// Node-only test hook for the Vite/TypeScript extensionless local imports.
// Restrict this to the web-app API directory; production build is unchanged.
import { registerHooks } from 'node:module'

registerHooks({
  resolve(specifier, context, nextResolve) {
    const local = context.parentURL?.includes('/apps/web-app/src/api/') && specifier.startsWith('./')
    if (!local || specifier.endsWith('.ts') || specifier.endsWith('.js')) {
      return nextResolve(specifier, context)
    }
    try {
      return nextResolve(specifier, context)
    } catch (error) {
      if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error
      return nextResolve(specifier + '.ts', context)
    }
  },
})
