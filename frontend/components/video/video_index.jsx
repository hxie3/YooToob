import React from 'react';
import VideoIndexItemContainer from './video_index_item_container';
import SideNavContainer from '../sidenav/sidenav_container';

class VideoIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: this.props.videos
        }
    }

    componentDidMount() {
        this.props.fetchVideos().then(
            (res) => this.setState({ videos: res.videos })
        )
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.videos !== prevState.videos) {
            return { videos: nextProps.videos };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.videos !== this.props.videos) {
            //Perform some operation here
            this.setState({ videos: this.props.videos });
        }
    }

    render() {
        let videos = this.state.videos
        if (Object.values(videos).length === 0) {
            return null
        } else {
            return (
                <div className='sidenav-and-main-container'>
                    <SideNavContainer/>
                    <div className='not-header-or-sidenav'>
                        <div className='index-videos-container'>
                            <div className='margin'>
                                <div className='grid-header'>
                                    <span className='recommended'>
                                        Recommended
                                    </span>
                                </div>
                                <div className='index-contents'>
                                    { Object.values(videos).map(video => {
                                        return <VideoIndexItemContainer video={video} key={video.id}/>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default VideoIndex