import {jwtDecode} from "jwt-decode"

const FromToken = () => {
   const token = localStorage.getItem('token')
   if (token) {
      const userDecode = jwtDecode(token)
      const { _id, userName, name, email, phone, roles } = userDecode
      
      return {_id, userName, name, email, phone, roles }

   }
   return { roles: "user",name:"" }

}
export default FromToken