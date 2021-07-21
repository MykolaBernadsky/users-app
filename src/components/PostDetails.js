import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
  Grid,
  CardContent,
  Typography,
  Card,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText, CardActions, Button, TextField
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import {useHistory} from "react-router";
import {deletePost, getPostDetails, updatePost} from "../actions";
import Dialog from "./Dialog";
import {useForm} from "react-hook-form";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));


const PostDetails = () =>  {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const postDetails = useSelector(state => state.postDetails, shallowEqual);
  const activePost = useSelector(state => state.activePost, shallowEqual);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();


  const toggleModal = () => {
    setOpen(prev => !prev);
  }

  useEffect(() => {
    console.log(activePost);
  }, [activePost])

  const handleDeletePost = (activePost) => {
    const payload = { id: activePost.id, userId: activePost.userId };
    dispatch(deletePost(payload));

    history.push('/posts');
  }



  const submitForm = data => {
    dispatch(updatePost(activePost.id, data));

    setOpen(false);
  }

  return (
    <>
      <Grid component={Box} pt={5} justifyContent={'center'} container>
        <Card className={classes.root}>
          <CardContent>

            <Typography variant="body2" component="p">
              {activePost.title}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary" size="small" onClick={() => toggleModal()}>Edit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={() => handleDeletePost(activePost)}>Delete</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid component={Box} pt={5} justifyContent={'center'} container>
        <List className={classes.list}>
        {postDetails.map(item => (
          <ListItem key={item.email}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.email} secondary={item.body} />
          </ListItem>
        ))}
      </List>
      </Grid>

      <Dialog title={'Edit post'} open={open} close={toggleModal}>
        <form onSubmit={handleSubmit(submitForm)}>
          <TextField
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="post"
            label="New post"
            name="post"
            size={"small"}
            {...register('post')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size={"small"}

          >
            submit
          </Button>
        </form>
      </Dialog>
    </>
  );
}

export default PostDetails;