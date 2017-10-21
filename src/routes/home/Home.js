import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import VideoSmall from '../../components/VideoSmall/VideoSmall';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    homeData: PropTypes.shape({
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
    const { homeData: { categories } } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          {categories.map(category => (
            <article key={category.title} className={s.newsItem}>
              <h1 className={s.newsTitle}>{category.title}</h1>
              <div className={s.videosContainer}>
                {category.content.map(video => <VideoSmall video={video} />)}
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
