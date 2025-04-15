import { useForm } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useFetch from "../customHook/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { fetchData, loading, error, data } = useFetch();
  const navigate = useNavigate();

  const onSubmit = async (loginData) => {
    const result = await fetchData(
      "POST",
      "http://localhost:5000/myApp/user/login", // ✅ Make sure this is the login route
      loginData
    );
//37d0kvcg
    if (result?.status === 200) {
    localStorage.setItem('token',result.data?.user1?.token)
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 8,
        p: 4,
        border: "1px solid #444",
        borderRadius: 2,
        boxShadow: 3,
        color: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Phone Number"
            type="text"
            {...register("phoneNumber", { required: true })}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            {...register("password", { required: true })}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <MuiLink component={Link} to="/signup" underline="hover">
              Sign Up
            </MuiLink>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
