import React from "react";
import {Box} from '@mui/material';
import {useTheme} from "@mui/material/styles";



const Footer=()=>{
    const theme = useTheme();

    return(
       
            <Box component="img" src="/assets/footer-fondo.jpg" sx={{width:'100%', height:'40vh', backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>

            </Box>
      
    )

}

export default Footer;