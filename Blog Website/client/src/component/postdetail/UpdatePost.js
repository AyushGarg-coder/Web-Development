// import { Box, Button, FormControl, Input, InputBase, TextareaAutosize, styled } from "@mui/material";
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import { useState } from "react";
// import DropdownMenu from "../dropdownmenu/Dropdownmenu";
// const Image=styled('img')({
//     width:'100%',
//     height:'50vh',
//     objectFit:'fill'

// })
// const Container=styled(Box)`
//     margin:3em 6em;
// `
// const StyleForm =styled(FormControl)`
// margin:10px;
// display:flex;
// flex-direction:row;
// `

// const InputField=styled(InputBase)`
// flex:1;
// margin:0px 20px;
// font-size:23px;
// padding:3px 10px;
// box-shadow:0px 1px 5px 0px rgb(0 0 0)
// `
// const TextArea=styled(TextareaAutosize)`
// width:100%;
// margin-top:1.5rem;
// font-size:18px;
// border:none;
// box-shadow:0px 1px 5px 0px rgb(0 0 0);
// padding:10px 15px;
// &:focus-visible{
// outline:none;}
// `
// const initialpost={
// title:"",
// description:"",
// picture:"",
// username:"",
// categories:"",
// createdDate:new Date()
// }
// const Styledcategory=styled(DropdownMenu)`
// margin:0px 5px;
// `

// export default function CreatePost(){
//     const [post,setPost]=useState(initialpost)
//     const[category,setCategory]=useState('')

//     const handleChange=(e)=>{
//         setPost({...post,[e.target.name]:e.target.value})
//     }

//     const handleChangeCategory=(category)=>{
//         setPost({...post,categories:category})
//         setCategory(category)
//     }

//     console.log(post)
//     return(
//         <Container>
//             <Image src="https://clickfirstmarketing.com/wp-content/uploads/blog-for-business.jpg"/>
//             <StyleForm>
//                 <label htmlFor="fileInput">
//                     <AddCircleIcon fontSize="large" color="action" />
//                 </label>
//                 <Input type="file" id="fileInput" style={{display:'none'}} onChange={handleChange} name="title"/>
//                 <InputField placeholder="Title"/>
//                 <Styledcategory onSelectCategory={handleChangeCategory}/>
//                 <Button variant="contained">Publish</Button>
//             </StyleForm>
//             <TextArea minRows={7} placeholder="Tell your story ...." onChange={handleChange} name="description"/>
//         </Container>
//     )
// }
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, FormControl, InputBase, TextareaAutosize, styled } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DropdownMenu from "../dropdownmenu/Dropdownmenu";
import { DataContext } from '../Config/DataProvider';
import axios from 'axios'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'fill',
    '@media (max-width:705px)':{
        height:'30vh',
    }

})
const Container = styled(Box)`
    margin:3em 6em;
    @media (max-width:705px){
    margin:3rem 3rem;
    }
`
const StyleForm = styled('form')({
margin:'10px',
display:'flex',
flexDirection:'row',
'@media (max-width:705px)':{
    margin:'10px',
    alignItems:'center',
    flexDirection:'column',
}
})

const Btn =styled(Button)`
@media (max-width:705px){
margin-top:10px;
}`

const InputField = styled(InputBase)`
flex:1;
margin:0px 20px;
font-size:23px;
padding:3px 10px;
box-shadow:0px 1px 5px 0px rgb(0 0 0);
@media (max-width:705px){
margin-top:15px;
margin-bottom:15px;
}
`
const TextArea = styled(TextareaAutosize)`
width:100%;
margin-top:1.3rem;
font-size:18px;
border:none;
box-shadow:0px 1px 5px 0px rgb(0 0 0);
padding:10px 15px;
&:focus-visible{
outline:none;}
`

const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "", // Changed from empty string to null if not selecting initially
    createdDate:""
};

export default function UpdatePost({posts}) {
    const [post, setPost] = useState(initialPost);
    const [category, setCategory] = useState(null);
    const [image, setImage] = useState(null);
    const { account } = useContext(DataContext)
    const { id } = useParams();
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value});
        // console.log(account.username)
    };
    
    const handleChangeCategory = (category) => {
        setCategory(category);
        setPost({ ...post, categories: category });
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    useEffect(()=>{
        async function fetchData(){
            try{
                console.log(id)
                const response=await axios.get(`http://localhost:5000/getpost?id=${id}`)
                console.log(response.data)
                setPost(response.data)
            }
            catch(err){

            }
        }
        fetchData();
    },[])

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                setPost({
                    ...post,
                    picture: reader.result, // Store base64 encoded image or URL
                    username: account.username,
                    createdDate:new Date().toISOString() // Assuming username comes from context
                });
            };
            reader.readAsDataURL(image);
        }
    }, [image,post]);

    const handleSubmit = async(e) => {
        try {
            console.log("Form submitted with:", post);
            const result = await axios.post(`http://localhost:5000/updatepost?id=${id}`, post)
                console.log(result.status)
                if (result.status === 200) {
                    console.log('Data Submitted successfully');
                    console.log(result)
                    navigate('/');
                }
                else{
                    alert(result.response.data)
                }
                setPost(initialPost);
                setCategory(null);
                alert(result.data)
        }
        catch (err) {
            console.log(err);
            // alert("Error Publishing Post")
        }
    };

    return (
        <Container>
            {post.picture ? <Image src={post.picture} alt="Post Image" /> : <Image src="https://clickfirstmarketing.com/wp-content/uploads/blog-for-business.jpg" alt="Post Image" />}
            <StyleForm >
                <label htmlFor="fileInput">
                    <AddCircleIcon fontSize="large" color="action" />
                </label>
                <InputField type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} name="title" required/>
                <InputField
                    placeholder="Title"
                    value={post.title}
                    onChange={handleChange}
                    name="title"
                    required
                />
                <DropdownMenu onSelectCategory={handleChangeCategory} />
                <Btn variant="contained" onClick={handleSubmit} >Publish</Btn>
            </StyleForm>
            <TextArea
                minRows={6}
                placeholder="Tell your story ...."
                value={post.description}
                onChange={handleChange}
                name="description"
                required
            />
        </Container>
    );
}
