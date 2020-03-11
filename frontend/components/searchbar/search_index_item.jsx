import React from 'react';

class SearchIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }

    createViewsString() {
        let views = this.props.video.views;
        if (views === 0) {
            return "No views"
        } else if (views === 1) {
            return `${views} view`
        } else {
            return `${views} views`
        }
    }

    createUploadedString() {
        let date = new Date(this.props.video.created_at);
        let now = new Date(Date.now());
        let diffInSeconds = Math.floor((now - date) / 1000);
        let num;
        if (diffInSeconds < 60) {
            if (diffInSeconds === 1) {
                return <span className="date">
                    {diffInSeconds} second ago
                </span>
            } else {
                return <span className="date">
                    {diffInSeconds} seconds ago
                </span>
            }
        } else if (diffInSeconds / 60 < 60) {
            num = Math.floor(diffInSeconds / 60)
            if (num === 1) {
                return <span className="date">
                    {num} minute ago
                </span>
            } else {
                return <span className="date">
                    {num} minutes ago
                </span>
            }
        } else if (diffInSeconds / 60 / 60 < 24) {
            num = Math.floor(diffInSeconds / 60 / 60);
            if (num === 1) {
                return <span className="date">
                    {num} hour ago
                </span>
            } else {
                return <span className="date">
                    {num} hours ago
                </span>
            }
        } else if (diffInSeconds / 60 / 60 / 24 < 7) {
            num = Math.floor(diffInSeconds / 60 / 60 / 24)
            return <span className="date">
                {num} {num === 1 ? ("day") : ("days")} ago
            </span>
        } else if (diffInSeconds / 60 / 60 / 24 / 7 < 4.286) {
            num = Math.floor(diffInSeconds / 60 / 60 / 24 / 7)
            return <span className="date">
                {num} {num === 1 ? ("week") : ("weeks")} ago
            </span>
        }
        else if (diffInSeconds / 60 / 60 / 24 / 7 / 4.286 < 12) {
            num = Math.floor(diffInSeconds / 60 / 60 / 24 / 7 / 4.286)
            return <span className="date">
                {num} {num === 1 ? ("month") : ("months")} ago
            </span>
        } else {
            num = Math.floor(diffInSeconds / 60 / 60 / 24 / 7 / 4.286 / 12);
            return <span className="date">
                {num} {num === 1 ? ("year") : ("years")} ago
            </span>
        }
    }

    render() {
        return (
            <div className="search-index-item">
                <div className="search-index-item-thumbnail">
                    <Link className="search-thumbnail-link" to={`/watch/${this.props.video.id}`}>
                        <div className='search-clip-thumbnail'>
                            <img className="search-thumbnail" src={this.props.video.thumbnail} alt="thumbnail"/>
                        </div>
                    </Link>
                    <Link to={`/watch/${this.props.video.id}`}>
                        <div className="search-item-text-container">
                            <div className="search-item-header">
                                <div className="search-item-header-1">
                                    <h3 className="search-item-title">
                                        {this.props.video.title}
                                    </h3>
                                </div>
                                <div className="search-item-header-2">
                                    <span className="search-item-username">
                                        {this.props.video.username}
                                    </span>
                                    <div className="search-item-views-and-upload">
                                        <span className="search-item-views">
                                            {this.props.video.views}
                                        </span>
                                        {/* dot */}
                                        <span className="search-item-uploaded">

                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className="search-item-description">
                                {this.props.video.description}
                            </span>
                        </div>
                    </Link>                      
                </div>
            </div>
        )
    }
}

export default SearchIndexItem