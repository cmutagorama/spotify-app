import React, { useState } from 'react';

import { initiateGetResult } from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import Loader from './Loader';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');
  const { isValidSession, history } = props;

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory('albums');
      });
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Header />
          <SearchForm handleSearch={handleSearch} />
          <Loader show={isLoading}>Loading...</Loader>
          <SearchResult
            result={result}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            isValidSession={isValidSession}
          />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist
  };
};

export default connect(mapStateToProps)(Dashboard);