import React, {useEffect,useState,useRef} from 'react';
import {Container} from '@mui/material';
import gsap from 'gsap';

const Sprites = ({animar, tipo, botonSeleccionado}) =>{
    const spriteRef = useRef(null);
    const frameWidth = 200;
    const totalFrames = 8;

    // Refs para los sprites. //
    const spriteArqueroRef = useRef(null);
    const spriteJugadorRef = useRef(null);
    const spritePelotaRef = useRef(null);

    // Penal finalizado, reiniciar penal. //
    const [penalFinalizado, setPenalFinalizado] = useState(false);

useEffect(()=>{

    if(botonSeleccionado === null || botonSeleccionado === undefined) return;

    
        const timeline = gsap.timeline();

        const posicionesArquero = [
            {x:-100,y:-100,sprite:'./assets/sprites-arquero-futbol-1.png'}, // Equivale al botón 1. //
            {x:-100,y:0,sprite:'./assets/sprites-arquero-futbol-2.png'}, // Equivale al botón 2. //
            {x:-100,y:100,sprite:'./assets/sprites-arquero-futbol-3.png'}, // Equivale al botón 3. //
            {x:0,y:0,sprite:'./assets/sprites-arquero-futbol-4.png'}, // Equivale al botón 4 (centro). //
            {x:100,y:-100,sprite:'./assets/sprites-arquero-futbol-5.png'}, // Equivale al botón 5. //
            {x:100,y:0,sprite:'./assets/sprites-arquero-futbol-6.png'}, // Equivale al botón 6. //
            {x:100,y:100,sprite:'./assets/sprites-arquero-futbol-7.png'}, // Equivale al botón 7. //
        ];


        // Con esta validación nos aseguramos de qu el índice no esté fuera de rango. //
        const index = Number(botonSeleccionado) -1;
        
        if (isNaN(index) && index >= 0 && index < posicionesArquero.length){
                console.error("Valor de botonSeleccionado fuera de rango.")
            return;
        }
            
            const {x,y} = posicionesArquero[index];
        

        // Arquero cambiando de frames y posición. //
    if(tipo==='arquero' && spriteArqueroRef.current){
        timeline
    .to(spriteArqueroRef.current,{
        backgroundPositionX:`-${frameWidth * (totalFrames - 1)}px`,
        ease: "steps("+(totalFrames - 1) +")",
        duration: 1,
    })
    .to(spriteArqueroRef.current,{
        duration:1.4,
        x: 50 + x,
        y: 50 + y,
        ease:'power1.in',
        delay:1,
    },0).to(spriteArqueroRef.current,{
        duration: 1,
        top: '200px',
        delay:1.4,
    },).eventCallback("onComplete",()=>{
        //Esto va a finalizarse cuando las animaciones de la pelota finalicen. //
        setPenalFinalizado(true);
    });
    // Jugador cambiando de frames y posición. //
}else if(tipo==='jugador'&&spriteJugadorRef.current){
        timeline
        .to(spriteJugadorRef.current,{
            duration:2,
            left:'52%',
            bottom:'12%',
            transform:'translateX(-50%)',
            ease:'power1.in',
        },).to(spriteRef.current,{
            delay:2
        })
        .eventCallback("onComplete",()=>{
            //Esto va a finalizarse cuando las animaciones de la pelota finalicen. //
            setPenalFinalizado(true);
        });;
         // Pelota cambiando de Frames y posición. //
    }else if(tipo==='pelota'&&spritePelotaRef.current){
        // Obtenemos las coordenadas del botón seleccionado. //
        const boton = document.getElementById(`boton-${botonSeleccionado}`);
        const arco = document.querySelector('#arco')
        if (!boton || !arco){
            console.error(`No se encontró el elemento:`,{
                boton: boton ? "Encontrado" : "No encontrado",
                arco: arco ? "Encontrado" : "No encontrado",
                });
            return;
            }

            const rect = boton.getBoundingClientRect();
            const arcoRect = arco.getBoundingClientRect(); // Contenedor del arco.
            
            const botonX = rect.left + rect.width / 2;
            const botonY = rect.top + rect.height / 2;
    
            const destinoX = botonX - arcoRect.left - (spritePelotaRef.current.offsetWidth /2);
            const destinoY = botonY - arcoRect.top - (spritePelotaRef.current.offsetHeight /2);
    
            const offsetX =4;
            const offsetY=4;

            timeline.to(spritePelotaRef.current,{
                duration: 2,
                left: destinoX + offsetX + "px",
                top: destinoY + offsetY + "px",
                ease: "power1.inOut",
                delay:1,
            },0)
            .to(spritePelotaRef.current,{
                duration: 0.6,
                top: "30%",
                ease:"power2.Out",
                delay:'1',
            },"+=0.1")
            .eventCallback("onComplete",()=>{
                //Esto va a finalizarse cuando las animaciones de la pelota finalicen. //
                setPenalFinalizado(true);
            });
        }
    },[animar,botonSeleccionado,tipo]);

    const resetAnimation=()=>{
        
        if(spriteArqueroRef.current){
            gsap.set(spriteArqueroRef.current,{
                left:'50%',
                top:'80px',
                transform:'translateX(-50%)',
                backgroundPosition:'0px 0px',
                x:0,
                y:0,
            });
    }if(spriteJugadorRef.current){
        gsap.set(spriteJugadorRef.current,{
            bottom:'-4%',
            left: '20%',
            transform:'translateX(-50%)',
            backgroundPosition:'0px 0px',
            x:0,
            y:0,
        });
}if(spritePelotaRef.current){
    gsap.set(spritePelotaRef.current,{
        left:'262px',
        top: '452px',
        backgroundPosition:'0px 0px',
       
    });
}
    };

    useEffect(()=>{
        if(penalFinalizado){
            resetAnimation();
            setTimeout(()=>{
                setPenalFinalizado(false);
            },2000);
        }
    },[penalFinalizado]);



    return(
        <Container>
            <div>
                {tipo === 'arquero' && (
                <div ref={spriteArqueroRef}
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width:`${frameWidth}px`,
                        height:'200px',
                        backgroundImage: `url(./assets/sprites-arquero-futbol-1.png)`,
                        backgroundRepeat:'no-repeat',
                        backgroundPosition:'0px 0px',
                        zIndex:'8',
                        backgroundSize:`${frameWidth * totalFrames}px 200px`}}
                ></div>
            )}

{tipo === 'jugador' && (
                <div ref={spriteJugadorRef}
                style={{
                    position: 'absolute',
                    bottom:'-4%',
                    left: '20%',
                    transform: 'translateX(-50%)',
                    width:`${frameWidth}px`,
                    height:'200px',
                    backgroundImage:'url(./assets/sprites-jugador-futbol.png)',
                    backgroundRepeat:'no-repeat',
                    backgroundPosition:'0px 0px',
                    zIndex:'4',
                    backgroundSize:`${frameWidth * totalFrames}px 200px`}}
                ></div>
            )}

{tipo === 'pelota' && (
                <div ref={spritePelotaRef}
                style={{
                    position: 'absolute',
                    bottom:'12%',
                    left: '40%',
                    width:`${frameWidth}px`,
                    height:'200px',
                    backgroundImage:'url(./assets/sprites-pelota-futbol.png)',
                    backgroundRepeat:'no-repeat',
                    backgroundPosition:'0px 0px',
                    backgroundSize:`${frameWidth * totalFrames}px 200px`}}
                ></div>
            )}
            </div>
    </Container>
    )

};
export default Sprites;