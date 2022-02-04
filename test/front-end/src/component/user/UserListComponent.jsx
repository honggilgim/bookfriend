import React, { Component } from 'react';
import ApiService from "../../ApiService";

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

class UserListComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      users: [],
      message: null
    }
  }

  componentDidMount(){
    this.reloadUserList();
  }

  reloadUserList = () => {
    ApiService.fetchUsers()
      .then( res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.log('reloadUserList() Error!', err);
      })
  }

  deleteUser = (uid) => {
    ApiService.deleteUser(uid)
      .then( res => {
        this.setState({
          message: 'User Deleted Successfully.'
        });
        this.setState({
          users: this.state.users.filter( user =>
            user.uid !== uid)
          });
        })
      .catch(err => {
        console.log('deleteUser() Error!', err);
      })
  }
  
  editUser = (uid) => {
    window.localStorage.setItem("uid", uid);
    this.props.history.push('/edit-user');
  }

  addUser = () => {
    window.localStorage.removeItem("uid");
    this.props.history.push('/add-user');
  }

  render(){

    return(
      <div>
        <Typography variant="h4" style={style}>User List</Typography>
        <Button variant="contained" color="primary" onClick={this.addUser}> Add User </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>uid</TableCell>
              <TableCell>email</TableCell>
              <TableCell align="right">pw</TableCell>
              <TableCell align="right">nick</TableCell>
              <TableCell align="right">addr</TableCell>
              <TableCell align="right">total_point</TableCell>
              <TableCell align="right">grade</TableCell>
              <TableCell align="right">edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map( user => 
              <TableRow key={user.uid}>
                <TableCell component="th" scope="user">{user.uid}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.pw}</TableCell>
                <TableCell align="right">{user.nick}</TableCell>
                <TableCell align="right">{user.addr}</TableCell>
                <TableCell align="right">{user.total_point}</TableCell>
                <TableCell align="right">{user.grade}</TableCell>
                <TableCell align="right" onClick={()=> this.editUser(user.id)}>
                  <CreateIcon />
                </TableCell>
                <TableCell align="right" onClick={()=> this.deleteUser(user.id)}>
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
    
  }

}

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default UserListComponent;