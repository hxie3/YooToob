import React from 'react';
import { withRouter } from 'react-router-dom';
import SideNavContainer from "../sidenav/sidenav_container";
import SearchIndexItem from "./search_index_item"

class SearchIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementsByClassName('searchbar')[0].value = this.props.query
        this.props.searchVideos(this.props.query);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.query !== this.props.match.params.query) {
            document.getElementsByClassName('searchbar')[0].value = this.props.query
            this.props.searchVideos(this.props.query);
        }
    }

    render() {
        return (
            <div className="sidenav-and-main-container">
                <SideNavContainer />
                <div className="not-header-or-sidenav">
                    <div className="search-index-videos-container">
                        <div className="inside-padding">
                            <div className="max-width">
                                <div className="primary-search">
                                    <div className="search-contents">
                                        {Object.values(this.props.videos).map(video => (
                                            <SearchIndexItem video={video}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchIndex);