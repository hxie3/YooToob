import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            formData: null,
            form: 'file',
            uploading: false,
        }

        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleInputFile = this.handleInputFile.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleInputFile(e) {
        e.preventDefault();
        $('#photo-file-holder').trigger('click');
    }

    handlePhoto(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        let newuserstate = Object.assign({}, this.state.user)

        if (file) {
            if (file.name.split(".")[file.name.split(".").length - 1] === "svg") {
                alert("Sorry, svg image files are not supported yet!")
            }
            if (file.type.split("/")[0] === "image" && file.name.split(".")[file.name.split(".").length - 1] !== "svg") {
                reader.onloadend = () => {
                    newuserstate.photoFile = file;
                    newuserstate.photoUrl = reader.result;
                    this.setState({ user: newuserstate });
                }
        
                if (file) {
                    reader.readAsDataURL(file);
                } else {
                    newuserstate.photoFile = null
                    newuserstate.photoUrl = ''
                    this.setState({ user: newuserstate });
                }
        
                if (file) {
                    this.setState({ form: 'details' })
                }
            }
        }   
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        const file = dt.files[0];
        if (file) {
            if (file.type.split("/")[0] === "image" && file.name.split(".")[file.name.split(".").length - 1] !== "svg") {
                const reader = new FileReader();
                let newuserstate = Object.assign({}, this.state.user)
        
                reader.onloadend = () => {
                    newuserstate.photoFile = file;
                    newuserstate.photoUrl = reader.result;
                    this.setState({ user: newuserstate });
                }
        
                if (file) {
                    reader.readAsDataURL(file);
                } else {
                    newuserstate.photoFile = null
                    newuserstate.photoUrl = ''
                    this.setState({ user: newuserstate });
                }
        
                if (file) {
                    this.setState({ form: 'details' })
                }
            }
        }
    }

    handleUpload(e) {
        e.preventDefault();
        e.persist();
        if (e.currentTarget.disabled === false) {
            e.currentTarget.disabled = true;
            this.setState({ loading: true })
            const formData = new FormData();
            formData.append('user[profile_picture]', this.state.user.photoFile);
            formData.append('user[username]', this.state.user.username)
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

    componentDidMount() {
        library.add(fas)
        const exit = findIconDefinition({ prefix: 'fas', iconName: 'times' });
        const exitIcon = icon(exit);
        Array.from(exitIcon.node).map(n => document.getElementsByClassName('video-form-close-button-content')[0].appendChild(n))
        const upload = findIconDefinition({ prefix: 'fas', iconName: 'upload' })
        const uploadIcon = icon(upload);
        Array.from(uploadIcon.node).map(n => document.getElementsByClassName('video-file-picker-circle')[0].appendChild(n))
        let dropArea = document.getElementsByClassName('video-file-picker-container')[0];
        dropArea.addEventListener('dragenter', this.highlight.bind(this), false);
        dropArea.addEventListener('dragover', this.highlight.bind(this), false);
        dropArea.addEventListener('dragleave', this.unhighlight.bind(this), false);
        dropArea.addEventListener('drop', this.unhighlight.bind(this), false);
        dropArea.addEventListener('drop', this.handleDrop, false);
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
        const preview = !!this.state.user.photoUrl ? (
            <img onClick={this.handleInputFile} className="profile-pic-preview" src={this.state.user.photoUrl} alt="Photo"/>
        ) : (null)
        return(
            <div className='video-form-container'>
                <div className='video-form-container-content'>
                    <div className='video-form-header'>
                        <div className='video-form-header-content'>
                            <div className='video-form-title'>
                                Profile Picture
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
                                        <p className='video-file-picker-label'>Drag and drop a profile picture</p>
                                        <p className='video-file-picker-sublabel'>Your picture will be public when you upload it</p>
                                    </div>
                                    <button onClick={this.handleInputFile} className='select-files-button'>SELECT FILE</button>
                                    <input onChange={this.handlePhoto} accept="image/*" id='photo-file-holder' className='hidden video-file-holder' type="file" name='video-file-data' />
                                </div>
                            ) : (
                                <div className='photo-file-preview'>
                                    {preview}
                                    <input onChange={this.handlePhoto} accept="image/*" id='photo-file-holder' className='hidden video-file-holder' type="file" name='video-file-data' />
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
                                                    <div className='upload-button-submit-value'>Confirming...</div>
                                                ) : (
                                                        <div className='upload-button-submit-value'>Confirm</div>
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
        )
    }
}

export default ProfilePicture;