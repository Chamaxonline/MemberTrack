import React, { useEffect, useState } from "react";
import { fetchMembers } from "../services/memberService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data);
      } catch (err) {
        setError("Failed to fetch members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getMembers();
  }, []);

  if (loading) {
    return (
      <div className="p-d-flex p-jc-center">
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-d-flex p-jc-center">
        <Message severity="error" text={error} />
      </div>
    );
  }

  return (
    <div className="p-d-flex p-jc-center">
      <Card title="Member List" className="p-fluid" style={{ width: "80%" }}>
        <DataTable
          value={members}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="id" header="Id" sortable />
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="phone" header="Phone" sortable />
          <Column field="address" header="Address" sortable />
          <Column
            field="registrationDate"
            header="Registration Date"
            sortable
            body={(rowData) =>
              new Date(rowData.registrationDate).toLocaleDateString()
            }
          />
        </DataTable>
      </Card>
    </div>
  );
};

export default MemberList;