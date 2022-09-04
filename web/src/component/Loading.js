import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Loading() {
    const style = {
        overflowY: "hidden"
    }
    return (
        <>
        <div style={style} className="loader-flex">
        <ScaleLoader color="#8C9199" size={150} />
        </div>
        </>
    );
    
}