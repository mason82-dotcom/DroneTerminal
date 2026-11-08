console.log('find translation keys in source ...')
const fs = require('fs')
const path = require('path')

const deasync = require('deasync')

const srcPath = path.resolve('./src')

function recursivelyFindFiles(folder, files){
    if(!files){
        files = []
    }

    const children = fs.readdirSync(folder)

    for(const child of children){
        if(child === '..' || child === '.' || child === '__tests__'){
            continue
        }

        const childPath = path.join(folder, child)

        if(fs.lstatSync(childPath).isDirectory()){
            files = files.concat( recursivelyFindFiles(childPath) )
        } else {
            files.push(childPath)
        }
    }

    return files
}

const filesToCheck = recursivelyFindFiles(srcPath)

console.log('found', filesToCheck.length, 'source files')

const translationKeys = []

for(const file of filesToCheck){

    const fileContent = fs.readFileSync(file, {encoding: 'utf-8'})

    const matches = fileContent.match(/\$t[\s]*\([\s]*(("[^"]+")|('[^']+')|(`[^`]+`))[^\)]*\)/g)

    if(matches){
        for(const matchString of matches){
            const match = matchString.match(/\$t[\s]*\([\s]*(("[^"]+")|('[^']+')|(`[^`]+`))[^\)]*\)/)
            const key = match[1].substring(1, match[1].length - 1)
            if(key && !translationKeys.includes(key)){
                translationKeys.push(key)
            }
        }
    }
}

console.log('found', translationKeys.length, 'translation keys')

const i18nPath = path.resolve('i18n')
const languageFiles = recursivelyFindFiles(i18nPath)

for(const languageFile of languageFiles){
    console.log('lang', path.basename(languageFile).substring(0, path.basename(languageFile).indexOf('.')))

    const fileContent = fs.readFileSync(languageFile, {encoding: 'utf-8'})

    const json = JSON.parse(fileContent)

    for(const key of translationKeys){
        checkIfTranslationsContainKey(json, key)
    }

    fs.writeFileSync(languageFile, JSON.stringify(json, null, 2), {encoding: 'utf-8'})

}

function checkIfTranslationsContainKey(obj, keyPath){
    const keyPathParts = keyPath.split('.')

    let context = obj

    while(keyPathParts.length > 1){
        const part = keyPathParts.splice(0,1)
        if(!context[part]){
            context[part] = {}
        }

        context = context[part]
    }

    if(context[keyPathParts[0]] === undefined){
        context[keyPathParts[0]] = ''
        console.log('  added missing key', keyPath)
    }
}
