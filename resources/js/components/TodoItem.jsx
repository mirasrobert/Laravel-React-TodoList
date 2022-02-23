import { Link } from "react-router-dom";

import { removeTodo, getTodo } from "../features/todoSlice";

const TodoItem = ({ todo }) => {
    return (
        <>
            <div className="todo-item bg-info d-flex justify-content-between align-items-center px-3 py-2 mb-3">
                <div className="todo-text text-white">{todo.text}</div>
                <div className="todo-action d-flex">
                    <Link to={`/todo/${todo.id}/edit`}>
                        <button className="btn btn-outline-light me-2">
                            <i className="fas fa-edit"></i>
                        </button>
                    </Link>

                    <button
                        className="btn btn-outline-light"
                        onClick={(e) => dispatch(removeTodo(todo.id))}
                    >
                        <i className="fas fa-times-circle"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default TodoItem;
