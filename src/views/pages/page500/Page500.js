import React from 'react';
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Container, Grid, Icon } from "semantic-ui-react";

const Page500 = () => (
    <div className="c-app c-default-layout flex-row align-items-center">
      <Container>
        <Grid.Row className="justify-content-center">
          <Grid.Column md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">500</h1>
              <h4 className="pt-3">Houston, we have a problem!</h4>
              <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
            </span>
            <CInputGroup className="input-prepend">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-magnifying-glass" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput size="16" type="text" placeholder="What are you looking for?" />
              <CInputGroupAppend>
                <CButton color="info">Search</CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </Grid.Column>
        </Grid.Row>
      </Container>
    </div>
  );

export default Page500;
