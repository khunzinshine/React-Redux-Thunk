import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
//import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <Grid className="top-footer">
       <Grid.Row className="justify-content-center" columns={3} >

          <Grid.Column width='4' className="link">
            <a href="https://react.semantic-ui.com" className="link">
              Semantic
            </a>
          </Grid.Column>

          <Grid.Column width='4' className="text-muted" >

          </Grid.Column>

          <Grid.Column width='8' className="text-muted" >
            <p className="text-muted">Copy Right @2020</p>
          </Grid.Column>

        </Grid.Row> 
      </Grid>

    );
  }
}

export default Footer;
