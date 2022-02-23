import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoService from "./todoService";

// Get All Todos
export const getAllTodos = createAsyncThunk(
    "todos/all",
    async (_, thunkAPI) => {
        try {
            return await todoService.getAllTodos();
        } catch (error) {
            const message =
                error.response &&
                error.response.data &&
                error.response.data.errors
                    ? error.response.data.errors
                    : error.errors;

            return thunkAPI.rejectWithValue(message); // Return
        }
    }
);

export const getTodo = createAsyncThunk(
    "todos/getone",
    async (id, thunkAPI) => {
        try {
            return await todoService.getTodo(id);
        } catch (error) {
            const message =
                error.response &&
                error.response.data &&
                error.response.data.errors
                    ? error.response.data.errors
                    : error.errors;

            return thunkAPI.rejectWithValue(message); // Return
        }
    }
);

export const addTodo = createAsyncThunk(
    "todos/add",
    async (formData, thunkAPI) => {
        try {
            return await todoService.addTodo(formData);
        } catch (err) {
            console.log(err.response.data.errors);

            const errors = err.response.data.errors;

            const message = err.response && errors ? errors : "Server Error";

            return thunkAPI.rejectWithValue(message); // Return
        }
    }
);

export const removeTodo = createAsyncThunk(
    "todos/remove",
    async (id, thunkAPI) => {
        try {
            return await todoService.removeTodo(id);
        } catch (err) {
            console.log(err.response.data.errors);

            const errors = err.response.data.errors;

            const message = err.response && errors ? errors : "Server Error";

            return thunkAPI.rejectWithValue(message); // Return
        }
    }
);

export const editTodo = createAsyncThunk(
    "todos/edit",
    async (data, thunkAPI) => {
        try {
            return await todoService.editTodo(data);
        } catch (err) {
            console.log(err.response.data.errors);

            const errors = err.response.data.errors;

            const message = err.response && errors ? errors : "Server Error";

            return thunkAPI.rejectWithValue(message); // Return
        }
    }
);

const initialState = {
    todos: [],
    todo: null,
    isLoading: true,
    errors: null,
    isError: false,
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        reset: (state) => {
            state.todos = [];
            state.todo = null;
        },
        resetErrors: (state) => {
            state.isError = false;
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.todos = action.payload.data;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getAllTodos.rejected, (state, action) => {
                state.errors = action.payload;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodo.fulfilled, (state, action) => {
                state.todo = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getTodo.rejected, (state, action) => {
                state.errors = action.payload;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(addTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
                state.isError = true;
            })
            .addCase(editTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                state.todos = state.todos.map((todo) =>
                    todo.id == action.payload.id ? action.payload : todo
                );
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(editTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
                state.isError = true;
            })
            .addCase(removeTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.todos = state.todos.filter(
                    (todo) => todo.id != action.payload.id
                );
            })
            .addCase(removeTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
                state.isError = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { reset, resetErrors } = todoSlice.actions;
export default todoSlice.reducer;
