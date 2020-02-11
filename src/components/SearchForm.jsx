import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Formik, Field, Form } from 'formik'
import { withRouter } from 'react-router-dom'
import { isLoading, fetchSetlists } from '../actions/setlists'

class SearchForm extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Formik
          initialValues={{ artist: '', tour: '', city: '', country: '' }}
          onSubmit={(values, { setSubmitting }) => {
            const { isLoadingConnect } = this.props

            const {
              history: { push }
            } = this.props
            const qs = queryString.stringify(values)

            push({
              search: `#${qs}`
            })
            isLoadingConnect(true)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                className="form-control"
                type="text"
                name="artist"
                placeholder="Enter artist (optional)"
              />
              <Field
                className="form-control"
                type="text"
                name="tour"
                placeholder="Enter tour name (optional)"
              />
              <Field
                className="form-control"
                type="text"
                name="city"
                placeholder="Enter city (optional)"
              />
              <Field
                className="form-control"
                type="text"
                name="country"
                placeholder="Enter country (optional)"
              />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

SearchForm.propTypes = {
  isLoadingConnect: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    isLoadingConnect: val => dispatch(isLoading(val)),
    fetchSetls: () => dispatch(fetchSetlists())
  }
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(SearchForm)
