import React from "react";
import { Box,Typography} from '@mui/material';

const Informacion = () =>{
    return(
        <Box sx={{background:'rgb(57, 46, 120)', borderRadius:'8px'}}>
            <Typography sx={{color:'white', textAlign:'center',fontSize:'24px'}}>Info:</Typography>
            <Typography sx={{color:'white', textAlign:'center',fontSize:'20px'}}>Este es un proyecto de programación utilizando la tecnología de "React".</Typography>
            <Typography sx={{color:'white', textAlign:'center',fontSize:'20px'}}>Se trata de un trabajo final individual realizado en el curso de programación que brinda la institución "ProDevs Academy".</Typography>
            <Typography sx={{color:'white', textAlign:'center',fontSize:'20px'}}>El plazo de entrega de este trabajo fue de aprox. 12 días.</Typography>
            <Typography sx={{color:'white', textAlign:'center',fontSize:'20px'}}>La institución brinda cursos de programación "Front End", "Back End","Full Stack", entre otros.</Typography>
            <Typography sx={{color:'white', textAlign:'center',fontSize:'20px'}}>A continuación, su link: <a>https://prodevsacademy.com/</a></Typography>
        </Box>
    )
}

export default Informacion;