import PropTypes from 'prop-types';
import React from 'react';
import { WebView } from 'react-native-webview';
// import { Container } from './styles';

export default function Repository(props) {
  const { route } = props;
  const { repository } = route.params;
  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
}

Repository.propTypes = {
  route: PropTypes.shape().isRequired
};
