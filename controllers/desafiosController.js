const baseUrl = process.env.NEXT_PUBLIC_base_api_url

export const deleteInstalacion = async(selectedItem)=>{
    try{
      await fetch(`http://localhost:3000/api/instalaciones/${selectedItem._id}`,{
      method:"DELETE",})
    }catch (error){
      console.log(error)
    }
}

export const addDesafio = async (newDesafio)=>{
    try{
        const res = await fetch('http://localhost:3000/api/desafios',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newDesafio)
        })
        return res
    }catch(error){
        return {error:1,msg:error}
    }
}
  
export const updateInstalacion = async ({query,newInstalacion})=>{
try{
    console.log('controler edit check ', newInstalacion ,'id:' ,query.id)
    await fetch('http://localhost:3000/api/instalaciones/'+query.id,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body : JSON.stringify(newInstalacion)
    })
    }catch(error){
        console.log(error)
    }
}

export const getInstalacion = async(query)=>{
    const res = await fetch("http://localhost:3000/api/instalaciones/"+query.id)
    const data = await res.json()
    return data   
}

export const getDesafios = async()=>{
    const res = await fetch("http://localhost:3000/api/desafios/")
    const data = await res.json()
    return data.length > 0? data:"Vacio"  
}


export const findUserByCredentials = async(credentials) =>{
    try{
        const res = await fetch(`${baseUrl}users/login`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(credentials)})
        const data = await res.json()
        return data
    }catch(error){
        console.log(error)
        console.log('No se econtro el usuario')
        return null
    }
    
}