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

    const[resultado,setResultado]=useState(null);

    useEffect(()=>{
        if(resultado){
            const reinicio = setTimeout(()=>{
                setBotonJugador(null);
                setBotonArquero(null);
                setResultado(null);
                setAnimarJugador(false);
                setAnimarArquero(false);
                setAnimarPelota(false);
            },2000);
            
            return ()=>clearTimeout(reinicio);
        }
    },[resultado]);

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
                setResultado("¡Atajó el arquero!")
            }else{
                setResultado("¡Gooooool de ProDevs!")
            }
            setAnimarJugador(false);
            setAnimarArquero(false);
            setAnimarPelota(false);
        },2000);
    
    };

    
    return(
        <Container sx={{width:"40%"}}>
            
            <Typography variant="h4" mb={2} sx={{MarginLeft:'200px', zIndex:12}}>Penalty Shootout</Typography>

            <Box sx={{position:'relative',width:'100%'}}>
                <Box component="img" src="./assets/div-tribuna-futbol.jpg" sx={{width:"100%"}}></Box>
            </Box>
            
            <Box id="arco" sx={{position:'relative',width:'100%',height:'80vh'}}>
                <Box component="img" src="./assets/div-arco-area-futbol.jpg" sx={{width:"100%"}}></Box>
                <Grid container sx={{position:'absolute',top:'2%',left:'50%',transform:'translateX(-50%)', zIndex:'4', height:'100%',display:'flex',justifyContent:'center',alignItems:'flex-start',height:'auto'}}>
                    
                    {/* Botones para el jugador. */}
                    <Grid item xs={3.7} sx={{display:'flex', flexDirection:'column', justifyContent:'spaceBetween', height:'auto'}}>
                        <Button id={`boton-1`} onClick={()=>manejarClick(1)} sx={{background:'rgb(58, 93, 70)', border:'4px solid blue',padding:'17% 0', opacity:'0.8'}}>1</Button>
                        <Button id={`boton-2`} onClick={()=>manejarClick(2)} sx={{background:'rgb(58, 93, 70)',border:'4px solid blue',padding:'17% 0', opacity:'0.8'}}>2</Button>
                        <Button id={`boton-3`} onClick={()=>manejarClick(3)} sx={{background:'rgb(58, 93, 70)',border:'4px solid blue',padding:'17% 0', opacity:'0.8'}}>3</Button>
                    </Grid>

                    <Grid item xs={3.7} sx={{display:'flex', flexDirection:'column', justifyContent:'spaceBetween', height:'auto'}}>
                        <Button id={`boton-4`} onClick={()=>manejarClick(4)} sx={{background:'rgb(58, 93, 70)',border:'4px solid blue',padding:'62.4% 0',opacity:'0.8'}}>4</Button>
                    </Grid>

                    <Grid item xs={3.7} sx={{display:'flex', flexDirection:'column', justifyContent:'spaceBetween', height:'auto'}}>
                        <Button id={`boton-5`} onClick={()=>manejarClick(5)} sx={{background:'rgb(58, 93, 70)',border:'4px solid blue',padding:'17% 0', opacity:'0.8'}}>5</Button>
                        <Button id={`boton-6`} onClick={()=>manejarClick(6)} sx={{background:'rgb(58, 93, 70)',border:'4px solid blue',padding:'17% 0', opacity:'0.8'}}>6</Button>
                        <Button id={`boton-7`} onClick={()=>manejarClick(7)} sx={{background:'rgb(58, 93, 70)',border:'4px solid blue',padding:'17% 0', opacity:'0.8'}}>7</Button>
                    </Grid>
                
                </Grid>
                <Sprites tipo="arquero" animar={animarArquero} botonSeleccionado={botonArquero}></Sprites>
                <Sprites tipo="jugador" animar={animarJugador} botonSeleccionado={botonJugador}></Sprites>
                <Sprites tipo="pelota" animar={animarPelota} botonSeleccionado={botonJugador}></Sprites>
            
            </Box>

            {/* Resultado. */}
            {resultado &&(
                <Typography variant="h3" mt={3}>
                    {resultado}
                </Typography>
            )}
        </Container>
    )
}

export default Penaltys;