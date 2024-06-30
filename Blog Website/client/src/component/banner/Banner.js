import { Box, styled } from "@mui/material"

const Image =styled(Box)`
height:50vh;
width:100%;
background:url('https://t3.ftcdn.net/jpg/05/52/20/98/360_F_552209893_vXBU90Mj9zxsPV6xWHMG1giaKms7odKo.jpg') center/100%  #000;
color:#ffffff;
display:flex;
align-items:center;
justify-content:left;
pointer-events:none;
&>p{
font-size:70px;
}
`
export default function Banner(){
    return(
        <>
            <Image>
            </Image>
        </>
    )
}
