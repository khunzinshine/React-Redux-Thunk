import React, { Component } from "react";
import { Segment, Grid } from "semantic-ui-react";
import LineChartComponent from "../../components/chart/LineChartComponent";
import BarChartComponent from "../../components/chart/BarChartComponent";
import PieChartComponent from "../../components/chart/PieChartComponent";
import PieChartCellComponent from "../../components/chart/PieCharCellComponent";
import "./dashboard.scss";

class Dashboard extends Component {
  render() {
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <BarChartComponent />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <PieChartComponent />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <PieChartCellComponent />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <LineChartComponent />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Dashboard;
