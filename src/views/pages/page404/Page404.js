import React from 'react';
import { Container, Grid } from "semantic-ui-react";

const Page404 = () => (
  <div className="c-app c-default-layout flex-row align-items-center">
    <Container>
      <Grid.Row className="justify-content-center">
        <Grid.Column md="6">
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">404</h1>
            <h4 className="pt-3">
              Oops! You {'\''} re lost.
            </h4>
            <p className="text-muted float-left">The page you are looking for was not found.</p>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Container>
  </div>
);

export default Page404;
