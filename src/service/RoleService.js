import axios from 'axios';
import authHeader from './Auth';
import {BASEURL} from '../constant/appConstant'

class RoleService {
    getRoles() {
        return axios.get(BASEURL + '/role', null, { headers: authHeader() });
    }
}

export default RoleService;