import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import useFetch from "../customHook/useFetch";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { fetchData, loading, error, data } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async(userdata) => {
    const result= await fetchData("POST", "http://localhost:5000/myApp/user/signup", userdata);

    if (result?.status === 200) {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
        color: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>
      {loading && <div>Loading....</div>}
      {error && (
        <Typography color="error">
          {error.message || "Signup failed"}
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="User Name"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Date of Birth"
            type="date"
            {...register("dob", { required: "DOB is required" })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob?.message}
            fullWidth
          />
          <TextField
            label="Phone Number"
            type="text"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be exactly 10 digits",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <MuiLink
              component={Link}
              to="/"
              underline="hover"
              color="primary"
            >
              Login
            </MuiLink>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUp;
