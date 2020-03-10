import React from 'react';
import { withRouter } from 'react-router-dom';

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
            <div>
                {this.props.query}
            </div>
        )
    }
}

export default withRouter(SearchIndex);