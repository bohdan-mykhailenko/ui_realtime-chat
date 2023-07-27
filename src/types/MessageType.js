import PropTypes from 'prop-types';

export const MessageType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
  text: PropTypes.string,
  createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  image: PropTypes.string,
  like: PropTypes.bool,
});
