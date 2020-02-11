import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import Sticky from 'react-sticky-el'
import SetlistList from '../components/SetlistList'
import SearchForm from '../components/SearchForm'

import '../styles/home.scss'

const Home = props => {
  const { location } = props
  return (
    <div>
      <Row>
        <Col
          className="setlist-col"
          xs={{ order: 2 }}
          sm={{ span: 12, order: 2 }}
          lg={{ span: 8, order: 1 }}
          xl="9"
        >
          <SetlistList location={location} />
        </Col>
        <Col
          className="form-col"
          xs={{ order: 1 }}
          sm={{ span: 12, order: 1 }}
          lg={{ span: 4, order: 2 }}
          xl="3"
        >
          <Sticky
            className="sticky-form"
            style={{ marginTop: '50px' }}
            topOffset={-50}
          >
            <SearchForm />
          </Sticky>
        </Col>
      </Row>
    </div>
  )
}

Home.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default Home
