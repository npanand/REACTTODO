import axios from 'axios';
export const logIn = async (values: any) => {
      return await axios.post("http://localhost:4000/api/users/login", values);
}

export const signUp= async (values: any) => {
      return await axios.post("http://localhost:4000/api/users", values);
}

