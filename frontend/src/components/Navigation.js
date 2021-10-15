import React from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const Navigation = (props) => {

   return (
     <Navbar bg="light" expand="lg">
       <Container>
         <Navbar.Brand href="#home">F3 Scheduler</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="me-auto">
             <Nav.Link href="/regions">Regions</Nav.Link>
             <Nav.Link href="/region/the-fort">My Region</Nav.Link>
             <Nav.Link href="/region/the-fort/all-pax">My Pax</Nav.Link>
           </Nav>
         </Navbar.Collapse>
       </Container>
     </Navbar>
   )
}

export default Navigation
