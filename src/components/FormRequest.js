import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { formRequest } from '../actions';
import AsteroidTable from './Table';
import { deleteSelectedState } from '../actions';
import { Grid, GridRow, Popup } from 'semantic-ui-react';

class FormRequest extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Popup
          content={error}
          open
          color="red"
          position="right center"
          trigger={<div />}
        />
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = ` inline fields   ${
      meta.error && meta.touched ? 'error' : ''
    }`;
    return (
      <div>
        <div className={className}>
          <div className="three wide field">
            <label>{label}</label>
          </div>
          <div className="thirteen wide field">
            <input {...input} autoComplete="off" placeholder="YYYY-MM-DD" />
          </div>
        </div>
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.formRequest(formValues);
  };

  render() {
    return (
      <Grid columns="equal" padded>
        <GridRow>
          <Grid.Column width={8}>
            <div className="ui form ">
              <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error 
              "
              >
                <Field
                  name="startDate"
                  component={this.renderInput}
                  label="Start Date:"
                />
                <Field
                  name="endDate"
                  component={this.renderInput}
                  label="End Date:"
                />
                <div className="equal width fields">
                  <div className=" field ">
                    <button
                      style={{ marginRight: 14 }}
                      className="ui right floated button"
                      onClick={this.props.deleteSelectedState}
                    >
                      Show Asteroids
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Grid.Column>
        </GridRow>
        <GridRow>
          <Grid.Column>
            <AsteroidTable />
          </Grid.Column>
        </GridRow>
      </Grid>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.startDate) {
    errors.startDate = 'You must enter a start date';
  }

  if (!formValues.endDate) {
    errors.endDate = 'You must enter a end date';
  }

  if (formValues.endDate && formValues.startDate) {
    const msPerDay = 1000 * 60 * 60 * 24;

    const dateDiffInDays = (a, b) => {
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / msPerDay);
    };

    const a = new Date(formValues.startDate),
      b = new Date(formValues.endDate),
      difference = dateDiffInDays(a, b);

    if (difference > 7) {
      errors.endDate = 'Maximum difference between dates is 7 days!';
    }
  }

  return errors;
};

const formWrapped = reduxForm({
  form: 'Request',
  validate
})(FormRequest);

export default connect(null, { formRequest, deleteSelectedState })(formWrapped);
