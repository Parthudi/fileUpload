import React, {useState} from "react";
import Masonary from "react-masonry-css";
import CollectionItem from "../CollectionItem/CollectionItem";
import {Container} from "@material-ui/core";
import "./photos.css";

const Photos = () => {
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("photos"));
    
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : 'none' }}> {error} </div>
        )

    const breakpoints = {
        default: 5,
        1500: 10,
        1300: 8,
        1100: 3,
        700: 2,
        500: 1
    }

    return(
        <Container>
            {showError()}
            <Masonary 
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                    {user && user.map((photo) => {
                        return <CollectionItem imag={`http://localhost:4000/api/upload/fetch/${photo._id}`}/>
                    })}
             </Masonary> 
        </Container>
    )   
}

export default Photos;