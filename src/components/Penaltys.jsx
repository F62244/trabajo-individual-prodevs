import React, {useState,useEffect} from "react";
import { Container, Box, Button, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Sprites from './Sprites';

const Penaltys = () =>{
    const theme = useTheme();
    const [botonArquero,setBotonArquero] = useState(null);
    const [botonJugador,setBotonJugador] = useState(null);
   
    const [animarArquero,setAnimarArquero] = useState(false);
    const [animarJugador,setAnimarJugador] = useState(false);
    const [animarPelota,setAnimarPelota] = useState(false);

    const [resultado,setResultado]=useState(null);
    const [resultado2,setResultado2]=useState(null);
    const [contador,setContador] = useState(0);
    const [puntos,setPuntos] = useState(Array(6).fill('black'));

    const [botonesHabilitados, setBotonesHabilitados] = useState(true);

    useEffect(()=>{
        if(resultado){
            const reinicio = setTimeout(()=>{
                setBotonJugador(null);
                setBotonArquero(null);
                setResultado(null);
                setAnimarJugador(false);
                setAnimarArquero(false);
                setAnimarPelota(false);
                setBotonesHabilitados(true);
            },2000);
            
            return ()=>clearTimeout(reinicio);
        }
    },[resultado,botonesHabilitados]);
    // Obtenemos la posición del botón, donde irá la pelota. //
     const obtenerPosicionBoton = (botonIndex)=>{
        const boton = document.getElementById(`boton-${botonIndex}`);
        if(boton){
            const rect = boton.getBoundingClientRect();
            return {x:rect.left + rect.width / 2, y: rect.top + rect.height/2 }
        }
        return{x:0,y:0}
     };

    const manejarClick = (boton) =>{
        if(resultado) return;
        setBotonJugador(boton);
        setAnimarJugador(true);
        setAnimarPelota(true);

        // Obtenemos la posición del botón donde irá la pelota. //
        const posicionBoton = obtenerPosicionBoton(boton);

        const botonAleatorio = Math.floor(Math.random()*7)+1;
        setBotonArquero(botonAleatorio);
        setAnimarArquero(true);

        setTimeout(()=>{
            if(boton === botonAleatorio){
                setResultado("¡Atajó el arquero!");
                setBotonesHabilitados(false);
                setPuntos((prevPuntos)=>{
                    const nuevosPuntos = [...prevPuntos];
                    nuevosPuntos[contador] = 'red';
                    return nuevosPuntos;
                })
                setResultado2("¡Perdiste!");
            }else{
                setResultado("¡Gooooool de ProDevs!");
                setPuntos((prevPuntos)=>{
                    const nuevosPuntos = [...prevPuntos];
                    nuevosPuntos[contador] = 'green';
                    return nuevosPuntos;
            });
        }
            // Incrementamos el contador para pintar el circulo en el siguiente turno. //
            setContador((prevContador)=>prevContador +1 );

            if (contador + 1 === 6){
                setResultado2("¡ProDevs ganó de nuevo!");
                setBotonesHabilitados(false);
            }

        },2400);
    
    };

    
    return(
        <Box sx={{width:"100%", height:'100vh'}}>


            <Box sx={{width:"60%", margin:'auto',}}>

            

                <Box sx={{position:'relative',width:'100%'}}>
                    <Box component="img" src="./assets/div-tribuna-futbol.jpg" sx={{width:'100%', boxShadow:'0px 4px 16px rgb(191, 3, 216)'}}></Box>
                </Box>

                <Box sx={{position:'relative',width:'100%',padding:'8px 0', background:'linear-gradient(to bottom, rgb(50, 41, 113), rgb(13, 12, 13))',boxShadow:'0px 4px 16px rgb(191, 3, 216)'}}>
                    <Box sx={{display:'flex',justifyContent:'center',gap:'60px', }}>
                        {puntos.map((color,index)=>(
                            <div key={index} style={{borderRadius:'12px',background:color,width:'22px', height:'22px',border:'2px solid rgb(62, 99, 221)'}}></div>
                        ))}
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'space-between', padding:'0 80px'}}>
                        <Typography sx={{marginTop:'12px',color:'rgb(228, 144, 239)',fontSize:'20px',fontWeight:'bold'}}>Veamos que sucede....</Typography>
                        {resultado &&(
                        <Typography sx={{marginTop:'12px',color:'rgb(176, 143, 248)',fontSize:'20px',fontWeight:'bold'}}>
                            {resultado}
                        </Typography>
                            )}
                        {resultado2 &&(
                        <Typography sx={{marginTop:'12px',color:'rgb(176, 143, 248)',fontSize:'20px',fontWeight:'bold'}}>
                            {resultado2}
                        </Typography>

                        
                            )}
                    </Box>
                </Box>
               
                
                
                <Box id="arco" sx={{position:'relative',width:'100%',height:'80vh'}}>
                    <Box component="img" src="./assets/div-arco-area-futbol.jpg" sx={{width:'100%',boxShadow:'0px 4px 16px rgb(71, 248, 35)'}}></Box>
                    <Grid container sx={{position:'absolute',top:'2%',left:'50%',transform:'translateX(-50%)', zIndex:'4', height:'100%',display:'flex',justifyContent:'center',alignItems:'flex-start',height:'auto'}}>
                        
                        {/* Botones para el jugador. */}
                        <Grid item xs={3.7} sx={{display:'flex', flexDirection:'column', justifyContent:'spaceBetween', height:'auto'}}>
                            <Button id={`boton-1`} onClick={()=>manejarClick(1)} sx={{background:'rgb(58, 93, 70)', border:'4px solid rgb(153, 13, 160)',padding:'17% 0', opacity:'0.8',color:'rgb(153, 13, 160)',pointerEvents: botonesHabilitados ? 'auto' : 'none'}}>1</Button>
                            <Button id={`boton-2`} onClick={()=>manejarClick(2)} sx={{background:'rgb(58, 93, 70)',border:'4px solid rgb(153, 13, 160)',padding:'17% 0', opacity:'0.8',color:'rgb(153, 13, 160)',pointerEvents: botonesHabilitados ? 'auto' : 'none'}}>2</Button>
                            <Button id={`boton-3`} onClick={()=>manejarClick(3)} sx={{background:'rgb(58, 93, 70)',border:'4px solid rgb(153, 13, 160)',padding:'17% 0', opacity:'0.8',color:'rgb(153, 13, 160)',pointerEvents: botonesHabilitados ? 'auto' : 'none'}}>3</Button>
                        </Grid>

                        <Grid item xs={3.7} sx={{display:'flex', flexDirection:'column', justifyContent:'spaceBetween', height:'auto'}}>
                            <Button id={`boton-4`} onClick={()=>manejarClick(4)} sx={{background:'rgb(58, 93, 70)',border:'4px solid rgb(153, 13, 160)',padding:'62.4% 0',opacity:'0.8',color:'rgb(153, 13, 160)',pointerEvents: botonesHabilitados ? 'auto' : 'none'}}>4</Button>
                        </Grid>

                        <Grid item xs={3.7} sx={{display:'flex', flexDirection:'column', justifyContent:'spaceBetween', height:'auto'}}>
                            <Button id={`boton-5`} onClick={()=>manejarClick(5)} sx={{background:'rgb(58, 93, 70)',border:'4px solid rgb(153, 13, 160)',padding:'17% 0', opacity:'0.8',color:'rgb(153, 13, 160)',pointerEvents: botonesHabilitados ? 'auto' : 'none'}}>5</Button>
                            <Button id={`boton-6`} onClick={()=>manejarClick(6)} sx={{background:'rgb(58, 93, 70)',border:'4px solid rgb(153, 13, 160)',padding:'17% 0', opacity:'0.8',color:'rgb(153, 13, 160)',pointerEvents: botonesHabilitados ? 'auto' : 'none'}}>6</Button>
                            <Button id={`boton-7`} onClick={()=>manejarClick(7)} sx={{background:'rgb(58, 93, 70)',border:'4px solid rgb(153, 13, 160)',padding:'17% 0', opacity:'0.8',color:'rgb(153, 13, 160)',pointerEvents: botonesHabilitados ? 'auto' : 'none'}}>7</Button>
                        </Grid>
                    
                    </Grid>
                    
                    <Sprites tipo="arquero" animar={animarArquero} botonSeleccionado={botonArquero}></Sprites>
                    <Sprites tipo="jugador" animar={animarJugador} botonSeleccionado={botonJugador}></Sprites>
                    <Sprites tipo="pelota" animar={animarPelota} botonSeleccionado={botonJugador}></Sprites>
                
                </Box>

                <Typography variant="h4" mb={2} sx={{MarginLeft:'800', zIndex:12}}>Penalty Shootout</Typography>
            </Box>
        </Box>
    )
}

export default Penaltys;