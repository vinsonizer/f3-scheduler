import React from "react"
import RegionsContainer from "./RegionsContainer"
import PaxContainer from "./PaxContainer"
import Header from "./Header"
import RegionDetails from "./RegionDetails"
import PaxDetails from "./PaxDetails"
import AoDetails from "./AoDetails"
import AssignmentDetails from "./AssignmentDetails"
import {Route, Switch, BrowserRouter} from "react-router-dom"


const AppContainer = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/region/:regionId/ao/:aoId/assignment/:timestamp">
          <Header/>
          <AssignmentDetails/>
        </Route>
        <Route path="/region/:regionId/ao/:aoId/assignment">
          <Header/>
          <AssignmentDetails/>
        </Route>
        <Route path="/region/:regionId/ao/:aoId">
          <Header/>
          <AoDetails/>
        </Route>
        <Route path="/region/:regionId/ao">
          <Header/>
          <AoDetails/>
        </Route>
        <Route path="/region/:regionId/pax/:paxId">
          <Header/>
          <PaxDetails/>
        </Route>
        <Route path="/region/:regionId/pax">
          <Header/>
          <PaxDetails/>
        </Route>
        <Route path="/region/:regionId/all-pax">
          <Header/>
          <PaxContainer/>
        </Route>
        <Route exact path="/regions">
          <Header/>
          <RegionsContainer/>
        </Route>
        <Route path="/region/:regionId">
          <Header/>
          <RegionDetails/>
        </Route>
        <Route path="/region">
          <Header/>
          <RegionDetails/>
        </Route>
        <Route path="*">
          <Header/>
          <RegionsContainer/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}


export default AppContainer
