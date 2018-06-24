// npm libs
import React from 'react';
import showdown from 'showdown';
import PropTypes from 'prop-types';

// services
import HTTP from 'services/http';

// styles
import './styles.less';

class Entry extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.converter = new showdown.Converter({ ghCompatibleHeaderId: true, rawHeaderId: true });
  }

  componentDidMount() {
    HTTP
      .get(`/md/${this.props.match.params.slug}.md`, { 'content-type': 'text/markdown' })
      .then(text => {
        const html = this.converter.makeHtml(text);
        document.getElementById('md-viewer').innerHTML = html;
      });
  }

  render() {
    return <section id="md-viewer"></section>;
  }
}

Entry.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Entry;
