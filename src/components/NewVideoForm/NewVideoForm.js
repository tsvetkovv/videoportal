import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NewVideoForm.css';

class NewVideoForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    link: '',
    name: '',
    rating: 0,
    author: '',
  };

  handleLinkChange = e => {
    this.setState({ link: e.target.value });
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { link, name } = this.state;

    this.props.onSubmit(link, name);
  };

  render() {
    const { link, name } = this.state;

    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="username">
            Link to the resource:
          </label>
          <input
            className={s.input}
            id="link"
            type="text"
            name="link"
            value={link}
            onChange={this.handleLinkChange}
            autoFocus
          />
        </div>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="password">
            Title:
          </label>
          <input
            className={s.input}
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
          />
        </div>
        <div className={s.formGroup}>
          <button className={s.button} type="submit">
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(NewVideoForm);
