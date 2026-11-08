import { Router } from "vue-router";

export async function goToRedirect(router: Router, alternativeUrl = '/'){

    if(router.currentRoute.value){
        if(router.currentRoute.value.query.redirect){
            const r = router.currentRoute.value.query.redirect
            await router.push({
                path: r instanceof Array ? r[0] : r
            })
        }
    }
}