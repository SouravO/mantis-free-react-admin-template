import React, { useState, useEffect } from 'react';
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
  Modal,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone'; // Import useDropzone from react-dropzone
import { useCategories } from '../../CategoriesContext'; // Adjust the path accordingly
import ingredientsData from './ingredients.json'; // Adjust the path accordingly

const initialMenuItems = [
  { id: 1, name: 'Spaghetti Carbonara', category: 'Pasta', price: '$12.99', ingredients: [], photo: '', type: 'Non-Veg', description: '' },
  { id: 2, name: 'Margherita Pizza', category: 'Pizza', price: '$10.99', ingredients: [], photo: '', type: 'Veg', description: '' },
  { id: 3, name: 'Caesar Salad', category: 'Salad', price: '$8.99', ingredients: [], photo: '', type: 'Veg', description: '' }
];

const Menu = () => {
  const { categories } = useCategories();
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    categories: [],
    ingredients: [],
    photo: '',
    type: 'Veg', // Default to 'Veg'
    description: '' // Add description to formData
  });
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setIngredients(ingredientsData);
  }, []);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleAddButtonClick = () => {
    setFormData({
      id: null,
      name: '',
      price: '',
      categories: [],
      ingredients: [],
      photo: '',
      type: 'Veg', // Default type when adding new item
      description: '' // Reset description when adding new item
    });
    setEditMode(false);
    setShowForm(true);
  };

  const handleEditButtonClick = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      price: item.price,
      categories: item.category.split(', '),
      ingredients: item.ingredients,
      photo: item.photo,
      type: item.type,
      description: item.description // Set description when editing item
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newMenuItem = {
      id: formData.id ? formData.id : menuItems.length + 1,
      name: formData.name,
      category: formData.categories.join(', '),
      price: formData.price,
      ingredients: formData.ingredients,
      photo: formData.photo,
      type: formData.type,
      description: formData.description // Add description to new menu item
    };

    if (editMode) {
      setMenuItems(menuItems.map((item) => (item.id === newMenuItem.id ? newMenuItem : item)));
    } else {
      setMenuItems([...menuItems, newMenuItem]);
    }

    setShowForm(false);
    setFormData({
      id: null,
      name: '',
      price: '',
      categories: [],
      ingredients: [],
      photo: '',
      type: 'Veg', // Reset type to 'Veg' after form submission
      description: '' // Reset description after form submission
    });
  };

  const handleDeleteButtonClick = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleCategoryChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: value
    }));
  };

  const handleIngredientChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: value
    }));
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMediumScreen ? 400 : 1000, // Responsive width
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        photo: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: handleDrop
  });

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          Menu
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
          Add Item
        </Button>
      </Box>
      <Modal open={showForm} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h5" align="center" gutterBottom>
            {editMode ? 'Edit Item' : 'Add New Item'}
          </Typography>
          <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: isMediumScreen ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <TextField
                fullWidth
                margin="normal"
                label="Name of the Dish"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <TextField fullWidth margin="normal" label="Price" name="price" value={formData.price} onChange={handleFormChange} required />
            </div>
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              multiline
              rows={4}
              required
              style={{ gridColumn: 'span 2' }}
            />
            <Autocomplete
              multiple
              options={categories}
              getOptionLabel={(option) => option}
              value={formData.categories}
              onChange={handleCategoryChange}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Categories" placeholder="Select Categories" fullWidth />
              )}
              style={{ gridColumn: 'span 2' }}
            />
            <Autocomplete
              multiple
              options={ingredients}
              getOptionLabel={(option) => option}
              value={formData.ingredients}
              onChange={handleIngredientChange}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Ingredients" placeholder="Select Ingredients" fullWidth />
              )}
              style={{ gridColumn: 'span 2' }}
            />
            <FormControl component="fieldset" style={{ gridColumn: 'span 2' }}>
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                row
                aria-label="type"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
              >
                <FormControlLabel value="Veg" control={<Radio />} label="Veg" />
                <FormControlLabel value="Non-Veg" control={<Radio />} label="Non-Veg" />
              </RadioGroup>
            </FormControl>
            <div
              {...getRootProps()}
              style={{ gridColumn: 'span 2', border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography>Drop the files here...</Typography>
              ) : (
                <Typography>Drag 'n' drop an image here, or click to select an image</Typography>
              )}
            </div>
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px', gridColumn: 'span 2' }}
              />
            )}
            <Box display="flex" justifyContent="flex-end" style={{ gridColumn: 'span 2', gap: '8px' }}>
              <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {editMode ? 'Update' : 'Add'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name of the Dish</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              {/* <TableCell>Description</TableCell> */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.photo ? (
                    <img src={item.photo} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  ) : (
                    'No photo'
                  )}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.type}</TableCell>
                {/* <TableCell>{item.description}</TableCell> */}
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditButtonClick(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteButtonClick(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Menu;
