import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authActions";
import { useNavigate } from "react-router";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function CustomAppBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth.userInfo);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddMovie = () => {
    navigate("/add-movie");
  };

  return (
    <HideOnScroll {...props}>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Movie App
          </Typography>

          <Typography sx={{ mr: 2 }}>Hello, {user?.name}</Typography>
          {user.role === "admin" && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleAddMovie}
              sx={{ mr: 2 }}
            >
              Add Movie
            </Button>
          )}

          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
