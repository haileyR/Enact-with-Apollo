import {Header, Panel} from '@enact/moonstone/Panels';
import Input from '@enact/moonstone/Input';
import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import IconButton from '@enact/moonstone/IconButton';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

const SearchBase = kind({
  name: 'Detail',

  propTypes: {
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
    userId: PropTypes.string
  },

  handlers: {
    onSearch: (ev, props) => {
      props.onSearch();
    },
    onInputChange: (ev, props) => {
      props.onChange('userId', ev.value);
    },
    onRepoSelection: (value, props) => {
      props.onChange('repo', value.selected);
    },
    onFolSelection: (value, props) => {
      props.onChange('fol', value.selected);
    },
    onOrgSelection: (value, props) => {
      props.onChange('org', value.selected);
    }
  },

  render: ({onInputChange, onSearch, onRepoSelection, onFolSelection, onOrgSelection, ...rest}) => (
          <Panel {...rest}>
            <Header title="Dev checks" type="compact"/>
            <Input placeholder="Github id" onChange={onInputChange}/>
            <IconButton onClick={onSearch} small={false} backgroundOpacity="transparent">search</IconButton>
            <FormCheckboxItem onToggle={onRepoSelection}>Repositories</FormCheckboxItem>
            <FormCheckboxItem onToggle={onFolSelection}>Followers</FormCheckboxItem>
            <FormCheckboxItem onToggle={onOrgSelection}>Organizations</FormCheckboxItem>
          </Panel>
        )
});

export default SearchBase;
export {SearchBase as Search, SearchBase};
