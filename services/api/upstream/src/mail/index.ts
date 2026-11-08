import * as nodemailer from 'nodemailer'

import { Attachment } from 'nodemailer/lib/mailer'
import { fillTemplate } from './template'

const MAIL_FROM = 'OpenFlightHub<mail@openflighthub.org>' //TODO make this configurable


let transporter : nodemailer.Transporter


/**
 *
 * @param host e.g. "smtp.gmail.com"
 * @param port e.g. 465
 * @param secure if TLS should be used (true for port 465)
 * @param from e.g. '"Sender Name" sender@example.org'
 */
export async function setupMail(hostname: string, port: number, secure: boolean, username: string, password: string, from: string){
    transporter = nodemailer.createTransport({
        host: hostname,
        port,
        secure,
        auth: {
            user: username,
            pass: password
        },
        tls: {
            servername: hostname
        }
    })

    transporter.on('error', err=>{
        console.error(err)
        process.exit(1)
    })
}


export async function sendMail(to: string, subject: string, html: string, plain?: string, attachments?: Attachment[]){

    const result = await transporter.sendMail({
        from: MAIL_FROM,
        to,
        subject,
        text: plain || '',
        html: html,
        attachments
    })

    //TODO deal with rejected emails?
    return result
}

/**
 * @param attachments see makeAttachment()
 */
export async function sendMailFromTemplate(to: string, subject: string, mailTemplateName: MailTemplateName, mailTemplateConfig: MailTemplateConfig, attachments?: Attachment[]){

    const mailTemplate = await fillTemplate(mailTemplateName, mailTemplateConfig)

    await sendMail(to, subject, mailTemplate.html, mailTemplate.plain, attachments)
}

export async function makeAttachment(filename: string, content: string | Buffer) : Attachment {

    const buffer = typeof content === 'string' ? Buffer.from(content) : content

    return {
        filename,
        content_base64: buffer.toString('base64')
    }
}


type MailTemplateName = 'logo_header_text' | 'logo_header_text_button'

type MailTemplateConfig = MailTemplateConfig_LogoHeaderText | MailTemplateConfig_LogoHeaderTextButton

type MailTemplateConfig_LogoHeaderText = {
    "LOGO_ALT"?: string,
    "LOGO_SRC"?: string,

    "HEADER"?: string,
    "CONTENT"?: string

    "FOOTER"?: string
}

type MailTemplateConfig_LogoHeaderTextButton = {
    "LOGO_ALT"?: string,
    "LOGO_SRC"?: string,

    "HEADER"?: string,
    "CONTENT"?: string

    "BUTTON_TEXT"?: string,
    "BUTTON_URL"?: string,

    "FOOTER"?: string
}
