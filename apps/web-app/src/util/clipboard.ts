
import {i18nInstance} from "@/main.js"

export function writeToClipboard(text: string){
    const i18n = i18nInstance.global

    // TODO showToast(i18n.t("clipboard.added_to"))
    return navigator.clipboard.writeText(text)
}

export function readFromClipboard(){
    return navigator.clipboard.readText()
}