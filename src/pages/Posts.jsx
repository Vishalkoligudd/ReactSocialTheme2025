import { useEffect } from "react";
import useFetch from "../customHook/useFetch";
import { Box, CircularProgress, Typography, List, ListItem, Paper } from "@mui/material";

const Posts = () => {
  const { fetchData, loading, error, data } = useFetch();

  useEffect(() => {
    fetchData("GET", "http://localhost:5000/myApp/posts/viewAll");
  }, []);

  const posts = data?.data?.data || [];

  return (
    <Box sx={{ p: 3 }}>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" mt={2}>
          {error}
        </Typography>
      )}

      {posts.length > 0 ? (
        <List>
          {posts.map((post, index) => (
            <Paper key={index} elevation={3} sx={{ my: 1, p: 2, bgcolor: "#1e1e1e", color: "#fff" }}>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.description}</Typography>
              <Typography variant="body2">{post.tag}</Typography>
            </Paper>
          ))}
        </List>
      ) : (
        !loading && (
          <Typography align="center" color="text.secondary">
            No posts available.
          </Typography>
        )
      )}
    </Box>
  );
};

export default Posts;
