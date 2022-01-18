import React from 'react';
import axios from 'axios';
import { BaseUpload, ApiKey } from '../../Config';
import upperImage from '../../assets/images/uploadPeeker.gif';
import './Upload.scss';
class UploadGif extends React.Component {
    state = {
        gifUpload: [],
        errorslog: '',
        // Get uploads ids from the localstorage
        UploadList: JSON.parse(localStorage.getItem('UploadList')) || [],
        sucessUpload: false,
    };
    //SetUpload
    SetUploadedItem = (item) => {
        // Check if the same id is already existed
        //if its already there remove it using filter Es6 feature
        if (this.state.UploadList.includes(item)) {
            this.setState({
                UploadList: this.state.UploadList.filter((deleted) => {
                    return deleted !== item;
                }),
            });
            //if not, update the Upload list state ids with the news one
            //save them to local storage
        } else {
            this.setState({ UploadList: [...this.state.UploadList, item] });
            localStorage.setItem(
                'UploadList',
                JSON.stringify([...new Set(this.state.UploadList)])
            );
        }
    };
    // upload and get the image of user
    handleGifUpload = (e) => {
        let fileSrc = e.target.files;
        this.setState({ [e.target.id]: fileSrc[0] });
    };

    handleSubmit = (e) => {
        // reset Erros and Success messages 
        e.preventDefault();
        this.setState({ errorslog: '' });
        this.setState({ sucessUpload: false });
        // append the file uploaded from the user to the form data 
        const formData = new FormData();
        formData.append('file', this.state.gifUpload);
        axios
            .post(`${BaseUpload}?api_key=${ApiKey}&username=mohamed8oniem`, formData)
            .then(
                (response) => {
                    this.SetUploadedItem(response.data.data.id);
                    // handle the success message 
                    this.setState({ sucessUpload: true });
                },
                (error) => {
                    // handle errors
                    const errors = error.response.data.meta;
                    this.setState({ errorslog: errors.description });
                }
            );
    };

    render() {
        return (
            <>
                <section className="upload-gifs-page">
                    <img className="upperImage" src={upperImage} alt="gif" />
                    <div className="cont">
                        <h1>upload the gif that you want</h1>

                        <form className="upload-form-parent" onSubmit={this.handleSubmit}>
                            <div className="input-file-parent">
                                <h2>GIF</h2>
                                <p>Upload a GIF, MP4, or MOV.</p>
                                <div className="bottom-sec">Choose File</div>
                                <input
                                    type="file"
                                    id="gifUpload"
                                    onChange={this.handleGifUpload}
                                    accept="image/gif,video/mp4,video/mov,video/quicktime,youtube,vimeo"
                                />
                            </div>
                            <input type="submit" className="btn btn-submit" />
                        </form>
                        {this.state.sucessUpload ? (
                            <div className="error-txt-parent sucess">
                                <p>Gongrats you have uploaded the gif !</p>
                            </div>
                        ) : null}
                        {this.state.errorslog.length > 0 ? (
                            <div className="error-txt-parent">
                                <p>{this.state.errorslog && this.state.errorslog}</p>
                            </div>
                        ) : null}
                    </div>
                </section>
            </>
        );
    }
}

export default UploadGif;
