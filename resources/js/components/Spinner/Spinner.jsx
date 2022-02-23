import React from "react";

import Loader from "./Loader.gif";

const Spinner = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <img className="img-fluid" src={Loader} alt="Loading..." />
            </div>
        </>
    );
};

export default Spinner;
