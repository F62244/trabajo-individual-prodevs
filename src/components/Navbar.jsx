import React from "react";
import {Box} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {Link, useLocation} from "react-router-dom";

const Navbar = () =>{
    const location = useLocation();
    const theme = useTheme();
    return(
            <Box style={{background:'gray',backgroundImage:"url('/assets/navbar-fondo.jpg')",backgroundRepeat:'no-repeat',backgroundSize:'cover',boxShadow:'0px 2px 4px rgb(50, 66, 53)'}}>
            <nav style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <p style={{position: 'absolute', left:'50%',transform:'translateX(-50%)',margin:'0',fontSize:'40px',fontWeight:'bold',color:'white'}}>¡ProDevs Penaltys!</p>
                <ul style={{display:'flex',justifyContent:'center',marginLeft:'auto',listStyle:'none',gap:'20px',marginRight:'40px',fontSize:'20px',fontWeight:'bold',color: 'white'}}>
                    <li><Link to="/" style={{textDecoration:'none', color:'white', borderBottom: location.pathname === '/' ? "3px solid white" : 'none', paddingBottom: location.pathname === '/' ? '8px': '0'}}>Shoot Penaltys.</Link></li>
                    <li style={{color:'hsl(120, 81.40%, 53.70%)'}}>|</li>
                    <li><Link to="/informacion" style={{textDecoration:'none', color:'white', borderBottom: location.pathname === '/informacion' ? "3px solid white" : 'none', paddingBottom: location.pathname === '/informacion' ? '8px': '0'}}>Toda la info.</Link></li>
                </ul>
            </nav>
            </Box>
    )
}

export default Navbar;