import React from 'react';
import VideoIndexItem from './video_index_item'
import SideNav from '../sidenav/sidenav'

class VideoIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchVideos();
    }

    render() {
        let videos = this.props.videos
        if (Object.values(videos).length === 0) {
            return null
        } else {
            return (
                <div className='sidenav-and-main-container'>
                    <SideNav/>
                    <div className='not-header-or-sidenav'>
                        <ul>
                            { Object.values(videos).map(video => {
                                return <VideoIndexItem video={video} key={video.id}/>
                            })}
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

export default VideoIndex