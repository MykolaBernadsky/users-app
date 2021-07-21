import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsersList} from "../actions";
import { useHistory } from 'react-router';
import {Button, Box, Grid}from '@material-ui/core';
import BasicTable from "./BasicTable";

const Users = () =>  {
  const dispatch = useDispatch();
  const list = useSelector(state => state.list);
  const history = useHistory();

  useEffect(() => {
   dispatch(getUsersList());
  }, []);


  const redirectToPosts = () => {
    history.push('/posts')
  }

  return (
    <>
      <Grid justifyContent={'center'} container>
        <Grid>
          <BasicTable title={'All users'} rows={list} />
        </Grid>
      </Grid>
      <Grid component={Box} pt={1} container justifyContent={'center'}>
        <Button variant="contained" color="primary" size={'small'} onClick={() => redirectToPosts()}>Posts</Button>
      </Grid>
    </>
  );
}

export default Users;