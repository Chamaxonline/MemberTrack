import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import CreateMemberForm from "../components/CreateMemberForm";

const CreateMember = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => {
      navigate("/members");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/members");
  };

  // Card header template
  const cardHeader = (
    <div className="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border">
     
      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-text p-button-plain"
        onClick={handleCancel}
        tooltip="Back to Members"
        tooltipOptions={{ position: "left" }}
      />
    </div>
  );

  return (
    <div className="flex justify-content-center p-4" style={{ minHeight: "80vh" }}>
      <Card
        header={cardHeader}
        className="shadow-3"
        style={{ width: "650px", maxWidth: "100%" }}
      >
        <div className="p-3">
          <CreateMemberForm onSuccess={handleSuccess} onCancel={handleCancel} />
        </div>
      </Card>
    </div>
  );
};

export default CreateMember;