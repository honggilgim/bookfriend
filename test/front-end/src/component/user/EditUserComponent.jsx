import React, { Component } from 'react';
import ApiService from "../../ApiService";

class EditUserComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      uid: '',
      email: '',
      pw: '',
      nick: '',
      addr: '',
      total_point: '',
      grade : '',
      message : null
    }
  }

  componentDidMount(){
    this.loadUser();
  }

  loadUser = () => {
    ApiService.fetchUserByID(window.localStorage.getItem("uid"))
      .then( res => {
        let user = res.data;
        this.setState({
          id: user.uid,
          email: user.email,
          nick: user.nick,
          addr: user.addr,
          total_point: user.total_point,
          grade : user.grade
        })
      })
      .catch(err => {
        console.log('loadUser() 에러', err);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      email: this.state.email,
      pw: this.state.pw,
      nick: this.state.nick,
      addr: this.state.addr
    }

    ApiService.editUser(user)
      .then( res => {
        this.setState({
          message : user.email + '님 정보가 수정되었습니다.'
        })
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log('saveUser() 에러', err);
      })
  }

  render(){
    return(
      <div>
        <h2>Edit User</h2>
        <form>

          <div>
            <label>email:</label>
            <input placeholder="email" name="email" value={this.state.email} 
                onChange={this.onChange} />
          </div>

          <div>
            <label>nick:</label>
            <input placeholder="nick" name="nick" value={this.state.lastName} 
                onChange={this.onChange} />
          </div>

          <div>
            <label>addr:</label>
            <input placeholder="addr" name="addr" value={this.state.addr} 
                onChange={this.onChange} />
          </div>

          <div>
            <label>total_point:</label>
            <input placeholder="total_point" name="total_point" value={this.state.total_point} 
                onChange={this.onChange} />
          </div>

          <div>
            <label>grade:</label>
            <input placeholder="grade" name="grade" value={this.state.grade} 
                onChange={this.onChange} />
          </div>
          <button onClick={this.saveUser}>Save</button>

        </form>
      </div>
    );
  }
}

export default EditUserComponent;