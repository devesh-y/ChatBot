export const HandleLogin=async ({email,password}:{email:string,password:string})=>{
    return new Promise((resolve, reject)=>{
        fetch(`${import.meta.env.VITE_BACKEND}/login`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        }).then((res)=>res.json()).then((result)=>{
            resolve(result);
        }).catch(()=>{
            reject();
        })
    })


}