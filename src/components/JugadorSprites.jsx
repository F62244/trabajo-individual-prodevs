import React, {useRef,useEffect} from 'react';
import gsap from 'gsap';

const JugadorSprites = ({animar}) =>{
    const jugadorRef = useRef(null);
    const frameWidth = 200;
    const totalFrames = 8;


useEffect(()=>{
    if (animar){
        const timeline = gsap.timeline();
        // Jugador cambiando de posición. (Cambio de frames). //
    timeline.to(jugadorRef.current,{
        backgroundPositionX:`-${frameWidth * (totalFrames - 1)}px`,
        ease: "steps("+(totalFrames - 1) +")",
        duration: 2,
    });

        // Jugador acercandose a la pelota. (Recuadro del frame moviéndose). //
        gsap.to(jugadorRef.current,{
            duration:2,
            x:100,
            y:-100,
            ease:'power1.in'
        })
    }  
},[animar]);

return(
    <div ref={jugadorRef}
        className="jugador-sprite"
        style={{
            position: 'absolute',
            bottom:'0',
            left: '50%',
            transform: 'translateX(-50%)',
            width:`${frameWidth}px`,
            height:'200px',
            backgroundImage:"url(/assets/sprites-jugador-futbol.png)",
            backgroundRepeat:'no-repeat',
            backgroundPosition:'0px 0px',
            backgroundSize:`${frameWidth * totalFrames}px 200px`}}
    ></div>
)
};

export default JugadorSprites;