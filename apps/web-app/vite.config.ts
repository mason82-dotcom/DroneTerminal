import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//see https://cesium.com/blog/2024/02/13/configuring-vite-or-webpack-for-cesiumjs/
import {viteStaticCopy} from 'vite-plugin-static-copy'
import * as path from 'path'
//fix cesium statics
const cesiumSource = "node_modules/cesium/Build/Cesium";
const cesiumBaseUrl = path.join(path.resolve(__dirname), 'dist/cesiumStatic')


const projectRootDir = path.resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['dev.openflighthub.org']
  },
  plugins: [vue(),
    {
      name: 'html-inject-data',
      enforce: 'post',
      transformIndexHtml(html) {
        const regex = /<(style|script|link) (.*)>/gi;
        const replacer = (_, p1, p2) => {
          // add nonce?
          if (
            p1 === 'script'
          ) {
            if(!p2.match(/integrity="/)){
              p2 = `integrity="CSP_MAIN_TS_HASH" ${p2}`;
            }
          }

          return `<${p1} ${p2}>`;
        };

        return html.replace(regex, replacer);
      },
    },
    viteStaticCopy({//this doesnt work for vite build (thats why we manually copy folders in build.sh and build.cmd)
      targets: [
        { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl },
      ],
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(projectRootDir, 'src'),
      '$': path.resolve(projectRootDir)
    }
  },
  define: {
    __INTLIFY_JIT_COMPILATION__: true
  },
  build: {
    sourcemap: true
  }
})
