import React, {useState, useEffect} from "react"
import AssignmentRow from "./AssignmentRow"
import Container from "react-bootstrap/Container"
import Table from "react-bootstrap/Table"
import {getApi} from "../Client"

const AssignmentsContainer = (props) => {

  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    if(props.ao.aoId && props.ao.regionId) {
      getApi('/regions/' + props.ao.regionId + "/aos/" + props.ao.aoId + "/assignments", (err, data) => {
        if(err) throw(err)
        setAssignments(data.assignments);
      })
    }
  }, [props.ao.regionId, props.ao.aoId])

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>When</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {!assignments ?
            <tr><td colSpan="4">Loading</td></tr> : assignments.map(assignment => {
              //console.log(assignment);
              return(<AssignmentRow key={assignment.timestamp} ao={props.ao} assignment={assignment} pax={props.pax}/>)
            })}
        </tbody>
      </Table>
    </Container>
  );
}
export default AssignmentsContainer
