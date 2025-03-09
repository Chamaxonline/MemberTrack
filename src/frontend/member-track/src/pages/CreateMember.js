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
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const toast = useRef(null);
  const navigate = useNavigate();
  const defaultAddressPrefix = "Oruwala, Athurugiriya"; // Default address prefix
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
    // Clear errors when the user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = () => {
    const newErrors = {};

    // Validate name
    if (!member.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!member.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(member.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!member.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(member.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Validate address
    if (!member.address.trim()) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submitting
    if (!validateFields()) {
      return; // Stop submission if validation fails
    }

    setLoading(true);

    try {
      const fullAddress = `${member.address}, ${defaultAddressPrefix}`;
      const memberData = { ...member, address: fullAddress };
      await createMember(memberData);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Member created successfully!",
        life: 3000,
      });
      setTimeout(() => {
        navigate("/members");
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
      <Toast ref={toast} />
      <Card title="Create Member" className="p-fluid" style={{ width: "50%" }}>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="p-field">
            <label htmlFor="name">Name:</label>
            <InputText
              id="name"
              name="name"
              value={member.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <small className="p-error">{errors.name}</small>
            )}
          </div>

          {/* Email Field */}
          <div className="p-field">
            <label htmlFor="email">Email:</label>
            <InputText
              id="email"
              name="email"
              value={member.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <small className="p-error">{errors.email}</small>
            )}
          </div>

          {/* Phone Field */}
          <div className="p-field">
            <label htmlFor="phone">Phone:</label>
            <InputText
              id="phone"
              name="phone"
              value={member.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && (
              <small className="p-error">{errors.phone}</small>
            )}
          </div>

          {/* Address Field */}
          <div className="p-field">
            <label htmlFor="address">Address:</label>
            <InputText
              id="address"
              name="address"
              value={member.address}
              onChange={handleChange}
              placeholder={`Add additional address details (e.g., street, house number)`}
              required
            />
            {errors.address && (
              <small className="p-error">{errors.address}</small>
            )}
          </div>

          {/* Submit Button */}
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