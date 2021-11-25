// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.accessToken)
//     return { Authorization: 'Bearer ' + user.accessToken }
//     // return { 'VanDong-access-token': user.accessToken }
//   else
//     return {}
// }

import axios from "axios";

const setAuthToken = (token) => {
  if (token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else
    delete axios.defaults.headers.common['Authorization']
}

export default setAuthToken