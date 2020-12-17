import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';
import {
  Author,
  Avatar,
  Bio,
  Container,
  Header,
  Info,
  Name,
  OwnerAvatar,
  Starred,
  Stars,
  Title
} from './styles';

export default class User extends Component {
  constructor() {
    super();
    this.state = { stars: [], loading: true, page: 1, refreshing: false };
  }

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const { stars } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page }
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      loading: false,
      page,
      refreshing: false
    });
  };

  loadMore = () => {
    const { page } = this.state;

    const newPage = page + 1;

    this.load(newPage);
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.load);
  };

  handleNavigate = (repository) => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { route } = this.props;
    const { stars, loading, refreshing } = this.state;

    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Container>
            <ActivityIndicator size="large" color="#999" />
          </Container>
        ) : (
          <Stars
            data={stars}
            keyExtractor={(star) => String(star.id)}
            onEndReachedThreshold={0.1}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = {
  route: PropTypes.shape().isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};
