import React from "react"

const AssignmentRow = (props) => {

  //const {regionName, emailAddress, id, location, website} = props.region

  const timeFormatter = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
  }
  //TODO: move to util method
  const statusFormatter = (status) => {
    return status.map((statRow) => {
      var qName = props.pax.filter((item) => {
        return item.paxId === statRow.qId
      })[0].paxName
      var statusString = statusCodeMapper(statRow.status)
      return `${qName} - ${statusString}`
    }).join(", ")

  }

  const statusCodeMapper = (statCode) => {
    var result = "";
    switch(statCode) {
      case 1:
        result = "accepted"
        break;
      case 2:
        result = "rejected"
        break;
      default:
        result = "assigned"
      return result;
    }
  }

  return (
    <tr>
      <td><a href={`/region/${props.ao.regionId}/ao/${props.ao.aoId}/assignment/${props.assignment.timestamp}`}>{timeFormatter(props.assignment.timestamp)}</a></td>
      <td>{statusFormatter(props.assignment.assignmentStatus)}</td>
    </tr>
  );
}
export default AssignmentRow
