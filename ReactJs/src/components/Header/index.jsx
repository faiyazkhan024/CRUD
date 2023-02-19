import { Box, AppBar, Toolbar, Typography } from "@material-ui/core";

import styles from "./styles";

const Header = () => {
  const classes = styles();

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CRUDS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
