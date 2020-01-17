import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

class ShowVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            video: this.props.video
        }
    }

    componentDidMount(){
        this.props.fetchVideo(this.props.match.params.id).then(
            (res) => this.setState({ video: res.video } )
        )
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.video !== prevState.video) {
    //         return { video: nextProps.video };
    //     }
    //     else return null;
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.video !== this.props.video) {
    //         //Perform some operation here
    //         this.setState({ video: this.props.video });
    //     }
    // }

    render() {
        let video = this.state.video;
        if (!video) return null
        let date = new Date(this.props.video.created_at);
        let month = date.getMonth() + 1;
        let day = date.getDay();
        let year = date.getFullYear();
        return (
            <div className='show-body'>
                <div id='primary' className='show-body-left'>
                    <div>
                        <div className='player-outer'>
                            <div className='player-container-outer'>
                                <div className='player-container-inner'>
                                    <div className='player-container'>
                                        <video className='player' controls autoPlay>
                                            <source src={this.props.video.video} />
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='info'>
                            <div className='info-contents'>
                                <div>
                                    <h1 className='title-show'>
                                        <span className='title-show-content'>
                                            {this.props.video.title}
                                        </span>
                                    </h1>
                                    <div className='below-title'>
                                        <div className='info-text'>
                                            <div className='count'>
                                                <span className='count-value'>
                                                    {this.props.video.views} views
                                                </span>
                                                <span>{"    "}</span>
                                                <span className='date'>
                                                    {month}/{day}/{year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='secondary' className='show-body-right'>
                    <div>
                        Hi
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowVideo