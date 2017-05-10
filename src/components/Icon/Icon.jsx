import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Icon = ({ className, name }) => (
  <i
    className={classnames(
      'Icon',
      `mdi mdi-${name}`,
      className
    )}
  />
);

Icon.displayName = 'Icon';

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
