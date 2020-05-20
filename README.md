# README

YooToob is a YouTube clone with video upload and playback as its main functionality.

Check out the [live](https://aayootoob.herokuapp.com/#/) link.

This app was built using a Rails backend with React/Redux frontend.

![yootoob](https://github.com/hxie3/YooToob/blob/master/app/assets/images/yootoob.gif)

## Features

* User authentication using BCrypt encrypted passwords.
* Video upload and playback through storing and fetching from AWS.
* Any user can use video playback, locked features include commenting, uploading, editing, deleting, and liking.
* There is a demo login for quick access to a signed in user.
* Header and NavBar that allows for smooth navigation through the site.
* Video views are incremented on video play once each mount and updated component lifecycle.
* Users can comment on videos.
* Users can like or dislike both videos and comments.
* Users can search for videos that query for a match in video title, video owner, or video description.

## Video Upload

Video upload was a challenge to implement. YooToob uses a protected modal that requires the user to sign in before access to video upload is given. It then prompts the user to then select a file to upload. 

The default state when the modal opens is:
```javascript
this.state = {
   video: this.props.video,
   form: 'file',
   uploading: false,
   thumbnailUploaded: false,
   setupDrop: true,
   uploadable: false,
}
```
With mapped state and dispatch of:
```javascript
const mapStateToProps = (state) => ({
    video: {
        title: '',
        description: '',
        user_id: state.session.id,
        videoUrl: '',
        videoFile: null,
    },
    errors: state.errors.videos,
    formType: 'Create Video'
})

const mapDispatchToProps = dispatch => ({
    processForm : (video) => dispatch(createVideo(video)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
})
```
![Upload Form](https://github.com/hxie3/YooToob/blob/master/app/assets/images/upload.png)

After a file is selected the form state changes from prompting a file selection to preview the file selected and prompt for additional information such as the title and description. I was able to change the state of the form by listening to the onChange event that triggers when a file is submitted to an `<input type='file'/>`. I made a helper method that then took the inputted file and stored it to the local state as well as change the state of the form.

```javascript
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
```

Now that the form state changed to `'details'`, the form will rerender to its second form using conditional logic in the render method.

![Upload2 Form](https://github.com/hxie3/YooToob/blob/master/app/assets/images/upload2.png)

All the user has to do after inputting a title and description is press the upload button which will update the last required fields to create a video object.

## User Authentication

User authentication used the same form for sign up and log in. The render method of the form uses conditional logic based on the `formType` to change between submitting data to create a user or create a session.
```javascript
this.state = {
   user: { 
       username: '',
       password: ''
   },
   formType: this.props.formType
};
```
The user authentication process is split into two parts: the username form, and the password form. When the user submits a username by pressing the `Next` button, the state changes to store the submitted username only if no errors is detected. If the user clicks `Demo Login` instead, then the form will process both the username and password with a delegated demo user's information.

```javascript
handleSubmit(e) {
  e.preventDefault();
  if (e.target.innerHTML === 'Next') {
      const user = Object.assign({}, this.state.user);
      this.props.newProcessForm(user);
      setTimeout(() => {
          if(this.props.errors.length === 0) {
              this.setState( { formType: "password" })
          } else {
              this.handleShake(e);
          }
      }, 250)
  } else {
      this.props.processForm({ username: 'DemoUser123', password: 'DemoUser123' })
  }
}
```
When the `formType` changes to `"password"`, the form rerenders to take in a password. Once the password is submitted the form is submitted with the combined state to pass into the user create/session create.

## Future Features
* Subscriptions and channels
* Filter search results and comments
* Like/dislike visualizer
* Autoplay
* Custom video controls overlay
* Infinite scroll/loading
