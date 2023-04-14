import React, { Fragment } from 'react'
import { Placeholder, Row } from 'react-bootstrap'

const LoadingBars = ({ classes }) => {
  return (
    <Fragment>
      <Row className={classes}>
        <Placeholder as='p' animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as='p' animation="glow">
          <Placeholder xs={10} />
        </Placeholder>
        <Placeholder as='p' animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
      </Row>
    </Fragment>
  )
}

export default LoadingBars