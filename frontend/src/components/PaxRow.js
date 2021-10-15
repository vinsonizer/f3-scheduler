import React from "react"

const PaxRow = (props) => {

return (
  <tr>
    <td><a href={`/region/${props.pax.regionId}/pax/${props.pax.paxId}`}>{props.pax.paxName}</a></td>
    <td>{props.pax.emailAddress}</td>
  </tr>
  );
}
export default PaxRow
