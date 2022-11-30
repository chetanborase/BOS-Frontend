import axios from 'axios';
import authHeader, { getAuth } from './Auth';
import { BASEURL } from '../constant/appConstant';

class UserService {
  getUserDetails(id) {
    console.log("id :",id);
    return axios.get(BASEURL + '/user/' + id, { headers: authHeader() })
  }

  updateUserDetails(id,data) {
    console.log(id,data);
    return axios.put(BASEURL + '/user/' + id,  data, { headers: authHeader() })
  }

}

export default UserService;
