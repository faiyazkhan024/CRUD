import { Fragment, useState, useContext, useEffect } from "react";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import {
  List as MaterialList,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  ListItemIcon,
  Chip,
  Button,
} from "@material-ui/core";

import { getItems, mailItems, deleteItem } from "../../services";

import styles from "./styles";
import { useItem } from "../../hooks/useItem";

const List = () => {
  const classes = styles();
  const [checked, setChecked] = useState([]);
  const [isSending, setIsSending] = useState();
  const { items, dispatch, setEditing } = useItem();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const items = await getItems();
        dispatch({ type: "Get", payload: items });
      } catch (error) {}
    };
    getAllItems();
  }, [dispatch]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const onSend = async () => {
    setIsSending(true);
    try {
      const message = await mailItems(checked);
      alert(message);
      setChecked([]);
      setIsSending(false);
    } catch (error) {
      console.log(error);
      setChecked([]);
      setIsSending(false);
    }
  };

  const onDeleteItem = (item) => async () => {
    try {
      const message = await deleteItem(item);
      alert(message);
      dispatch({ type: "Delete", payload: item });
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (item) => () => setEditing(item);

  return (
    <MaterialList className={classes.root}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSending || checked.length === 0}
        onClick={onSend}
        className={classes.submit}
      >
        {!isSending ? "Send" : "Sending..."}
      </Button>

      {items.map((item) => (
        <Fragment key={item._id}>
          <ListItem role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                onClick={handleToggle(item)}
                edge="start"
                checked={checked.indexOf(item) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-label": item._id }}
              />
            </ListItemIcon>

            <div>
              <ListItemText id={item._id} primary={item.name} />
              <ListItemText id={item._id} primary={item.mobile} />
              <ListItemText id={item._id} primary={item.email} />
            </div>

            <ListItemSecondaryAction>
              <IconButton
                className={classes.edit}
                onClick={onEdit(item)}
                edge="end"
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>

              <IconButton
                className={classes.delete}
                onClick={onDeleteItem(item)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              {item.hobbies.map((hobby, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={hobby}
                  className={classes.chip}
                />
              ))}
            </ListItem>
          </List>
        </Fragment>
      ))}
    </MaterialList>
  );
};

export default List;
