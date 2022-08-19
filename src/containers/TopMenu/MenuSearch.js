import React from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import './TopSearch.scss';


const TopSearch = () => {

    return (
      <Search
        loading={isLoading}
        placeholder={'Search...'}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
      />
    );
}

export default TopSearch;
