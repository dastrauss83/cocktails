import { useStyles } from "./useStyles";
import { Typography } from "@material-ui/core";

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Something here for the footer to make sense
      </Typography>
    </footer>
  );
};
