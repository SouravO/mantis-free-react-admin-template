import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const Settings = () => {
  const [logo, setLogo] = useState(null);
  const [media, setMedia] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
    setLogoPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
    setMediaPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(`${type} uploaded successfully:`, response.data.filePath);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (logo) {
      handleUpload(logo, 'Logo');
    }
    if (media) {
      handleUpload(media, 'Media');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Box mb={2}>
          <Typography variant="h6">Upload Logo</Typography>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
          {logoPreview && <img src={logoPreview} alt="Logo Preview" width="100" />}
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Upload Image/Video</Typography>
          <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
          {mediaPreview && (
            media.type.startsWith('image/') ? (
              <img src={mediaPreview} alt="Media Preview" width="100" />
            ) : (
              <video src={mediaPreview} controls width="100" />
            )
          )}
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
    </Container>
  );
};

export default Settings;
