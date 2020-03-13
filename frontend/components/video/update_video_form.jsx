import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { runInThisContext } from 'vm';

class UpdateVideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: this.props.video,
            updating: false,
            thumbnailUploaded: false,
            setupDrop: true
        }

        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.handleInputPhotoFile = this.handleInputPhotoFile.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleThumbnailDrop = this.handleThumbnailDrop.bind(this);
        this.highlightThumbnail = this.highlightThumbnail.bind(this);
        this.unhighlightThumbnail = this.unhighlightThumbnail.bind(this);
    }

    updateTitle(e) {
        let newvideostate = Object.assign({}, this.state.video);
        newvideostate.title = e.currentTarget.value;
        this.setState({ video: newvideostate })
        if (e.currentTarget.value.trim() === '') {
            document.getElementsByClassName("select-files-button")[0].disabled = true;
        } else if (this.state.video.description.trim() !== '' && this.state.video.photoUrl && e.currentTarget.value.trim() !== this.props.video.title.trim()) {
            document.getElementsByClassName("select-files-button")[0].disabled = false;
            document.getElementsByClassName("select-files-button")[0].addEventListener("click", this.handleUpdate, false)
        } else if (this.state.video.description.trim() === this.props.video.description.trim() && this.state.video.photoUrl === this.props.video.photoUrl && this.props.video.title.trim() === e.currentTarget.value.trim()) {
            document.getElementsByClassName("select-files-button")[0].disabled = true;
        }
    }

    updateDescription(e) {
        let newvideostate = Object.assign({}, this.state.video);
        newvideostate.description = e.currentTarget.value;
        this.setState({ video: newvideostate })
        if (e.currentTarget.value.trim() === '') {
            document.getElementsByClassName("select-files-button")[0].disabled = true;
        } else if (this.state.video.title.trim() !== '' && this.state.video.photoUrl && this.props.video.description.trim() !== e.currentTarget.value.trim()) {
            document.getElementsByClassName("select-files-button")[0].disabled = false;
            document.getElementsByClassName("select-files-button")[0].addEventListener("click", this.handleUpdate, false)
        } else if (this.state.video.title.trim() === this.props.video.title.trim() && this.state.video.photoUrl === this.props.video.photoUrl && this.props.video.description.trim() === e.currentTarget.value.trim()) {
            document.getElementsByClassName("select-files-button")[0].disabled = true;
        }
    }

    handleInputPhotoFile(e) {
        e.preventDefault();
        $('#photo-file-holder').trigger('click');
    }

    handlePhoto(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        let newvideostate = Object.assign({}, this.state.video)
        if (file) {
            if (file.name.split(".")[file.name.split(".").length - 1] === "svg") {
                alert("Sorry, svg image files are not supported yet!")
            }
            if (file.type.split("/")[0] === "image" && file.name.split(".")[file.name.split(".").length - 1] !== "svg") {
                reader.onloadend = () => {
                    newvideostate.photoFile = file;
                    newvideostate.photoUrl = reader.result;
                    this.setState({ video: newvideostate });
                }

                if (file) {
                    reader.readAsDataURL(file);
                }
                // else {
                //     newvideostate.photoFile = null;
                //     newvideostate.photoUrl = '';
                //     this.setState({ video: newvideostate });
                //     document.getElementsByClassName("select-files-button")[0].disabled = true;
                // }

                if (file) {
                    this.setState({ thumbnailUploaded: true, uploadable: true });
                    if (this.state.video.title !== '' && this.state.video.description !== '' && file !== this.props.thumbnailFile) {
                        document.getElementsByClassName("select-files-button")[0].disabled = false;
                        document.getElementsByClassName("select-files-button")[0].addEventListener("click", this.handleUpdate, false)
                    } else if (this.state.video.title.trim() === this.props.video.title.trim() && this.state.video.description.trim() === this.props.video.description.trim() && this.props.thumbnailFile === file) {
                        document.getElementsByClassName("select-files-button")[0].disabled = true;
                    }
                }
            }
        }
    }

    handleUpdate(e) {
        e.preventDefault();
        if (e.currentTarget.disabled === false) {
            e.currentTarget.disabled = true;
            this.setState({ updating: true })
            const formData = new FormData();
            formData.append('video[title]', this.state.video.title)
            formData.append('video[description]', this.state.video.description)
            if (this.props.video.photoFile !== this.state.video.photoFile) {
                formData.append('video[thumbnail]', this.state.video.photoFile)
            }
            this.props.processForm(formData, this.props.video.id)
                .then(() => {
                    let ele = document.getElementsByClassName("select-files-button")[0];
                    if (!!ele) {
                        ele.disabled = false;
                        this.setState({ updating: false })
                        this.props.closeModal();
                    }
                }, () => {
                    let ele = document.getElementsByClassName("select-files-button")[0];

                    if (!!ele) {
                        ele.disabled = false;
                        this.setState({ updating: false })
                    }
                })
        }
    }

    highlightThumbnail(e) {
        e.preventDefault();
        e.stopPropagation();
        let container = document.getElementsByClassName('thumbnail-picker-container')[0];
        container.classList.add('highlight');
    }

    unhighlightThumbnail(e) {
        e.preventDefault();
        e.stopPropagation();
        let container = document.getElementsByClassName('thumbnail-picker-container')[0];
        container.classList.remove('highlight');
    }

    handleThumbnailDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer
        const file = dt.files[0]
        if (file) {
            if (file.type.split("/")[0] === "image" && file.name.split("/")[file.name.split("/").length - 1] !== "svg") {
                const reader = new FileReader();
                let newvideostate = Object.assign({}, this.state.video)

                reader.onloadend = () => {
                    newvideostate.photoFile = file;
                    newvideostate.photoUrl = reader.result;
                    this.setState({ video: newvideostate });
                }

                if (file) {
                    reader.readAsDataURL(file);
                } else {
                    newvideostate.photoFile = null
                    newvideostate.photoUrl = ''
                    this.setState({ video: newvideostate });
                    document.getElementsByClassName("select-files-button")[0].disabled = true;
                }

                if (file) {
                    this.setState({ thumbnailUploaded: true })
                    if (this.state.video.title !== '' && this.state.video.description !== '' && this.state.video.photoUrl !== this.props.video.photoUrl) {
                        document.getElementsByClassName("select-files-button")[0].disabled = false;
                        document.getElementsByClassName("select-files-button")[0].addEventListener("click", this.handleUpdate, false)
                    }
                }
            }
        }
    }
    
    componentDidMount() {
        this.props.fetchVideo(this.props.video.id);
        library.add(fas)
        const exit = findIconDefinition({ prefix: 'fas', iconName: 'times' });
        const exitIcon = icon(exit);
        Array.from(exitIcon.node).map(n => document.getElementsByClassName('video-form-close-button-content')[0].appendChild(n))
        let dropArea = document.getElementsByClassName('thumbnail-container')[0];
        dropArea.addEventListener('dragenter', this.highlightThumbnail.bind(this), false);
        dropArea.addEventListener('dragover', this.highlightThumbnail.bind(this), false);
        dropArea.addEventListener('dragleave', this.unhighlightThumbnail.bind(this), false);
        dropArea.addEventListener('drop', this.unhighlightThumbnail.bind(this), false);
        dropArea.addEventListener('drop', this.handleThumbnailDrop, false);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {
        const preview = !!this.props.video.videoUrl ? (
            <video poster={this.props.video.photoUrl} key={this.props.video.videoUrl} width='304' height='171' controls>
                <source src={this.props.video.videoUrl} type='video/mp4' />
            </video>
        ) : (null);
        const thumbnailPreview =
            <div onClick={this.handleInputPhotoFile} className='thumbnail-picker-container'>
                {this.state.video.photoUrl ? (
                    <img className="thumbnail" src={this.state.video.photoUrl} alt="thumbnail" />
                ) : (
                    <img className="thumbnail hidden" src={this.state.video.photoUrl} alt="thumbnail" />
                )}
                <div className="svg-file-upload"></div>
                <div className="text-below-thumbnail-upload">
                    Upload thumbnail
                </div>
            </div>
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
                                                <input onChange={this.updateTitle} value={this.state.video.title} placeholder='Add a title that describes your video' className='title-input' type="text" />
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
                                <div className='thumbnail-container'>
                                    <div>
                                        <div className='thumbnail-string'>
                                            Thumbnail (required)
                                        </div>
                                        <div className='thumbnail-instructions'>
                                            Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.
                                        </div>
                                        {thumbnailPreview}
                                    </div>
                                </div>
                                <input onChange={this.handlePhoto} id='photo-file-holder' accept="image/*" className='hidden photo-file-holder' type="file" name='photo-file-data' />
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="video-file-upload-button-container">
                        <div className='inner-button-area'>
                            <div className='upload-button-container'>
                                <button disabled onClick={this.handleUpdate} className='select-files-button more'>
                                    {
                                        this.state.updating ? (
                                            <div className='upload-button-submit-value'>Updating...</div>
                                        ) : (
                                                <div className='upload-button-submit-value'>Update</div>
                                            )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateVideoForm