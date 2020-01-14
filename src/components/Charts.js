import React from 'react';
import {
  Button,
  Progress,
  Label,
  Grid,
  GridRow,
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class Charts extends React.Component {
  renderCharts() {
    const colorChange = chart => {
      const x = chart[0].approachNumber_1900_1999;

      switch (true) {
        case x <= 25:
          return 'green';
        case x > 25 && x <= 45:
          return 'yellow';
        case x > 45 && x <= 75:
          return 'orange';
        case x > 75:
          return 'red';
        default:
          return 'gray';
      }
    };

    return this.props.history.map(chart => {
      return (
        <GridRow key={chart[0].id}>
          <Grid.Column width={3}>
            <Label size="large" basic>
              <Icon name="rocket" /> {chart[0].asteroidName}
            </Label>
          </Grid.Column>
          <Grid.Column width={13}>
            <Progress
              progress="value"
              color={colorChange(chart)}
              size="large"
              value={chart[0].approachNumber_1900_1999}
            />
          </Grid.Column>
        </GridRow>
      );
    });
  }

  render() {
    return (
      <Grid columns={2} padded="vertically">
        <GridRow>
          <div>
            <Link to="/">
              <Button>Nazad</Button>
            </Link>
          </div>
        </GridRow>

        {this.renderCharts()}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { history: state.history };
};

export default connect(mapStateToProps)(Charts);
