import React, {useState, useEffect} from "react"
import RegionRow from "./RegionRow"
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import {getApi} from "../Client"

const RegionsContainer = (props) => {

  const [regions, setRegions] = useState([])

  useEffect(() => {
    getApi('/regions', (err, data) => {
      if(err) throw(err)
      setRegions(data.regions);
    })
  }, [])


  return (
    <Container className="p-3">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Region Name</th>
            <th>Email Address</th>
            <th>Location</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {!regions ?
            <tr><td colSpan="4">Loading</td></tr> : regions.map(region => {
              //console.log(region);
              return(<RegionRow region={region} key={region.regionId}/>)
            })}
        </tbody>
      </Table>
    </Container>
  );
}
export default RegionsContainer
