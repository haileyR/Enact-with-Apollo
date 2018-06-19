import {Header, Panel} from '@enact/moonstone/Panels';
import VirtualList from '@enact/moonstone/VirtualList';
import Item from '@enact/moonstone/Item';
import Image from '@enact/moonstone/Image';
import Divider from '@enact/moonstone/Divider';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import css from "./Detail.less";

const GET_USER = gql`
  query($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      organizations(first: 10) {
        nodes {
          name
        }
      }
      repositories(first: 10) {
        nodes {
          name
          url
        }
      }
      followers(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;

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

// Checks how many lists to display we want to show in the user details panel.
const getNumberOfLists = (lists) => {
  return Object.values(lists).reduce((acc, currentVal) => {
    if (currentVal && typeof currentVal === "boolean") {
      acc += 1;
    }
    return acc;
  }, 0);
}

const DetailBase = kind({
  name: 'Detail',

  propTypes: {
    userId: PropTypes.string,
    lists: PropTypes.object
  },

  render: ({userId, lists, ...rest}) => (
    <Query query={GET_USER} variables={{ login: userId }}>
			{({loading, data}) => {
        let listNumber = getNumberOfLists(lists);
        return (<Panel {...rest}>
        {loading ? <p>Loading...</p> : !data || !data.user ? <p>User not found...</p> :
          (
            <div>
              <Header title={data.user.name} type="compact">
                <Image src={data.user.avatarUrl} style={{height: '3rem'}} sizing='fit'/>
              </Header>
              <div className={css["alllistcontainer"]}>
              {lists.repo && <div className={css["listcontainer"]}>
                <Divider>Repositories</Divider>
                <VirtualList
                  dataSize={data.user.repositories.nodes.length}
                  focusableScrollbar={null}
                  itemRenderer={renderItem({ items: data.user.repositories.nodes})}
                  itemSize={48}
                  spacing={0}
                  className={css[`listHeight${listNumber}`]}
                />
              </div>}
              {lists.org && <div  className={css["listcontainer"]}>
                <Divider>Organizations</Divider>
                <VirtualList
                  dataSize={data.user.organizations.nodes.length}
                  focusableScrollbar={null}
                  itemRenderer={renderItem({ items: data.user.organizations.nodes})}
                  itemSize={48}
                  spacing={0}
                  className={css[`listHeight${listNumber}`]}
                />
              </div>}
              {lists.fol && <div  className={css["listcontainer"]}>
                <Divider>Followers</Divider>
                <VirtualList
                  dataSize={data.user.followers.nodes.length}
                  focusableScrollbar={null}
                  itemRenderer={renderItem({ items: data.user.followers.nodes})}
                  itemSize={48}
                  spacing={0}
                  className={css[`listHeight${listNumber}`]}
                />
              </div>}
              </div>
            </div>

          )

        }</Panel>)
      }}
    </Query>
  )
});
export default DetailBase;
export {DetailBase as Detail, DetailBase};
