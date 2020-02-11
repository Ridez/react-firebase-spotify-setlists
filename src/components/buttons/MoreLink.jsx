import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const MoreLink = props => {
  const convertUrl = str => {
    return str.replace(/\s+/g, '-').toLowerCase()
  }

  const { setlist } = props

  return (
    <Link
      to={`/setlist/${convertUrl(setlist.artist.name)}/${convertUrl(
        setlist.venue.name
      )}-${convertUrl(setlist.venue.city.name)}-${convertUrl(
        setlist.venue.city.country.name
      )}/${setlist.id}`}
    >
      <Button className="more-btn" variant="primary">
        More
      </Button>
    </Link>
  )
}

MoreLink.propTypes = {
  setlist: PropTypes.shape({
    artist: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        country: PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      })
    }),
    id: PropTypes.string.isRequired
  }).isRequired
}

export default MoreLink
