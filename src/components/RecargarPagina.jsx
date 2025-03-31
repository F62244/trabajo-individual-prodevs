import React, {useEffect} from 'react';

const RecargarPagina = () =>{
    // Guardamos la posición del scroll antes de recargar. //

    const recargar = () =>{
        const scrollPos = window.scrollY;
        localStorage.setItem('scrollPos',scrollPos);
        window.location.reload();
    };

    useEffect(()=>{
        // Después de la recarga, restauramos la posición del scroll. //
        const savedScrollPos = localStorage.getItem('ScrolPos');
        if(savedScrollPos !==null){
            window.scrollTo(0,savedScrollPos);
            localStorage.removeItem('scrollPos');
        }
    },[]);

    return(
        <button style={{background:'rgb(5, 59, 26)', border:'3px solid rgb(1, 40, 16)',color:'white',padding:'4px', cursor:'pointer'}} onClick={recargar}>¡Ganémosle!</button>
    )

}


export default RecargarPagina;