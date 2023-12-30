
export function setCookie(email:string,cookie:string){
    const temp = new Date();
    temp.setTime(temp.getTime() + (24 * 60 * 60 * 1000));
    const expires = "expires=" + temp.toUTCString();
    const data=JSON.stringify({email,cookie} )
    document.cookie = "user=" +data + "; " + expires + "; path=/";
}

export function getCookie(){
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        if(cookie.indexOf(`user=`)==0){
            return cookie.substring(5)
        }
    }
    return null;
}