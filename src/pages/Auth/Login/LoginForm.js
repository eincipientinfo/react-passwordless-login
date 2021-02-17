import React from "react";
import { Grid, Input, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { func, string, object } from "prop-types";
const styles = {
  root: {},
  input: {
    width: "100%",
    padding: "0 8px",
    borderRadius: 2,
    border: "1px solid rgba(0, 0, 0, 0.32)",
  },
  buttonContainer: {
    display: "flex",
    margin: "8px 0",
    flexDirection: "row-reverse",
  },
};

const LoginForm = ({
  classes,
  value,
  inputHandler,
  button,
  submithandler,
  name,
  placeholder,
}) => {
  return (
    <Grid className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Input
            disableUnderline
            className={classes.input}
            value={value}
            name={name}
            onChange={(e) => inputHandler(e.target?.value)}
            placeholder={placeholder}
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          {button && (
            <Button variant="contained" color="primary" onClick={submithandler}>
              {button}
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

LoginForm.propTypes = {
  classes: object.isRequired,
  value: string.isRequired,
  inputHandler: func.isRequired,
  button: string.isRequired,
  placeholder: string.isRequired,
  submithandler: func.isRequired,
  name: string.isRequired,
};

export default withStyles(styles)(LoginForm);
