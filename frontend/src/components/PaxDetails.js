import React, {useState, useEffect} from "react"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import {getApi, postApi} from "../Client"
import {useParams} from "react-router-dom"


const PaxDetails = (props) => {

  const {regionId, paxId} = useParams()
  const [thePax, setThePax] = useState({
      paxId: paxId,
      paxName: "",
      regionId: regionId,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
      socialAccounts: ""
  })

  useEffect((thePax) => {
    console.log("inside with " + regionId + " and " + paxId)
    if(regionId && paxId) {
      getApi('/regions/' + regionId + "/pax/" + paxId, (err, data) => {
        console.log(`got ${JSON.stringify(data)}`)
        if(err) throw(err)
        setThePax({...thePax,
          paxId: data.paxId,
          paxName: data.paxName,
          regionId: data.regionId,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          emailAddress: data.emailAddress,
          socialAccounts: data.socialAccounts
      })
      })
    }
  }, [paxId, regionId])

  //const {regionName, emailAddress, id, location, website} = props.region

  const myChangeHandler = (target, context) => (event) => {
    //console.log("target: " + target + ", context: " + context + ", eventVal: " + event.target.value)
    setThePax({
      ...thePax,
      [target]: context ? context : event.target.value,
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    alert("submitting for " + JSON.stringify(thePax, null, 2))
    postApi('/regions/' + regionId + "/pax", thePax, function(err, data) {
      if(err) console.log(JSON.stringify(err, null, 2))
      setThePax({...thePax,
        paxId: data.pax.paxId,
        paxName: data.pax.paxName,
        regionId: data.pax.regionId,
        firstName: data.pax.firstName,
        lastName: data.pax.lastName,
        phoneNumber: data.pax.phoneNumber,
        emailAddress: data.pax.emailAddress,
        socialAccounts: data.pax.socialAccounts
    })
    alert("post save is " + JSON.stringify(thePax, null, 2))
  })
  }


    return (
      <Container>
        <h1>{!thePax.paxName ? "New PAX" : thePax.paxName }</h1>
        <Container className="p-3">
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="gridName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" value={thePax.paxName} onChange={myChangeHandler("paxName")}/>
              </Form.Group>

              <Form.Group as={Col} controlId="gridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Enter email" type="email" value={thePax.email} onChange={myChangeHandler("emailAddress")} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="gridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="Enter first name" value={thePax.firstName} onChange={myChangeHandler("firstName")}/>
              </Form.Group>

              <Form.Group as={Col} controlId="gridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Enter last name" value={thePax.lastName} onChange={myChangeHandler("lastName")}/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="gridPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder="Enter phone number" value={thePax.phoneNumber} onChange={myChangeHandler("phoneNumber")}/>
              </Form.Group>

            </Row>

            <Row>
              <Col className="pt-3 pb-3">
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
export default PaxDetails
