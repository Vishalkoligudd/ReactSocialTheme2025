import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    FormControlLabel,
    Switch,
    Paper,
  } from "@mui/material";
  import { useForm } from "react-hook-form";
  import useFetch from "../customHook/useFetch";
  import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  
  const CreatePost = () => {
    const { register, handleSubmit, reset } = useForm();
    const { fetchData, loading, error } = useFetch();
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState([]);
  
    const handleImageChange = (e) => {
      setSelectedImages(Array.from(e.target.files));
    };
  
    const onSubmit = async (data) => {
      const formData = new FormData();
  
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      selectedImages.forEach((img) => {
        formData.append("images", img);
      });
  
      const response = await fetchData(
        "POST",
        "http://localhost:5000/myApp/posts/create",
        formData
      );
  
      if (response?.status === 200) {
        alert("Post created successfully!");
        reset();
        navigate("/dashboard");
      }
    };
  
    return (
      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 5,
          p: 4,
          bgcolor: "#1e1e1e", // Dark surface
          color: "#fff",       // Light text
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ color: "#f0f0f0" }}>
          Create Beautiful Post
        </Typography>
  
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Stack spacing={3}>
            <TextField
              label="Title"
              {...register("title", { required: "Title is required" })}
              fullWidth
            />
  
            <TextField
              label="Description"
              {...register("description", { required: "Description is required" })}
              multiline
              rows={4}
              fullWidth
            />
  
            <TextField
              type="file"
              onChange={handleImageChange}
              fullWidth
            />
            
            {selectedImages.length > 0 && (
  <Box
    sx={{
      display: "flex",
      gap: 2,
      flexWrap: "wrap",
      mt: 2,
    }}
  >
    {selectedImages.map((file, index) => (
      <Box
        key={index}
        sx={{
          width: 100,
          height: 100,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #444",
        }}
      >
        <img
          src={URL.createObjectURL(file)}
          alt={`preview-${index}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    ))}
  </Box>
)}

  
            <TextField
              label="Tag"
              {...register("tag")}
              fullWidth
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
  
            <FormControlLabel
              control={<Switch {...register("private")} color="primary" />}
              label="Private Post"
              sx={{ color: "#ccc" }}
            />
  
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Posting..." : "Create Post"}
            </Button>
  
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        </form>
      </Paper>
    );
  };
  
  export default CreatePost;
  