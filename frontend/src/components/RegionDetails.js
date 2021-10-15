import React, {useState, useEffect} from "react"
import AosContainer from "./AosContainer"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import {getApi, postApi} from "../Client"
import {useParams, useHistory} from "react-router-dom"

const RegionDetails = (props) => {

  const {regionId} = useParams()
  const history = useHistory();

  const newAo = () => {
    let path = "/region/" + regionId + "/ao"
    history.push(path);
  }

  const [pax, setPax] = useState([])

  const [region, setRegion] = useState({
    regionId: "",
    regionName:"",
    emailAddress: "",
    location: "",
    website: ""
  })

  const [showAos, setShowAos] = useState(false)

  useEffect((region) => {
    if(regionId) {
      getApi('/regions/' + regionId, (err, data) => {
        if(err) throw(err)
        setRegion({...region,
          regionId: data.regionId,
          regionName: data.regionName,
          emailAddress: data.emailAddress,
          location: data.location,
          website: data.website,
        });
        setShowAos(true)
      })
      getApi('regions/' + regionId + "/pax", (err, data) => {
        if(err) throw(err)
        setPax(data.pax)
      })
    }
  }, [regionId])

  //const {regionName, emailAddress, id, location, website} = props.region

  const myChangeHandler = target => (event) => {
    //this.state[target] = event.target.value
    setRegion({
      ...region,
      [target]: event.target.value,
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    //alert("submitting for " + JSON.stringify(region, null, 2))
    postApi('/regions', region, function(err, data) {
      if(err) console.log(err)
      alert("got back: " + JSON.stringify(data, null, 2));
      setRegion({...region,
        id: data.region.id,
        regionName: data.region.regionName,
        emailAddress: data.region.emailAddress,
        location: data.region.location,
        website: data.region.website,
        })
        setShowAos(true)
    })
  }


    return (
      <Container>
        <Container>
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="gridRegionName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" value={region.regionName} onChange={myChangeHandler("regionName")}/>
              </Form.Group>

              <Form.Group as={Col} controlId="gridEmailAddress">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={region.emailAddress} onChange={myChangeHandler("emailAddress")} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="gridLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control placeholder="Enter location" value={region.location} onChange={myChangeHandler("location")}/>
              </Form.Group>

              <Form.Group as={Col} controlId="gridWebsite">
                <Form.Label>Website</Form.Label>
                <Form.Control placeholder="Enter website" value={region.website} onChange={myChangeHandler("website")}/>
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
          {showAos ?
            <Container className="pt-3">
              <Row>
                <AosContainer regionId={region.regionId} pax={pax}/>
              </Row>
            </Container> : <></>}
          <Row>
            <Col className="offset-md-10">
              <Button variant="primary" type="button" onClick={newAo}>Add AO</Button>
            </Col>
          </Row>
        </Container>
      </Container>
        );
}
export default RegionDetails
