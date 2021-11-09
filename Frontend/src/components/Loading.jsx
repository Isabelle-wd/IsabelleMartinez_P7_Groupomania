import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../App.css";


const Loading = () => {
    return (
        <div align="center">
            <Loader
                type="Watch"
                color="rgba(253,45,1,1)"
                height={300}
                width={300}
                timeout={3000} //3 secs
            />
        </div>
    )
}

export default Loading