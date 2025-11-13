import React, { useEffect, useState } from "react";
import { fetchMembers } from "../services/memberService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import CreateMemberForm from "../components/CreateMemberForm";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  const getMembers = async () => {
    setLoading(true);
    try {
      const data = await fetchMembers();
      setMembers(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch members. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleMemberCreated = () => {
    setDisplayDialog(false);
    getMembers(); // Refresh the member list
  };

  const openDialog = () => {
    setDisplayDialog(true);
  };

  const closeDialog = () => {
    setDisplayDialog(false);
  };

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

  // Toolbar template
  const leftToolbarTemplate = () => {
    return (
      <div className="flex align-items-center">
        <h2 className="m-0">Members</h2>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="New Member"
        icon="pi pi-plus"
        className="p-button-success"
        onClick={openDialog}
      />
    );
  };

  // DataTable header template
  const header = (
    <div className="flex justify-content-between align-items-center">
      <h5 className="m-0">Manage Members</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search members..."
        />
      </span>
    </div>
  );

  // Column body templates
  const regNumberBodyTemplate = (rowData) => {
    return <Tag value={rowData.regNumber} severity="info" />;
  };

  const phoneBodyTemplate = (rowData) => {
    return (
      <span>
        <i className="pi pi-phone" style={{ marginRight: "0.5rem" }} />
        {rowData.phone}
      </span>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return new Date(rowData.registrationDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="card">
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      />

      <Card>
        <DataTable
          value={members}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          dataKey="id"
          globalFilter={globalFilter}
          header={header}
          emptyMessage="No members found."
          responsiveLayout="scroll"
          stripedRows
          showGridlines
        >
          <Column
            field="regNumber"
            header="Reg #"
            sortable
            body={regNumberBodyTemplate}
            style={{ minWidth: "10rem" }}
          />
          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="phone"
            header="Phone"
            sortable
            body={phoneBodyTemplate}
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="address"
            header="Address"
            sortable
            style={{ minWidth: "16rem" }}
          />
          <Column
            field="registrationDate"
            header="Registration Date"
            sortable
            body={dateBodyTemplate}
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </Card>

      <Dialog
        visible={displayDialog}
        style={{ width: "650px", maxWidth: "90vw" }}
        breakpoints={{ "960px": "90vw", "640px": "95vw" }}
        onHide={closeDialog}
        modal
        draggable={false}
        header={
          <div className="flex align-items-center gap-2">
            <i className="pi pi-user-plus text-primary text-2xl" />
            <span className="font-bold text-xl">Create New Member</span>
          </div>
        }
      >
        <CreateMemberForm onSuccess={handleMemberCreated} onCancel={closeDialog} />
      </Dialog>
    </div>
  );
};

export default MemberList;