import React from 'react';
import { connect } from 'react-redux';
import {
  storeSelectedAsteroids,
  fetchHistory,
  deleteSelectedAsteroids,
  deleteSelected
} from '../actions';
import { Link } from 'react-router-dom';
import { List, Segment, Select, Grid, Button, Icon } from 'semantic-ui-react';

class SelectBox extends React.Component {
  renderList() {
    return this.props.selected.map(el => {
      return (
        <List.Item key={el.id}>
          <List.Content floated="right" verticalAlign="middle">
            <Button icon compact onClick={() => this.handleList(el)}>
              <Icon name="x" />
            </Button>
          </List.Content>

          <List.Content verticalAlign="middle">{el.name}</List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <Grid padded="vertically">
        <Grid.Row>
          <Grid.Column width={11}>
            <Select
              fluid
              placeholder="Select Asteroids"
              options={this.props.asteroids.map(el => ({
                key: el.id,
                text: el.name,
                value: el.id
              }))}
              onChange={(event, value) => this.handleSelect(value)}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <div style={{ overflow: 'auto', height: 150 }}>
                <List verticalAlign="middle" divided>
                  {this.renderList()}
                </List>
              </div>
            </Segment>

            <Link to="charts">
              <Button fluid onClick={this.showCharts}>
                Number of Approaches to Earth
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  handleList = element => {
    this.props.deleteSelected(element);
  };

  handleSelect = value => {
    let x = [];
    let temp = true;
    this.props.asteroids.forEach(el => {
      if (value.value === el.id) x = el;
    });
    this.props.selected.forEach(el => {
      if (el === x) {
        temp = false;
        alert('Asteroid is alredy selected');
      }
    });
    if (temp) {
      this.props.storeSelectedAsteroids(x);
    }
  };

  showCharts = () => {
    if (this.props.history.length > 0) {
      this.props.deleteSelectedAsteroids();
    }

    this.props.selected.forEach(el => this.props.fetchHistory(el.url));
  };
}

const mapStateToProps = state => {
  return {
    asteroids: state.data,
    selected: state.selected,
    history: state.history
  };
};

export default connect(mapStateToProps, {
  storeSelectedAsteroids,
  fetchHistory,
  deleteSelectedAsteroids,
  deleteSelected
})(SelectBox);
