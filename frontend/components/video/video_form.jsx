import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

class VideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: this.props.video,
            formData: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state.video);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleVideo(e){
        e.preventDefault();
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        reader.onloadend = () =>
            this.setState({ videoUrl: reader.result, videoFile: file });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            this.setState({ videoUrl: "", videoFile: null });
        }
        
        const formData = new FormData();
        formData.append('video[video]', this.state.videoFile);
        $.ajax({
            url: '/api/videos',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
        })  
    }

    componentDidMount(){
        library.add(fas)
        const exit = findIconDefinition({ prefix: 'fas', iconName: 'times' });
        const exitIcon = icon(exit);
        Array.from(exitIcon.node).map(n => document.getElementsByClassName('video-form-close-button-content')[0].appendChild(n))
        // const upload = findIconDefinition({ prefix: 'fas', iconName: 'upload'} )
        // const uploadIcon =icon(upload);
        // Array.from(uploadIcon.node).map(n => document.getElementsByClassName('video-file-picker-circle')[0].appendChild(n))
    }

    render() {
        return (
            <div className='video-form-container'>
                <div className='video-form-container-content'>
                    <div className='video-form-header'>
                        <div className='video-form-header-content'>
                            <div className='video-form-title'>
                                Upload Video
                            </div>
                            <div className='video-form-close-button'>
                                <div className='video-form-close-button-content'></div>
                            </div>
                        </div>
                    </div>
                    <div className='video-file-picker-container'>
                        { 
                            (!!this.state.formData) ? (
                                <div className='video-file-picker-style-scope'>
                                    <div className='video-file-picker-icon'>
                                        <div className='video-file-picker-circle'></div>
                                        <p className='video-file-picker-label'>Drag and drop a file you want to upload</p>
                                        <p className='video-file-picker-sublabel'>Your video will be public when you upload it</p>
                                    </div>
                                    <button className='select-files-button'>SELECT FILE</button>
                                    <input onChange={this.handleVideo} className='hidden video-file-holder' type="file" name='video-file-data'/>
                                </div>
                            ) : (
                                <div className='video-file-details'>
                                    <div className='left-col'>
                                        <h1 className='video-file-details-title'>Details</h1>
                                        <div className='video-file-title-container'>
                                            <div className='title-outer-outer'>
                                                <div className='title-outer'>
                                                    <div className='title-label'>
                                                        Title (required)
                                                    </div>
                                                    <div className='inner-title-outer'>
                                                        <input placeholder='Add a title that describes your video' className='title-input' type="text"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='description-textarea'>
                                            <div className='description-container'>
                                                <div className='inside-description-outer'>
                                                    <div className='description-label'>
                                                        Description
                                                    </div>
                                                    <div className='inside-description-input-container'>
                                                        <div className='description-style-scope'>
                                                            <textarea placeholder='Tell viewers about your video' className='description-content'></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='video-file-preview'>
                                        <div className='video-file-container'>
                                            <div className='video-file-player'>
                                                <div className='video-player'>
                                                    <div className='player-wrapper'>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row-scope'>
                                                <div className='video-link'>
                                                    <div className='title-label'>
                                                        Video Link
                                                    </div>
                                                    <div className='video-link-value'>
                                                        <span className='video-url'>
                                                            <a className="anchor-video-url" target="_blank" href="/">{/* Video Url */}</a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='title-label'>
                                                Filename
                                            </div>
                                            <div id='original-filename' className='video-link-value'>
                                                {/* Original Filename */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) 
                        }
                    </div>
                    <div className="video-file-upload-button-container">
                        <div className='inner-button-area'>
                            <div className='upload-button-container'>
                                <button className='select-files-button more'>
                                    <div className='upload-button-submit-value'>Upload</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <h3>{this.props.formType}</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title
                        <input
                            type='text'
                            value={this.state.title}
                            onChange={this.update('title')}
                        />
                    </label>
                    <label>
                        Description
                        <textarea
                            value={this.state.description}
                            onChange={this.update('description')}
                        />
                    </label>
                    <button type='submit'>{this.props.formType}</button>
                </form> */}
            </div>
        );
    }
}

export default VideoForm;