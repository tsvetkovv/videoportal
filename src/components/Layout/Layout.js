import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <section className={s.app}>
        <div className={s.layout}>
          <Header />
          {this.props.children}
          <Footer />
        </div>
      </section>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
