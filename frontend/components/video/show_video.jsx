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
        return (
            <div className='show-body'>
                <div className='show-body-left'>
                    <div>
                        <div className='player-outer'>
                            <div className='player-container-outer'>
                                <div className='player-container-inner'>
                                    <div className='player-container'>
                                        <video className='player' controls>
                                            <source src={this.state.video.video} />
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='show-body-right'>

                </div>
            </div>
        )
    }
}

export default ShowVideo