import React from "react"

const AoRow = (props) => {

  //const {regionName, emailAddress, id, location, website} = props.region
  const paxFormatter = (paxId) => {
    return props.pax.filter((thePax) => {
      return thePax.paxId === paxId
    })[0].paxName
  }

  const scheduleFormatter = (ao) => {
    // TODO: move to util
    var result = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].filter((item, idx) => {
      return idx === ao.dayOfWeek;
    })[0]
    return result + " - " + ao.startTime + " - " + ao.endTime;
  }

return (
  <tr>
    <td><a href={"/region/"+ props.ao.regionId + "/ao/" + props.ao.aoId}>{props.ao.aoName}</a></td>
    <td>{props.ao.type}</td>
    <td>{scheduleFormatter(props.ao)}</td>
    <td>{paxFormatter(props.ao.siteQId)}</td>
  </tr>
  );
}
export default AoRow
