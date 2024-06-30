// import React from "react";
// import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, styled } from "@mui/material";
// import { categories } from "../Config/data";
// import { Link } from "react-router-dom";

// const StyledTable = styled(Table)`
//     border:1px solid rgba(224,224,224,1);
// `
// const StyledButton = styled(Button)`
// margin:20px;
// width:85%;
// background:#6495ED;
// color:#fff;
// `


// const Categories = () => {
//     // console.log(categories)
//     return (
//         <>
//             <Link to='/createpost'>
//                 <StyledButton variant="contained">
//                     Create Blog
//                 </StyledButton>
//             </Link>
//             <TextField name="search" placeholder="Enter title to search" style={{margin:'auto'}}/>
//             <StyledButton>Search</StyledButton>
//             <StyledTable>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>
//                         <Link to='/?category=all'  style={{textDecoration:'none',color:'black'}}>
//                             All Categories
//                         </Link>
//                         </TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {categories.map(category => (
//                         <TableRow key={category.id}>
//                             <TableCell>
//                                 <Link to={`/?category=${category.type}`} style={{textDecoration:'none',color:'black'}}>
//                                 {category.type}
//                                 </Link>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </StyledTable>
//         </>
//     );
// };

// // import React from "react";
// // import { Button, Table } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { categories } from "../Config/data";

// // const Categories = () => {
// //     return (
// //         <div className="container mt-4">
// //             <Button variant="primary" className="mb-3">
// //                 Create Blog
// //             </Button>
// //             <Table striped bordered hover>
// //                 <thead>
// //                     <tr>
// //                         <th>All Categories</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {categories.map(category => (
// //                         <tr key={category.id}>
// //                             <td>{category.type}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </Table>
// //         </div>
// //     );
// // };

// export default Categories;

import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, styled, IconButton } from "@mui/material";
import { categories } from "../Config/data";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
`

const Categories = ({ setSearchParent }) => {

    const [search, setSearch] = useState("")

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = async () => {
        try {
            // <Posts search={search}/>

            if (search) {
                setSearchParent(search)
                // setSearch("")
            }
        }
        catch (err) {
            alert(err.message)
        }
    }

    return (
        <>
            <Link to='/createpost'>
                <StyledButton variant="contained">
                    Create Blog
                </StyledButton>
            </Link>
            <TextField
                name="search"
                onChange={handleChange}
                placeholder="Enter Title to Search"
                style={{ margin: 'auto', marginBottom: '10px', width: '85%', marginLeft: '19px', marginRight: '-20px' }}
                InputProps={{
                    endAdornment: (
                        
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>

                    )
                }}
            />
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to='/?category=all' style={{ textDecoration: 'none', color: 'black' }}>
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell>
                                <Link to={`/?category=${category.type}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    {category.type}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
};

export default Categories;

