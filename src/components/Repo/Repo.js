import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import css from './Repo.less';
import Spottable from '@enact/spotlight/Spottable';

const RepoBase = kind({
  name: 'Repo',

  propTypes: {
    url: PropTypes.string,
    name: PropTypes.number
  },

  styles: {
    css,
    className: 'repo'
  },

  computed: {
    data: ({node}) => {
      return node;
    }
  },

  render: ({node, ...rest}) => {
    return (<div {...rest}>
      <a href={node.url}>{node.name}</a>
    </div>);
  }
});

const Repo = Spottable(RepoBase);
export default Repo;
export {RepoBase, Repo};
