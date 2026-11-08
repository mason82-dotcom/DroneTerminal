export function isValidEmail(email: string){
    return email.match(/^[a-zA-Z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})$/)
}