import VirtualList from '@enact/moonstone/VirtualList';
import Item from '@enact/moonstone/Item';
import Divider from '@enact/moonstone/Divider';
import {Cell} from '@enact/ui/Layout';
import {scale} from '@enact/ui/resolution';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

const renderItem = ({items}) => ({index, ...rest}) => {
  if (items && items[index]) {
    return (
      <Item {...rest}
        items={items}
        index={index}>
        {items[index].name}
      </Item>
    )
  }
}

const ListBase = kind({
  name: 'Detail',

  propTypes: {
    user: PropTypes.object
  },

  render: ({list}) => {
    return [
      <Cell key='header' shrink><Divider>Repositories</Divider></Cell>,
      <Cell component={VirtualList} size={list.length <= 4 ? (60 * list.length) : null}
        key='list'
        dataSize={list.length}
        focusableScrollbar={null}
        itemRenderer={renderItem({ items: list})}
        itemSize={scale(60)}
        spacing={0}
      />]
    }
});
export default ListBase;
export {ListBase as List, ListBase};
