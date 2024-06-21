import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useCategories } from '../../CategoriesContext'; // Adjust the path accordingly

const Categories = () => {
  const { categories, setCategories } = useCategories();
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter((category) => category !== categoryToDelete));
  };

  return (
    <div>
      <TextField label="New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleAddCategory}>
        Add Category
      </Button>
      <List>
        {categories.map((category) => (
          <ListItem key={category}>
            <ListItemText primary={category} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category)}>
                {/* <DeleteIcon /> */}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Categories;
