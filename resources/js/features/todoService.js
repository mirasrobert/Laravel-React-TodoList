import axios from "axios";

const API_URL = "/api/todos";

const getAllTodos = async () => {
    const { data } = await axios.get(API_URL);

    return data; // Using API Resource
};

const addTodo = async (formData) => {
    const { data } = await axios.post(API_URL, formData);

    return data; // Using API Resource
};

const editTodo = async (params) => {
    const { data } = await axios.put(
        `${API_URL}/${params.id}`,
        params.formData
    );

    return data; // Using API Resource
};

const getTodo = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);

    return data; // Return ID
};

const removeTodo = async (id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`);

    return data; // Return ID
};

const todos = {
    getAllTodos,
    addTodo,
    getTodo,
    removeTodo,
    editTodo,
};

export default todos;
