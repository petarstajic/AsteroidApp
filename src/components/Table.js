import React from 'react';
import { connect } from 'react-redux';

import SelectBox from './SelectBox';

import { Table } from 'semantic-ui-react';

class AsteroidTable extends React.Component {
  render() {
    return this.props.data.length ? (
      <div>
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Speed (km/h)</Table.HeaderCell>
                <Table.HeaderCell>Min. Diameter (m)</Table.HeaderCell>
                <Table.HeaderCell>Max. Diameter (m)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.data.map(row => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.date}</Table.Cell>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.speed}</Table.Cell>
                  <Table.Cell>{row.minDiameter}</Table.Cell>
                  <Table.Cell>{row.maxDiameter}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div>
          <SelectBox />
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return { data: state.data };
};

export default connect(mapStateToProps)(AsteroidTable);
