import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

const TopReq = ({ requirements }) => {
  return (
    <div>
      <div className="chart-title">
        <p>Top 10 Requirements With Higher Number Of Positive Reviews</p>
      </div>
      <MDBTable>
        <MDBTableBody>
          {requirements.map((req) => (
            <tr key={req.id}>
              <th scope="row">{req.id}</th>
              <td>{req.requirement_text}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default TopReq;
