import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Typography, Box, List, ListItem, ListItemText} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 650
  }
});


export default function BasicTable({ title, rows, posts = false, handleClick, openModal }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell > <Typography variant={'h5'}>{title}</Typography> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name + row.id}>
              <TableCell component="th" scope="row">

                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography variant={'body1'}>
                    {row.name}
                  </Typography>
                  {openModal && <Button onClick={() => openModal(row.id)}> Add new</Button>}
                </Box>
                 <Box>
                   <List >
                     {posts && row.posts && row.posts.filter(item => item.userId === row.id).map(item => (
                       <ListItem>
                         <ListItemText
                           primary={item.title}
                         />
                         <Button
                           variant="contained"
                           color="primary"
                           onClick={() => handleClick(item)}
                           size={'small'}
                         >
                           Details
                         </Button>
                       </ListItem>
                     ))}
                   </List>
                 </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}