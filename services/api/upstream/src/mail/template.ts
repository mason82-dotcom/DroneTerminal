import * as fs from 'fs/promises';
import * as path from 'path';

export function fillTemplate(templateName: string, config: object, baseConfigName = 'default', ) : Promise<MailTemplate> {
    return new Promise((resolve, reject) => {
        const templatePathHtml = path.join(__dirname, './mail_templates', templateName + '.html')

        fs.readFile(templatePathHtml, {
            encoding: 'utf-8',
            flag: 'r'
        }).then(templateHtml => {

            const templatePathPlain = path.join(__dirname, './mail_templates', templateName + '.txt')

            let templatePlain

            fs.readFile(templatePathPlain, {
                encoding: 'utf-8',
                flag: 'r'
            }).then(_plain => {
                templatePlain = _plain
            }).catch(()=>{
                console.warn('warning: unable to load plain template for ' + templateName)
            }).finally(()=>{

                const baseConfigPath = path.join(__dirname, './mail_templates_configurations', baseConfigName + '.json')

                fs.readFile(baseConfigPath, {
                    encoding: 'utf-8',
                    flag: 'r'
                }).then(json => {

                    let baseConfig
                    try {
                        baseConfig = JSON.parse(json)
                    } catch(err){
                        return reject('error parsing baseConfig "' + baseConfigName + '": ' + err)
                    }

                    const finalConfig = {}

                    for(let key of Object.keys(baseConfig)){
                        finalConfig[key] = config[key] !== undefined ? config[key] : baseConfig[key]
                    }

                    let filledTemplateHtml = '' + templateHtml
                    for(let key of Object.keys(finalConfig)){
                        filledTemplateHtml = filledTemplateHtml.replaceAll('###' + key + '###', finalConfig[key])
                    }

                    let filledTemplatePlain

                    if(templatePlain){
                        filledTemplatePlain = '' + templatePlain
                        for(let key of Object.keys(finalConfig)){
                            filledTemplatePlain = filledTemplatePlain.replaceAll('###' + key + '###', finalConfig[key])
                        }
                    }

                    resolve({
                        html: filledTemplateHtml,
                        plain: filledTemplatePlain
                    })


                }).catch(err => {
                    reject('cannot load baseConfig: ' + baseConfigPath)
                })

            })
        }).catch(err => {
            reject('cannot load template: ' + templatePathHtml)
        })
    })
}

type MailTemplate = {
    html: string,
    plain: undefined | string
}