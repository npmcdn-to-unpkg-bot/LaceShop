import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import Index from '../components/Index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  	const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    const { pics } = this.props
    return (
      <div>
      	<Index pics={pics} active={this.props.active}/> 
      </div>
    );
  }
}

App.propTypes = {
  pics: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { postsByVenderPic } = state
  return {
    pics: postsByVenderPic
  }
}

export default connect(mapStateToProps)(App)