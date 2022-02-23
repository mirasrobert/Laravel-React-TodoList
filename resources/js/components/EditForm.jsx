import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTodo, editTodo } from "../features/todoSlice";
import { toast } from "react-toastify";

const EditForm = () => {
    const dispatch = useDispatch();

    const params = useParams();

    const navigate = useNavigate();

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

    const { todo, isLoading, isError, errors } = useSelector(
        (state) => state.todos
    );

    useEffect(() => {
        dispatch(getTodo(params.id)); // Get One Todo
    }, [params.id]); // Get One Todo if ID changes

    useEffect(() => {
        if (todo) {
            setFormData((prev) => ({
                ...prev,
                text: todo.text,
            }));
        }
    }, [todo]);

    useEffect(() => {
        if (isError && errors) {
            errors.text.forEach((msg) => {
                toast.error(msg);
            });
        }
    }, [isError]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const data = {
            id: todo.id,
            formData: {
                text,
            },
        };

        dispatch(editTodo(data));

        toast.success("Todo Updated");

        navigate("/");
    };

    return (
        <>
            <Link to={`/`}>
                <button className="btn btn-secondary mb-3">Back</button>
            </Link>

            <form onSubmit={onSubmitHandler}>
                <div className="">
                    <input
                        className="form-control"
                        type="text"
                        name="text"
                        placeholder="Edit Todo..."
                        aria-label="Edit Todo..."
                        value={text}
                        onChange={onChange}
                    />

                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary" type="submit">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditForm;
