import React from "react"

const RegionRow = (props) => {

  //const {regionName, emailAddress, id, location, website} = props.region

return (
  <tr>
    <td><a href={"/region/"+ props.region.regionId}>{props.region.regionName}</a></td>
    <td><a href={"mailto:" + props.region.emailAddress}>{props.region.emailAddress}</a></td>
    <td>{props.region.location}</td>
    <td><a href={props.region.website}>{props.region.website}</a></td>
  </tr>
  );
}
export default RegionRow
