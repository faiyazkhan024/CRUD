import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
} from "@material-ui/core";

import { useItem } from "../../hooks/useItem";
import { updateItem, createItem } from "../../services";
import styles from "./styles";

const Form = () => {
  const classes = styles();
  const { dispatch, editing, setEditing } = useItem();

  const formInputs = [
    {
      value: editing.name ?? "",
      id: "name",
      type: "text",
      name: "name",
      label: "Name",
    },
    {
      value: editing.mobile ?? "",
      id: "mobile",
      type: "number",
      name: "mobile",
      label: "Mobile Number",
    },
    {
      value: editing.email ?? "",
      id: "email",
      type: "email",
      name: "email",
      label: "Email",
    },
    {
      value: editing.hobbies?.join(",") ?? "",
      id: "hobbies",
      type: "text",
      name: "hobbies",
      label: "Hobbies",
    },
  ];

  const initialValues = formInputs
    .map((i) => ({ [i.id]: i.value }))
    .reduce((pre, next) => ({ ...pre, ...next }));

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (JSON.stringify(values) === JSON.stringify(initialValues)) return;

      const newItem = {
        ...values,
        hobbies: values.hobbies.split(","),
      };

      if (!editing._id) {
        const createdItem = await createItem(newItem);
        dispatch({ type: "Create", payload: createdItem });
        formik.setValues(initialValues);
      }

      if (editing._id) {
        const updatedItem = await updateItem({ ...editing, ...newItem });
        dispatch({
          type: "Update",
          payload: updatedItem,
        });
        setEditing({});
      }
    },
  });

  return (
    <Container component="main">
      <CssBaseline />
      <Box className={classes.paper}>
        <Typography component="h1" variant="h5">
          {editing.name ? "Update Item" : "Create New Item"}
        </Typography>

        <Box
          component="form"
          className={classes.form}
          onSubmit={formik.handleSubmit}
        >
          <Box className={classes.formInputs}>
            {formInputs.map((formInput) => (
              <TextField
                key={formInput.id}
                required
                fullWidth
                margin="normal"
                id={formInput.id}
                variant="outlined"
                name={formInput.name}
                label={formInput.label}
                className={classes.textField}
                onChange={formik.handleChange}
                value={formik.values[formInput.id]}
                error={
                  formik.touched[formInput.name] &&
                  Boolean(formik.errors[formInput.name])
                }
                helperText={
                  formik.touched[formInput.name] &&
                  formik.errors[formInput.name]
                }
              />
            ))}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {editing.name ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
