import React, {useState, useEffect} from "react"
import AssignmentsContainer from "./AssignmentsContainer"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import {getApi, postApi} from "../Client"
import {useParams, useHistory} from "react-router-dom"


const AoDetails = (props) => {

  const history = useHistory();
  const {regionId, aoId} = useParams()
  const [ao, setAo] = useState({
    aoId: "",
    aoName:"",
    regionId: regionId,
    type: "",
    dayOfWeek: 1,
    startTime: "",
    endTime: "",
    siteQId: ""
  })

  const [pax, setPax] = useState([])

  const [showAssignments, setShowAssignments] = useState(false)

  useEffect((ao, pax) => {
    if(regionId) {
      getApi('/regions/' + regionId + "/pax", (err, data) => {
        if(err) throw(err)
        setPax(data.pax)
      })
    }

    //console.log("AO ID is " + aoId + ", and regionId is " + regionId)
    if(aoId && regionId) {
      getApi('/regions/' + regionId + "/aos/" + aoId, (err, data) => {
        if(err) throw(err)
        //console.log(data);
        setAo({...ao,
          aoId: data.aoId,
          aoName: data.aoName,
          regionId: data.regionId,
          type: data.type,
          dayOfWeek: data.dayOfWeek,
          startTime: data.startTime,
          endTime: data.endTime,
          siteQId: data.siteQId,
        });
      })
      setShowAssignments(true)
    }
  }, [aoId, regionId])

  //const {regionName, emailAddress, id, location, website} = props.region

  const myChangeHandler = (target, context) => (event) => {
    //console.log("target: " + target + ", context: " + context + ", eventVal: " + event.target.value)
    setAo({
      ...ao,
      [target]: context ? context : event.target.value,
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    alert("submitting for " + JSON.stringify(ao, null, 2))
    postApi('/regions/' + ao.regionId + "/aos", ao, function(err, data) {
      if(err) console.log(JSON.stringify(err, null, 2))
      setAo({...ao,
        aoId: data.aoId,
        aoName: data.aoName,
        regionId: data.regionId,
        type: data.type,
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        endTime: data.endTime,
        siteQId: data.siteQId,
      });
      setShowAssignments(true)
    })
  }

  const newAssignment = () => {
    let path = "/region/" + regionId + "/ao/" + aoId + "/assignment/"
    history.push(path);
  }

    return (
      <Container>
        <Container className="p-3">
          <Row>
            <Col>
              <h1>{!ao.aoName ? "New AO" : ao.aoName }</h1>
            </Col>
            <Col className="offset-mb-6">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="gridAoName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" value={ao.aoName} onChange={myChangeHandler("aoName")}/>
              </Form.Group>

              <Form.Group as={Col} controlId="grid">
                <Form.Label>Type</Form.Label>
                <Form.Control placeholder="Enter type" value={ao.type} onChange={myChangeHandler("type")} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="gridStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control placeholder="Enter start time" value={ao.startTime} onChange={myChangeHandler("startTime")}/>
              </Form.Group>

              <Form.Group as={Col} controlId="gridStopTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control placeholder="Enter end time" value={ao.endTime} onChange={myChangeHandler("endTime")}/>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="gridDayOfWeek">
                <Form.Label>Day Of The Week</Form.Label>
                <div>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <Form.Check
                      inline
                      label={day}
                      name="DayOfWeek"
                      type="radio"
                      checked={ao.dayOfWeek === index}
                      id={`dayOfWeek-${index}`}
                      key={`dayOfWeek-${index}`}
                      onChange={myChangeHandler("dayOfWeek", index)}
                    />
                  ))}
                </div>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="gridSiteQId">
                <Form.Label>Site Q</Form.Label>

                <Form.Control as="select" aria-label="Site Q" onChange={myChangeHandler("siteQId")}>
                  <option key={"none"} value="none">Select Site Q</option>
                  {pax.map((member) => {
                    if(ao.siteQId === member.paxId) {
                      // LAME
                      return(<option key={member.paxId} value={member.paxId} selected>{member.paxName}</option>)
                    } else {
                      return(<option key={member.paxId} value={member.paxId} >{member.paxName}</option>)
                    }
                  })
                  }
                </Form.Control>
              </Form.Group>
            </Row>

          </Form>
        </Container>
        {showAssignments ?
          <Container className="p-3">
            <Row>
              <AssignmentsContainer ao={ao} pax={pax}/>
            </Row>
            <Row>
              <Col>
                <Button variant="primary" type="button" onClick={newAssignment}>New Assignment</Button>
              </Col>
            </Row>
          </Container> : <></>
        }
      </Container>
    );
}
export default AoDetails
