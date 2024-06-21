import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import { useCategories } from '../../CategoriesContext'; // Adjust the path accordingly

const initialMenuItems = [
  { id: 1, name: 'Spaghetti Carbonara', category: 'Pasta', price: '$12.99' },
  { id: 2, name: 'Margherita Pizza', category: 'Pizza', price: '$10.99' },
  { id: 3, name: 'Caesar Salad', category: 'Salad', price: '$8.99' }
];

const Menu = () => {
  const { categories } = useCategories();
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: []
  });

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'categories') {
      setFormData((prevData) => ({
        ...prevData,
        categories: checked ? [...prevData.categories, value] : prevData.categories.filter((category) => category !== value)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newMenuItem = {
      id: menuItems.length + 1,
      name: formData.name,
      category: formData.categories.join(', '),
      price: formData.price
    };
    setMenuItems([...menuItems, newMenuItem]);
    setShowForm(false);
    setFormData({
      name: '',
      price: '',
      categories: []
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Menu
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
        Add Item
      </Button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <TextField label="Name of the Dish" name="name" value={formData.name} onChange={handleFormChange} required />
          <TextField label="Price" name="price" value={formData.price} onChange={handleFormChange} required />
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name="categories"
                    value={category}
                    checked={formData.categories.includes(category)}
                    onChange={handleFormChange}
                  />
                }
                label={category}
                key={category}
              />
            ))}
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name of the Dish</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Menu;
