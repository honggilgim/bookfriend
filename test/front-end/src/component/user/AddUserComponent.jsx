import React, { Component } from 'react';
import ApiService from "../../ApiService";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddUserComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
      pw: '',
      nick: '',
      addr: '',
      message: null
    }

  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      email: this.state.email,
      pw: this.state.pw,
      nick: this.state.nick,
      addr: this.state.addr,
    }

    ApiService.addUser(user)
    .then( res => {
        this.setState({
          message: user.email + '님이 성공적으로 등록되었습니다.'
        })
        console.log(this.state.message);
        this.props.history.push('/users');
    })
    .catch( err => {
      console.log('saveUser() 에러', err);
    });

  }

  render(){
    return(
      <div>
        <Typography variant="h4" style={style}>회원가입</Typography>
        <form style={formContainer}>

            <TextField placeholder="이메일을 입력하세요." name="email" 
              fullWidth margin="normal" value={this.state.email} onChange={this.onChange} />
         
            <TextField placeholder="패스워드를 입력하세요." name="pw" 
              fullWidth margin="normal" value={this.state.uid} onChange={this.onChange} />

            <TextField placeholder="닉네임을 입력하세요" name="nick" 
              fullWidth margin="normal" value={this.state.nick} onChange={this.onChange} />

            <TextField placeholder="주소를 입력하세요." name="addr" 
              fullWidth margin="normal" value={this.state.addr} onChange={this.onChange} />

          <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

        </form>
      </div>
    );
  }
}

const formContainer = {
  display: 'flex',
  flexFlow: 'row wrap'
}

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default AddUserComponent;
