import React, {useState, useEffect} from "react"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import {getApi, postApi} from "../Client"
import {useParams} from "react-router-dom"


const AssignmentDetails = (props) => {

  const {regionId, aoId, timestamp} = useParams()
  const [dateStr, setDateStr] = useState("")
  const [assignment, setAssignment] = useState({
    aoId: aoId,
    timestamp: 0,
    assignmentStatus: [{
      qId: ""
    }]
  })
  const [ao, setAo] = useState({
    aoId: "",
    aoName:"",
    regionId: regionId,
    type: "",
    schedule: "",
    siteQId: ""
  })
  const [pax, setPax] = useState([])

  useEffect((assignment, ao) => {
    //console.log("AO ID is " + aoId + ", and regionId is " + regionId)
    if(regionId) {
      getApi('/regions/' + regionId + "/pax", (err, data) => {
        if(err) throw(err)
        setPax(data.pax)
      })
    }

    if(aoId && regionId) {
      getApi('/regions/' + regionId + "/aos/" + aoId, (err, data) => {
        if(err) throw(err)
        //console.log(data);
        setAo({...ao,
          aoId: data.aoId,
          aoName: data.aoName,
          regionId: data.regionId,
          type: data.type,
          schedule: data.schedule,
          siteQId: data.siteQId,
        });
      })
      if(timestamp) {
        getApi('/regions/' + regionId + "/aos/" + aoId + "/assignments/" + timestamp, (err, data) => {
          if(err) throw(err)
          //console.log(data);
          setAssignment({...assignment,
            aoId: data.aoId,
            timestamp: data.timestamp,
            assignmentStatus: data.assignmentStatus
          });
        })
      }
    }
  }, [aoId, regionId, timestamp])

  //const {regionName, emailAddress, id, location, website} = props.region

  const timestampHandler = target => (event) => {
    //this.state[target] = event.target.value
    setAssignment({
      ...assignment,
      [target]: new Date(event.target.value).getTime(),
    })
    setDateStr(event.target.value)
  }

  const assignmentHandler = (target, index) => (event) => {
    console.log("Got " + target + " for " + index + " with " + event.target.value)
    const newAssignment = assignment.assignmentStatus
    newAssignment[index] = {
      qId: event.target.value,
      statusId: newAssignment[index].statusId || 0
    }
    setAssignment({...assignment,
      assignmentStatus: newAssignment
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    alert("submitting for " + JSON.stringify(assignment, null, 2))
    postApi('/regions/' + regionId + "/aos/" + aoId + "/assignments", assignment, function(err, data) {
      if(err) console.log(JSON.stringify(err, null, 2))
      alert("got back: " + JSON.stringify(data, null, 2))
      setAssignment({...assignment,
        aoId: data.aoId,
        timestamp: data.timestamp,
        assignmentStatus: data.assignmentStatus
      });
      setDateStr(new Date(data.timestamp).toLocaleDateString())
    })
  }


    return (
      <Container>
        <h1>{ao.aoName}</h1>
        <Container>
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="gridDate">
                <Form.Label>Scheduled Date</Form.Label>
                <Form.Control type="date" placeholder="Enter Date" value={dateStr} onChange={timestampHandler("timestamp")}/>
              </Form.Group>
            </Row>
            <Row>
              { assignment.assignmentStatus.map((q, idx) => {
                return(<Form.Group key={idx} as={Col} controlId="gridQs">
                  <Form.Label>QIC</Form.Label>
                  <Form.Control as="select" aria-label="Q" onChange={assignmentHandler("siteQId", idx)}>
                    <option key="none">Select Q</option>
                    {pax.map((member) => {
                      if(q.paxId === member.paxId) {
                        // LAME
                        return(<option key={member.paxId} value={member.paxId} selected>{member.paxName}</option>)
                      } else {
                        return(<option key={member.paxId} value={member.paxId} >{member.paxName}</option>)
                      }
                    })
                    }
                  </Form.Control>
                </Form.Group>)
              })}
            </Row>

            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Container>
    );
}
export default AssignmentDetails
