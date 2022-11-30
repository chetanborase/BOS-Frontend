import axios from 'axios';
import authHeader from './Auth';
import {BASEURL} from '../constant/appConstant'

class AdminService {
    getEmployeeById(id) {
        return axios.get(BASEURL + '/employee/' + id,  { headers: authHeader() });
    }

    deleteEmployeeById(id) {
        return axios.delete(BASEURL + '/employee/' +id,{ headers: authHeader() });
    }

    searchEmployee(search, page) {
        let params = search ? `?key=${search}` : ''

        if (Number(page)) {
            if (params.length > 1) {
                params = params + '&' + "page=" + page
            }
            else {
                params = "?page=" + page
            }
        }

        const url =BASEURL + '/employee' + params
        console.log("param is : ",search,page);
        console.log("URL is : ",url);
        return axios.get(url, { headers: authHeader() });

    }

    createEmployee(data) {
        return axios.post(BASEURL + '/employee', data,
            { headers: authHeader() },);
    }

    updateEmployee(id,data) {
        return axios.put(BASEURL + '/employee/' + id, data, { headers: authHeader() });
    }
}

export default AdminService;
