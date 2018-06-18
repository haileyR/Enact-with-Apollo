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

const DetailBase = kind({
  name: 'Detail',

  propTypes: {
    formData: PropTypes.object
  },

  render: ({formData, ...rest}) => (
    <Query query={GET_USER} variables={{ login: formData.userId }}>
			{({loading, data}) => {
        let listNumber = Object.values(formData).reduce((acc, currentVal) => {
          if (currentVal && typeof currentVal === "boolean") {
            acc += 1;
          }
          return acc;
        }, 0);
        return (<Panel {...rest}>
        {loading ? <p>Loading...</p> : !data || !data.user ? <p>User not found...</p> :
          (
            <div>
              <Header title={data.user.name} type="compact">
                <Image src={data.user.avatarUrl} style={{height: '3rem'}} sizing='fit'/>
              </Header>
              <div>
              {formData.repo && <div>
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
              {formData.org && <div>
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
              {formData.fol && <div>
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
