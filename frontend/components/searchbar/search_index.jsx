import React from 'react';

class SearchIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.query}
            </div>
        )
    }
}

export default SearchIndex;