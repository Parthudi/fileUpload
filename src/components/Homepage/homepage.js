import React, {useState, useRef} from "react";
import "./homepage.css";
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import {addItem} from "../CartItems";
import Button from '@material-ui/core/Button';
import Photos from "../Photos/photos";
import { StylesProvider } from "@material-ui/styles";

const HomePage = () => {
    const [open, setOpen] = useState(false);
    const [fileinputstate, ] = useState("");
    const [fileresource, setFileResource] = useState("");
    const [photu, setPhotu] = useState(false);
    const [video, setVideo] = useState(false);
    const [file, setFile] = useState("");
    const [disablebutton, setDisableButton] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const vidRef = useRef(null);
    const handlePlayVideo = () => {
      vidRef.current.play();
    }

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
        const fileData = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onload = (e) => {
            setDisableButton(false);
            setFileResource(reader.result);
        }
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        try{    
            const formData = new FormData();
            formData.append("photo", file);
            setLoading(true);
            const Route = video ? `http://localhost:4000/api/upload/video` : `http://localhost:4000/api/upload`;
            const response = await fetch(Route,{
                method: "POST",
                body: formData
              }).then(response => response.json());
            
            setLoading(false);
            if(response && response.message){
                addItem({_id: response.user._id});
                setOpen(false);
            }
        }catch(error){
            console.log(error);
            setLoading(false);
            setError(error.message)
        }
    }

    const modalData = () => {
        return(
            <div className="modalStyle">
            {loading ? <CircularProgress color="secondary" /> : null}
                {showError()}
                <form>
                    <div className="form-group">
                        <label className="text-muted"> File Upload </label>
                        <input type='file' className="form-control" name='file' onChange={(e) => handleOnChange(e)} value={fileinputstate} />
                    </div>

                    <button type="submit" onClick={(e) => handleOnSubmit(e)} disabled={disablebutton} > Upload Pic </button>
                </form>

                {fileresource && (
                    photu ? (
                        <img className="imag" src={fileresource} alt="file damaged" style={{height:"400px", width:"380px"}} />
                    ) : 
                    video ? ( <video ref={vidRef} style={{height:"400px", width:"380px"}}>
                        <source src={fileresource} type="video/mp4" style={{height:"400px", width:"380px"}}/>
                    </video>
                    ) : null )}
            </div>
        )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : 'none' }}> {error} </div>
        )

    const setUploadOptionsForPhoto = () => {
        return(
            setOpen(true),
            setFileResource(""),
            setDisableButton(true),
            setPhotu(true)
        )
    }

    const setUploadOptionsForVideo = () => {
        return(
            setOpen(true),
            setFileResource(""),
            setDisableButton(true),
            setVideo(true)
        )
    }

    return(
        <div>
            <div className="header">
                <Button variant="outlined"  color="primary" onClick={() => setUploadOptionsForVideo()}> Video Upload </Button>
                {/* <Button variant="outlined"  color="secondary" onClick={() => setUploadOptionsForPhoto()}> Pic Upload </Button> */}
            </div>
            
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                    {modalData()}
            </Modal>

            <div className="photos">
                <Photos />
            </div>
        </div>
    )   
}

export default HomePage;