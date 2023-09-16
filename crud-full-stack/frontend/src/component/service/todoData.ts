import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization": "Bearer " + sessionStorage.getItem("jwt")
  }
};

export const getTodoData = async () => {
  return await axios.get("http://localhost:4000/api/todo", config);
}
export const AddTodoData = async (values: any) => {
  return await axios.post("http://localhost:4000/api/todo",JSON.stringify(values), config);
}
export const updateTodoData = async (values: any) => {
  return await axios.put("http://localhost:4000/api/todo",JSON.stringify(values), config);
}
export const deleteTodoData = async (values: any) => {
  return await axios.delete("http://localhost:4000/api/todo/" + values, config);
}
