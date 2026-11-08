import api from '@/api/index.js';
import { updateArray } from '@/util/vue.js';
import { ApiResponse_AuthLoginPost, ApiResponse_UserSelfGet, ApiResponse_WorkspaceMyWorkspacesGet } from 'openflighthub-api-client-sdk';
import { defineStore } from 'pinia'

/**
 * HOW TO USE THIS STORE IN A COMPONENT:
 *
 * <script setup lang="ts">
    import useMainStore from "@/stores/main"
    const store = useMainStore()


    Thats it! The store is reactive
 */

export const useMainStore = defineStore('main', {
    state(){
        return {
            loginInitialCheckWasDone: false,
            apiUnavailable: false,//this is just the initial check and requires a manual page reload
            apiDisconnected: false,//this is used once initial checks are done and login was performed (state is monitored via websocket)
            user: null as ApiResponse_AuthLoginPost,
            userSelf: null as ApiResponse_UserSelfGet,
            myWorkspaces: [] as ApiResponse_WorkspaceMyWorkspacesGet,

            isForceLoggedOut: false,//true when someone else has logged into this account
        }
    },

    getters: {
        isLoggedIn: state => !!state.user,
        isAdmin: state => {
            return state.userSelf && [1, 4].includes(state.userSelf.id)
        }
    },

    actions:{

        async logout(){
            await api.rest.auth.logout.post()
            this.userSelf = null
            this.user = null
        },

        async login(username: string, password: string){
            const user = await api.rest.auth.login.post({data: {
                username,
                password
            }})
            this.userSelf = await api.rest.user.self.get()
            this.user = user
            this.myWorkspaces = await api.rest.workspace.myWorkspaces.get()
        },

        async loginWithToken(token: string){
            const user = await api.rest.auth.loginWithToken.post({data: {
                token
            }})
            this.userSelf = await api.rest.user.self.get()
            this.user = user
            this.myWorkspaces = await api.rest.workspace.myWorkspaces.get()
        },

        async loginCheck(){
            try {
                const user = await api.rest.auth.check.get()
                this.userSelf = await api.rest.user.self.get()
                this.user = user
                updateArray(this.myWorkspaces, await api.rest.workspace.myWorkspaces.get())
                return true
            } catch(err) {

                if(err instanceof Error && err.message.toLowerCase().trim().startsWith('fatal') || typeof err === 'string' && err.toLowerCase().trim().startsWith('fatal')){
                    this.apiUnavailable = true
                }

                return false
            }
        }
    }
})

export default useMainStore
