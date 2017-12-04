export const YOUTUBE_ID_REGEX = /([a-zA-Z0-9\-_]+)/;
const YOUTUBE_LINK_REGEX = /(\?v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-_]+)/;
/**
 * Getting youtube id by URL
 * @param {String} link youtube URL
 * @returns {String} youtube id
 */
export function getYoutubeId(link = '') {
  const match = link.match(YOUTUBE_LINK_REGEX);
  return match && match[2];
}
