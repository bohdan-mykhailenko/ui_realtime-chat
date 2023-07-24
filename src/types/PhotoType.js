import PropTypes from 'prop-types';

export const PhotoType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  URL: PropTypes.string.isRequired,
  createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
});
