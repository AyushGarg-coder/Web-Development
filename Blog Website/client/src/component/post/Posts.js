import { useEffect, useState } from "react"
import axios from "axios";
import { Card, CardContent, Grid, Typography, styled } from "@mui/material";
import { TextLimiter } from "../Config/TextLimiter";
import { Link, useSearchParams } from "react-router-dom";
const StyledCard = styled(Card)`
width:97%;
height:350px;
border:1px solid black;
border-radius:10px;
display:flex;
flex-direction:column;
overflow:scroll;
scrollbar-width: none;
`
const Image = styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height: 150,
    '@media (max-width:1800px)': {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
})
export default function Posts({ search }) {
    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category')

    useEffect(() => {
        const fetchdata = async () => {
            try {
                let url = 'http://localhost:5000/posts';
                if (category) {
                    url += `?category=${category}`
                }

                let result = await axios.get(url);
                // console.log(result.data)
                setPosts(result.data)
            }
            catch (err) {
                alert(err)
            }
        }
        fetchdata();
    }, [category])


    useEffect(() => {
        const fetchdata = async () => {
            try {
                let url = 'http://localhost:5000/searchdata';
                console.log(search)
                if (search) {
                    url += `?search=${search}`
                    let result = await axios.get(url);
                    setPosts(result.data)
                }

            }
            catch (err) {
                alert(err.message)
            }
        }
        if (search !== undefined) {
            fetchdata();
        }
    }, [search])
    // console.log(posts)
    return (
        <>
            {
                posts && posts.length > 0 ?
                    <Grid container spacing={3} style={{ marginTop: '-14px', marginLeft: '-15px', height: '800px' }}>
                        {posts.map((post) => (
                            <Grid item key={post._id} xs={12} sm={6} md={4}>
                                <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                                    <StyledCard >
                                        {/* Assuming 'picture' is a base64 encoded image, you can render it like this */}
                                        <Image src={post.picture} alt={post.title} />
                                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography variant="h5" component="div">
                                                {TextLimiter(post.title, 33)}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                {post.categories}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {TextLimiter(post.description, 90)}
                                            </Typography>
                                            <Typography variant="caption" style={{ display: 'flex', alignItems: 'end' }}>
                                                Posted by {post.username} on {new Date(post.createddate).toLocaleDateString()}
                                            </Typography>
                                        </CardContent>
                                    </StyledCard>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                    :
                    <div style={{ color: '#878787', margin: '30px 80px' }}>
                        No data available
                    </div>
            }
        </>
    )
}
