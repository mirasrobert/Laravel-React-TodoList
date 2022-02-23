import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

const AddTodo = () => {
    const [formData, setFormData] = useState({
        text: "",
    });

    const { text } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const dispatch = useDispatch();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(addTodo({ text }));

        setFormData({
            text: "",
        });
    };

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div className="d-flex">
                    <input
                        className="form-control"
                        type="text"
                        name="text"
                        placeholder="Add Todo..."
                        aria-label="Add Todo..."
                        value={text}
                        onChange={onChange}
                    />
                    <button className="btn btn-success" type="submit">
                        Add
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddTodo;
