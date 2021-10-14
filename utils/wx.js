

export default function wxToPromise(method,options={}){
    return new Promise((resolve,reject)=>{
        options.success = resolve
        options.fail = err =>{
            reject(err)
        }
        wx[method](options)
    })
}