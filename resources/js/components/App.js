import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import EditForm from "./EditForm.jsx";

// Toast
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <Router>
            <div className="container">
                <div className="row py-5 d-flex justify-content-center">
                    <div className="col-md-6 col-sm-12">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/todo/:id/edit"
                                element={<EditForm />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
