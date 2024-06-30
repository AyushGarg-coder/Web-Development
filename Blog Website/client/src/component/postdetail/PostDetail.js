import { Box, Typography, styled } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Edit, Delete } from '@mui/icons-material'
import { DataContext } from "../Config/DataProvider";

const Container = styled(Box)`
margin:4rem 7rem;
@media (max-width:705px){
margin:2rem 3rem;
}
`


const Image = styled('img')({
    width: '100%',
    height: '50vh',
    // objectFit:'cover'
    '@media (max-width:705px)': {
        height: '30vh',
    }
})


const Heading = styled(Typography)`
font-size:38px;
text-align:center;
font-weight:600;
margin:50px 0 10px 0;
text-transform:captialize;
word-break:break-word;
@media (max-width:705px){
font-size:30px;
}
`

const EditIcon = styled(Edit)`
margin:5px;
padding:5px;
border:1px solid #878787;
border-radius:10px;
&:hover{
transition: background-color 0.5s ease-in-out;
background-color:#1976d2;
color:white;
}
&:active{
transition: background-color 0.5s ease-in-out;
background-color:yellow;
color:black;
}
`
const DeleteIcon = styled(Delete)`
margin:5px;
padding:5px;
border:1px solid #878787;
border-radius:10px;
&:hover{
transition: background-color 0.5s ease-in-out;
background-color:#d32f2f;
color:white;
}
`

const Author = styled(Box)`
color:#878787;
margin:20px 0px;
display:flex;
@media (max-width:705px){
display:block;
}
`
const Description = styled(Typography)`
word-break:break-word;
`


const PostDetail = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const navigate=useNavigate();
    // console.log(id)
    const { account } = useContext(DataContext)

    const handleDelete = async () => {
        try {
            let url = 'http://localhost:5000/deletepost';
            if (id) {
                url += `?id=${id}`;
            }
            let response = await axios.post(url, post);
            if (response.status === 200) {
                alert(response.data);
                navigate('/')
            }
            else {
                alert(response.data);
            }
        }
        catch (err) {
            alert(err.message)
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'http://localhost:5000/getpost';
                if (id) {
                    url += `?id=${id}`;
                }
                else {
                    return;
                }
                let result = await axios.get(url);
                setPost(result.data);
            }
            catch (e) {
                alert(e);
            }
        }
        fetchData();
    }, [id])
    return (
        <Container>
            {post.picture ? <Image src={post.picture} alt="Post Image" /> : <Image src="https://clickfirstmarketing.com/wp-content/uploads/blog-for-business.jpg" alt="Post Image" />}
            <Box style={{ float: "right" }}>
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`} style={{ color: 'inherit', textDecoration: 'none' }} post={post}>
                            <EditIcon color="primary" />
                        </Link>

                        <DeleteIcon color="error" onClick={handleDelete} />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>
            <Author>
                <Typography>Author : <Box component="span" style={{ fontWeight: 600 }}>{post.username}</Box></Typography>
                <Typography style={{ marginLeft: 'auto' }}>Created on: {new Date(post.createddate).toLocaleDateString()}</Typography>
            </Author>
            <Description>{post.description}</Description>

        </Container>
    )
}
export default PostDetail;
