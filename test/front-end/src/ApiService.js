import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/user";

class ApiService {

  fetchUsers(){
    return axios.get(USER_API_BASE_URL);
  }

  fetchUserByID(uid){
    return axios.get(USER_API_BASE_URL + '/' + uid);
  }

  deleteUser(uid){
    return axios.delete(USER_API_BASE_URL + '/' + uid);
  }
  
  addUser(user){
    return axios.post(USER_API_BASE_URL, user);
  }

  editUser(user){
    return axios.put(USER_API_BASE_URL + '/' + user.uid, user)
  }

}

export default new ApiService();