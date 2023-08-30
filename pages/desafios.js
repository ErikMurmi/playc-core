import { deportes } from "utils/deportes"
import { useState, useEffect } from "react"
import { getDesafios } from "controllers/desafiosController"
import { DesafioCard } from "components/desafioCard"
import useUser from "hooks/useUser"


export default function Desafios(){

    const [listaDesafios,setlistaDesafios] = useState([])
    const [deporte,setDeporte] = useState("Todos")
    const [inicio,setInicio] = useState("")
    const [fin,setFin] = useState("")
    let user = useUser()

    const filterDesafios = async () => {
        const response = await fetch(`/api/desafios/filterDateRange?inicio=${inicio}&fin=${fin}&deporte=${deporte}`,);
        const data = await response.json();
        setlistaDesafios(data);
    };

    async function aceptarDesafio(desafio_id,user_id){
        //const res = await fetch(`api/desafios/aceptarDesafio?firebase=${user_id}`)
        //console.log(await res.json())
        const res = await fetch('/api/desafios/aceptarDesafio',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({id:desafio_id,adversario:user_id})
        })
        return res
    }
    
    useEffect(()=>{
        console.log('inicio: ',inicio, " fin: ",fin, "deporte")
        if(inicio && fin){
            filterDesafios()
        }
    },[inicio,fin,deporte])


    return(
    <div className="page-container"> 
    <h1>Buscar un desafío</h1>
    <form id="horizontal-flex" style={{gap:'30px'}}>
        <input type="date" name="inicio" onChange={(e)=>setInicio(new Date(e.target.value).toISOString().substring(0,10))}></input>
        <input type="date" name="fin" onChange={(e)=>setFin(new Date(e.target.value).toISOString().substring(0,10))} ></input>
        {/* <select name="rango" id="rango">
        </select> */}
        <select name="deporte" id="deporte" onChange={(e)=>setDeporte(e.target.value)} defaultValue={'Todos'}>
            <option key={0} value={'Todos'}>{'Todos'}</option>
            {deportes.map((deporte,index) => (
                <option key={index} value={deporte}>{deporte}</option>
            ))}
        </select>
    </form>
    <div id="horizontal-flex" className="cards-container" >
        { listaDesafios.length > 0? listaDesafios.map((desafio,index)=>(
            <DesafioCard key={index} desafio={desafio} clicked={()=>aceptarDesafio(desafio._id,user.uid)}>
            </DesafioCard>
        )):null}
    </div>

    </div>)
}