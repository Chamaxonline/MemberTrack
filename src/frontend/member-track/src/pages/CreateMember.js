import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createMember } from "../services/memberService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

const CreateMember = () => {
  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    registrationDate: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createMember(member);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Member created successfully!",
        life: 3000, // Toast will disappear after 3 seconds
      });
      setTimeout(() => {
        navigate("/members"); // Redirect to member list after 3 seconds
      }, 3000);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create member. Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-d-flex p-jc-center">
      <Toast ref={toast} /> {/* Toast component for notifications */}
      <Card title="Create Member" className="p-fluid" style={{ width: "50%" }}>
        <form onSubmit={handleSubmit}>
          <div className="p-field">
            <label htmlFor="name">Name:</label>
            <InputText
              id="name"
              name="name"
              value={member.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email:</label>
            <InputText
              id="email"
              name="email"
              value={member.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="phone">Phone:</label>
            <InputText
              id="phone"
              name="phone"
              value={member.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="address">Address:</label>
            <InputText
              id="address"
              name="address"
              value={member.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-d-flex p-jc-end">
            <Button
              type="submit"
              label="Create Member"
              className="p-button-raised p-button-success"
              loading={loading}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateMember;