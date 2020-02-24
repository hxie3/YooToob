import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

class VideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: this.props.video,
            formData: null,
            form: 'file',
            uploading: false,
        }

        this.handleVideo = this.handleVideo.bind(this);
        this.handleInputFile = this.handleInputFile.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    updateTitle(e) {
        let newvideostate = Object.assign({}, this.state.video);
        newvideostate.title = e.currentTarget.value;
        this.setState({ video: newvideostate })
    }

    updateDescription(e) {
        let newvideostate = Object.assign({}, this.state.video);
        newvideostate.description = e.currentTarget.value;
        this.setState({ video: newvideostate })
    }

    handleInputFile(e){
        e.preventDefault();
        $('#video-file-holder').trigger('click');
    }

    handleVideo(e){
        e.preventDefault();
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        let newvideostate = Object.assign({}, this.state.video)

        reader.onloadend = () => {
            newvideostate.videoFile = file;
            newvideostate.videoUrl = reader.result;
            this.setState({ video: newvideostate });
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            newvideostate.videoFile = null
            newvideostate.videoUrl = ''
            this.setState({ video: newvideostate });
        }
        
        if (file) {
            this.setState({ form: 'details' })
        }
    }

    handleUpload(e){
        e.preventDefault();
        e.persist();
        if (e.currentTarget.disabled === false) {
            e.currentTarget.disabled = true;
            this.setState({ loading: true })
            const formData = new FormData();
            formData.append('video[video]', this.state.video.videoFile);
            formData.append('video[title]', this.state.video.title)
            formData.append('video[description]', this.state.video.description)
            formData.append('video[user_id]', this.state.video.user_id)
            this.props.processForm(formData)
                .then(() => {
                    let ele = document.getElementsByClassName("select-files-button")[0];
                    if (!!ele) {
                        ele.disabled = false;
                        this.setState({ loading: false })
                        this.props.closeModal();
                    }
                }, () => {
                    let ele = document.getElementsByClassName("select-files-button")[0];

                    if (!!ele) {
                        ele.disabled = false;
                        this.setState({ loading: false })
                    }
                })
        }
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    componentDidMount(){
        library.add(fas)
        const exit = findIconDefinition({ prefix: 'fas', iconName: 'times' });
        const exitIcon = icon(exit);
        Array.from(exitIcon.node).map(n => document.getElementsByClassName('video-form-close-button-content')[0].appendChild(n))
        const upload = findIconDefinition({ prefix: 'fas', iconName: 'upload'} )
        const uploadIcon =icon(upload);
        Array.from(uploadIcon.node).map(n => document.getElementsByClassName('video-file-picker-circle')[0].appendChild(n))
        let dropArea = document.getElementsByClassName('video-file-picker-container')[0];
        dropArea.addEventListener('dragenter', this.highlight.bind(this), false);
        dropArea.addEventListener('dragover', this.highlight.bind(this), false);
        dropArea.addEventListener('dragleave', this.unhighlight.bind(this), false);
        dropArea.addEventListener('drop', this.unhighlight.bind(this), false);
        dropArea.addEventListener('drop', this.handleDrop, false);
    }

    // handleFiles(files) {
    //     ([...files]).forEach(this.uploadVideo)
    // }

    // uploadVideo(file) {
    //     let url = 
    // }
    
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer
        const file = dt.files[0]
        const reader = new FileReader();
        let newvideostate = Object.assign({}, this.state.video)

        reader.onloadend = () => {
            newvideostate.videoFile = file;
            newvideostate.videoUrl = reader.result;
            this.setState({ video: newvideostate });
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            newvideostate.videoFile = null
            newvideostate.videoUrl = ''
            this.setState({ video: newvideostate });
        }

        if (file) {
            this.setState({ form: 'details' })
        }
    }

    highlight(e) {
        e.preventDefault();
        e.stopPropagation();
        let dropCircle = document.getElementsByClassName('video-file-picker-circle')[0];
        dropCircle.classList.add("highlight")
    }

    unhighlight(e) {
        e.preventDefault();
        e.stopPropagation();
        let dropCircle = document.getElementsByClassName('video-file-picker-circle')[0];
        dropCircle.classList.remove("highlight")
    }

    render() {
        const preview = !!this.state.video.videoUrl ? (
            <video key={this.state.video.videoUrl} width='304' height='171' controls>
                <source src={this.state.video.videoUrl} type='video/mp4'/>
            </video>
        ) : (null)
        return (
            <div className='video-form-container'>
                <div className='video-form-container-content'>
                    <div className='video-form-header'>
                        <div className='video-form-header-content'>
                            <div className='video-form-title'>
                                Upload Video
                            </div>
                            <div className='video-form-close-button'>
                                <div onClick={this.props.closeModal} className='video-form-close-button-content'></div>
                            </div>
                        </div>
                    </div>
                    <div className='video-file-picker-container'>
                        { 
                            (this.state.form === 'file') ? (
                                <div className='video-file-picker-style-scope'>
                                    <div className='video-file-picker-icon'>
                                        <div onClick={this.handleInputFile} className='video-file-picker-circle'></div>
                                        <p className='video-file-picker-label'>Drag and drop a file you want to upload</p>
                                        <p className='video-file-picker-sublabel'>Your video will be public when you upload it</p>
                                    </div>
                                    <button onClick={this.handleInputFile} className='select-files-button'>SELECT FILE</button>
                                    <input onChange={this.handleVideo} id='video-file-holder' className='hidden video-file-holder' type="file" name='video-file-data'/>
                                </div>
                            ) : (
                                <div className='video-file-details'>
                                    <div className='left-col'>
                                        <h1 className='video-file-details-title'>Details</h1>
                                        <div className="video-errors">
                                            {this.props.errors.includes("Title can't be blank") ? ("Title can't be blank") : ("")}  
                                        </div>
                                        <div className='video-file-title-container'>
                                            <div className='title-outer-outer'>
                                                <div className='title-outer'>
                                                    <div className='title-label'>
                                                        Title (required)
                                                    </div>
                                                    <div className='inner-title-outer'>
                                                        <input onChange={this.updateTitle} value={this.state.video.title} placeholder='Add a title that describes your video' className='title-input' type="text"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="video-errors">
                                            {this.props.errors.includes("Description can't be blank") ? ("Description can't be blank") : ("")}
                                        </div>
                                        <div className='description-textarea'>
                                            <div className='description-container'>
                                                <div className='inside-description-outer'>
                                                    <div className='description-label'>
                                                        Description (required)
                                                    </div>
                                                    <div className='inside-description-input-container'>
                                                        <div className='description-style-scope'>
                                                            <textarea onChange={this.updateDescription} value={this.state.video.description} placeholder='Tell viewers about your video' className='description-content'></textarea>
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
                                                        {preview}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Implement a URL shortener if you want to use below code */}
                                            {/* <div className='row-scope'>
                                                <div className='video-link'>
                                                    <div className='title-label'>
                                                        Video Link
                                                    </div>
                                                    <div className='video-link-value'>
                                                        <span className='video-url'>
                                                            <a className="anchor-video-url" target="_blank" href={this.state.video.videoUrl}>{this.state.video.videoUrl}</a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className='title-label'>
                                                Filename
                                            </div>
                                            <div id='original-filename' className='video-link-value'>   
                                                {this.state.video.videoFile ? this.state.video.videoFile.name : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) 
                        }
                    </div>
                    {
                        (this.state.form === 'details') ? (
                            <div className="video-file-upload-button-container">
                                <div className='inner-button-area'>
                                    <div className='upload-button-container'>
                                        <button onClick={this.handleUpload} className='select-files-button more'>
                                            {
                                                document.getElementsByClassName("select-files-button")[0].disabled ? (
                                                    <div className='upload-button-submit-value'>Uploading...</div>
                                                ) : (
                                                    <div className='upload-button-submit-value'>Upload</div>
                                                )
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}

export default VideoForm;