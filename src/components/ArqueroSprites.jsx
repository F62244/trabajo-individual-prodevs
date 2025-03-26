import React, {useRef,useEffect} from 'react';
import gsap from 'gsap';

const ArqueroSprites = ({animar}) =>{
    const arqueroRef = useRef(null);
    const frameWidth = 200;
    const totalFrames = 8;

    useEffect(()=>{
        if (animar){
            const timeline = gsap.timeline();
            // Arquero cambiando de posición. (Cambio de frames). //
        gsap.to(arqueroRef.current,{
            backgroundPositionX:`-${frameWidth * (totalFrames - 1)}px`,
            ease: "steps("+(totalFrames - 1) +")",
            duration: 2,
        });
    
            //Arquero acercándose a algun palo. (Recuadro del frame moviéndose). //
            gsap.to(arqueroRef.current,{
                duration:2,
                x:-100,
                y:-100,
                ease:'power1.in'
            })
        }  
    },[animar]);
    
    return(
        <div ref={arqueroRef}
            className="arquero-sprite"
            style={{
                position: 'absolute',
                bottom:'0',
                left: '50%',
                transform: 'translateX(-50%)',
                width:`${frameWidth}px`,
                height:'200px',
                backgroundImage:"url(/assets/sprites-arquero-futbol.png)",
                backgroundRepeat:'no-repeat',
                backgroundPosition:'0px 0px',
                backgroundSize:`${frameWidth * totalFrames}px 200px`}}
        ></div>
    )
    };

    export default ArqueroSprites;