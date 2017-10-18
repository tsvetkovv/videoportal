import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './User.css';

class Contact extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    profileData: PropTypes.shape({
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              url: PropTypes.string.isRequired,
              author: PropTypes.string.isRequired,
              rating: PropTypes.number.isRequired,
            }),
          ),
          title: PropTypes.string.isRequired,
        }),
      ),
    }).isRequired,
  };

  render() {
    const { profileData: { categories } } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          {categories.map(category => (
            <article key={category.title} className={s.newsItem}>
              <h1 className={s.newsTitle}>{category.title}</h1>
              <div className={s.videosContainer}>
                {category.content.map(video => (
                  <div className={s.video}>
                    <div className={s.videoSrc} />
                    <div className={s.removeBtn}>X</div>
                    <a>{video.title}</a>
                    <div>{video.author}</div>
                  </div>
                ))}
                {category.title === 'My videos' && (
                  <div className={s.addBtn}>(+) Add new video</div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
