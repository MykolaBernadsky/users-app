import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPost, getPostDetails, getUsersPosts} from "../actions";
import {useHistory} from "react-router";
import BasicTable from "./BasicTable";
import {Grid, TextField, Button} from "@material-ui/core";
import types from "../types";
import Dialog from "./Dialog";
import {useForm} from "react-hook-form";

const Posts = () =>  {
  const list = useSelector(state => state.list);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [userId, setUserId] = useState();

  useEffect(() => {
    list.map(item => {
      dispatch(getUsersPosts(item.id));
    });
  }, [])

  const toggleModal = (id) => {
    setUserId(id);
    setOpen(prev => !prev);
  }

  const handleClick = data => {
    dispatch({type: types.SET_ACTIVE_POST, payload: data});
    dispatch(getPostDetails(data.id));

    history.push(`/posts/${data.id}`);
  }

  const submitForm = data => {
    const newData = Object.assign({}, data, { userId });

    dispatch(createPost(newData));
    setOpen(false);
  }

  return (
    <>
      <Grid justifyContent={'center'} container>
        <Grid>
          <BasicTable
            title={'All posts'}
            rows={list}
            posts={true}
            handleClick={handleClick}
            openModal={toggleModal}
          />
        </Grid>
      </Grid>
      <Dialog title={'Add new Post'} open={open} close={toggleModal}>
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

export default Posts;