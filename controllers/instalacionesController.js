// const baseUrl = process.env.base_api_url

export const deleteInstalacion = async(selectedItem)=>{
    try{
      await fetch(`http://localhost:3000/api/instalaciones/${selectedItem._id}`,{
      method:"DELETE",})
    }catch (error){
      console.log(error)
    }
}

export const addInstalacion = async (newInstalacion)=>{
    try{
        const res = await fetch('http://localhost:3000/api/instalaciones',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newInstalacion)
        })
        return res
    }catch(error){
        return {error:1,msg:error}
    }
  }
  
export const updateInstalacion = async ({newInstalacion})=>{
try{
    console.log('data controler: ',newInstalacion)
    const res = await fetch('http://localhost:3000/api/instalaciones/'+newInstalacion._id,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body : JSON.stringify(newInstalacion)
    })
    return res
    }catch(error){
        console.log(error)
    }
}

export const getInstalacion = async(query)=>{
    const res = await fetch("http://localhost:3000/api/instalaciones/"+query.id)
    const data = await res.json()
    return data   
}

export const getInstalaciones = async()=>{
    const res = await fetch("http://localhost:3000/api/instalaciones/")
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