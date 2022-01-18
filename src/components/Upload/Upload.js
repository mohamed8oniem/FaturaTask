import React from 'react';
import axios from 'axios';
import { BaseUpload, ApiKey } from '../../Config';
import upperImage from '../../assets/images/uploadPeeker.gif';
import './Upload.scss';
class UploadGif extends React.Component {
    state = {
        gifUpload: [],
        errorslog: '',
        UploadList: JSON.parse(localStorage.getItem('UploadList')) || [],
        sucessUpload:false
    }
    //SetUpload
    SetUploadedItem = (item) => {
        if (this.state.UploadList.includes(item)) {
            this.setState({
                UploadList: this.state.UploadList.filter((deleted) => {
                    return deleted !== item;
                })
            })
        } else {
            this.setState({ UploadList: [...this.state.UploadList, item] })
            console.log(this.state.UploadList)
            localStorage.setItem('UploadList', JSON.stringify([...new Set(this.state.UploadList)]));
        }
    }
    componentDidMount() {
        // localStorage.setItem('UploadList', JSON.stringify([...new Set(this.state.UploadList)]));
    }
    // upload and get the image of user 
    handleGifUpload = (e) => {
        let fileSrc = e.target.files;
        this.setState({ [e.target.id]: fileSrc[0] })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ errorslog: '' });
        this.setState({sucessUpload:false});
        const formData = new FormData();
        formData.append("file", this.state.gifUpload);
        formData.append("source_image_url", '');
        formData.append("tags", 'tags');


        axios.post(`${BaseUpload}?api_key=${ApiKey}&username=mohamed8oniem`, formData).then(
            (response) => {
                this.SetUploadedItem(response.data.data.id);
                this.setState({sucessUpload:true});
            }, (error) => {
                const errors = error.response.data.meta;
                this.setState({ errorslog: errors.description })
            }
        );
    }

    render() {
        return (
            <>
                <section className='upload-gifs-page'>
                    <img className='upperImage' src={upperImage} alt='gif' />
                    <div className='cont'>
                        <h1>
                            upload the gif that you want
                        </h1>

                        <form className='upload-form-parent' onSubmit={this.handleSubmit}>

                            <div className='input-file-parent'>
                                <h2>GIF</h2>
                                <p>Upload a GIF, MP4, or MOV.</p>
                                <div className='bottom-sec'>Choose File</div>
                                <input type="file" id="gifUpload" onChange={this.handleGifUpload} accept="image/gif,video/mp4,video/mov,video/quicktime,youtube,vimeo" />
                            </div>
                            <input type="submit" className='btn btn-submit' />
                        </form>
                        {
                            this.state.sucessUpload ?
                            <div className='error-txt-parent sucess'>
                                <p>Gongrats you have uploaded the gif !</p>
                            </div>:null
                        }
                        {
                            this.state.errorslog.length > 0 ?
                                <div className='error-txt-parent'>
                                    <p>
                                        {
                                            this.state.errorslog && this.state.errorslog
                                        }
                                    </p>
                                </div>
                                : null
                        }

                    </div>

                </section>

            </>
        );
    }
}

export default UploadGif;