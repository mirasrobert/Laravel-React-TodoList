import { useEffect } from "react";
import { Link } from "react-router-dom";
import AddTodo from "./AddTodo.jsx";
import TodoItem from "./TodoItem";
import Spinner from "./Spinner/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { getAllTodos, resetErrors } from "../features/todoSlice";

import { toast } from "react-toastify";

const Home = () => {
    const dispatch = useDispatch();

    const { todos, isLoading, isError, errors } = useSelector(
        (state) => state.todos
    );

    useEffect(() => {
        if (isError && errors) {
            errors.text.forEach((msg) => {
                toast.error(msg);
            });
        }

        dispatch(getAllTodos());
    }, [isError]);

    return (
        <>
            <div className="card bg-dark py-3">
                <div className="card-header">
                    <h4 className="text-white text-center">
                        What's the Plan for Today?
                    </h4>

                    <AddTodo />
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            {todos.map((todo) => (
                                <TodoItem todo={todo} key={todo.id} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
