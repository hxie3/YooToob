import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

class UpdateVideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: this.props.video,
            updating: false,
            thumbnailUploaded: false,
            setupDrop: true
        }
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

    handleInputPhotoFile(e) {
        e.preventDefault();
        $('#photo-file-holder').trigger('click');
    }

    handlePhoto(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        let newvideostate = Object.assign({}, this.state.video)

        reader.onloadend = () => {
            newvideostate.photoFile = file;
            newvideostate.photoUrl = reader.result;
            this.setState({ video: newvideostate });
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            newvideostate.photoFile = null;
            newvideostate.photoUrl = '';
            this.setState({ video: newvideostate });
        }

        if (file) {
            this.setState({ thumbnailUploaded: true })
        }
    }

    handleUpdate(e) {
        e.preventDefault();
        e.persist();
        if (e.currentTarget.disabled === false) {
            e.currentTarget.disabled = true;
            this.setState({ updating: true })
            const formData = new FormData();
            formData.append('video[title]', this.state.video.title)
            formData.append('video[description]', this.state.video.description)
            formData.append('video[thumbnail]', this.state.video.photoFile)
            this.props.processForm(formData)
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

    componentDidMount() {
        const fileUpload = findIconDefinition({ prefix: 'fas', iconName: 'file-upload' });
        const fileUploadIcon = icon(fileUpload);
        Array.from(fileUploadIcon.node).map(n => document.getElementsByClassName('svg-file-upload')[0].appendChild(n))
        let dropArea = document.getElementsByClassName('thumbnail-container')[0];
        dropArea.addEventListener('dragenter', this.highlightThumbnail.bind(this), false);
        dropArea.addEventListener('dragover', this.highlightThumbnail.bind(this), false);
        dropArea.addEventListener('dragleave', this.unhighlightThumbnail.bind(this), false);
        dropArea.addEventListener('drop', this.unhighlightThumbnail.bind(this), false);
        dropArea.addEventListener('drop', this.handleDrop, false);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {
        return(
            <div>
                Hello
            </div>
        )
    }
}

export default UpdateVideoForm