import { Grid } from "@mui/material"
import Categories from '../Categories/Categories'
import Banner from "../banner/Banner"
import Posts from "../post/Posts"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home(){
    const[search,setSearchParent]=useState('')
    return(
        <>
            <Banner/>
        <Grid container>
            <Grid item lg={2} sm={2} xs={12}>
            <Categories setSearchParent={setSearchParent}/>
            </Grid>
            <Grid container item xs={12} sm={10} lg={10}>
            <Posts search={search}/>
            </Grid>
            </Grid>
        </>
    )
}
