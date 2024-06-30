import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { categories } from '../Config/data';
const DropdownMenu = ({onSelectCategory}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    const selectedCategoryName = event.target.getAttribute('name');
    onSelectCategory(selectedCategoryName)
  };

  return (
    <div>
      <Button
        variant='contained'
        style={{color:'white',marginRight:'8px',padding:'11px 10px'}}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {categories.map((item) => (
          <MenuItem key={item.id} name={item.type} onClick={handleClose}>
            {item.type}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
