
export function downloadUrl(url, filename){

    let link = makeLinkElement(url, filename)

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
}

export function downloadText(text, filename){
    let blob = new Blob([text], {type: 'text/plain'})

    downloadUrl(URL.createObjectURL(blob), filename)
}

function makeLinkElement(url, filename){
    const link = document.createElement('a')
    link.download = filename
    link.href = url
    link.style.display = 'none'

    return link
}
