import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { createMember, fetchRegNumber } from "../services/memberService";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Skeleton } from "primereact/skeleton";

const CreateMemberForm = ({ onSuccess, onCancel }) => {
  const [member, setMember] = useState({
    regNumber: "",
    name: "",
    phone: "",
    address: "",
    registrationDate: null,
  });
  const [loading, setLoading] = useState(false);
  const [loadingRegNumber, setLoadingRegNumber] = useState(true);
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const defaultAddressPrefix = "Oruwala, Athurugiriya";

  // Fetch RegNumber on component mount
  useEffect(() => {
    const getRegNumber = async () => {
      try {
        const regNum = await fetchRegNumber();
        setMember((prev) => ({ ...prev, regNumber: regNum }));
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch registration number.",
          life: 3000,
        });
      } finally {
        setLoadingRegNumber(false);
      }
    };
    getRegNumber();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateChange = (e) => {
    setMember({ ...member, registrationDate: e.value });
    setErrors({ ...errors, registrationDate: "" });
  };

  const validateFields = () => {
    const newErrors = {};

    if (!member.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const phoneRegex = /^\d{10}$/;
    if (!member.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(member.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!member.registrationDate) {
      newErrors.registrationDate = "Registration date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      const fullAddress = `${member.address}, ${defaultAddressPrefix}`;
      const memberData = {
        ...member,
        address: fullAddress,
        registrationDate: member.registrationDate.toISOString(),
      };
      await createMember(memberData);
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Member created successfully!",
        life: 3000,
      });
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create member. Please try again.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const header = (
    <div className="flex align-items-center gap-2">
         
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Card header={header} className="shadow-2 border-round-lg max-w-30rem mx-auto">
        <form onSubmit={handleSubmit} className="p-fluid">
          {/* Registration Number Field */}
          <div className="field mb-4">
            <label htmlFor="regNumber" className="font-medium text-900 block mb-2">
              Registration Number
            </label>
            {loadingRegNumber ? (
              <Skeleton height="2.5rem" className="border-round" />
            ) : (
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon bg-gray-100 border-1 surface-border">
                  <i className="pi pi-id-card text-600" />
                </span>
                <InputText
                  id="regNumber"
                  name="regNumber"
                  value={member.regNumber}
                  disabled
                  className="w-full bg-gray-50"
                />
              </div>
            )}
            <small className="text-500 block mt-1">Auto-generated unique identifier</small>
          </div>

          <Divider />

          {/* Name Field */}
          <div className="field mb-4">
            <label htmlFor="name" className="font-medium text-900 block mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon bg-gray-100 border-1 surface-border">
                <i className="pi pi-user text-600" />
              </span>
              <InputText
                id="name"
                name="name"
                value={member.name}
                onChange={handleChange}
                required
                className={`w-full ${errors.name ? "p-invalid" : ""}`}
                placeholder="Enter member's full name"
              />
            </div>
            {errors.name && <small className="p-error block mt-1">{errors.name}</small>}
          </div>

          {/* Phone Field */}
          <div className="field mb-4">
            <label htmlFor="phone" className="font-medium text-900 block mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon bg-gray-100 border-1 surface-border">
                <i className="pi pi-phone text-600" />
              </span>
              <InputText
                id="phone"
                name="phone"
                value={member.phone}
                onChange={handleChange}
                required
                className={errors.phone ? "p-invalid" : ""}
                placeholder="0771234567"
                maxLength="10"
                keyfilter="int"
              />
            </div>
            {errors.phone && <small className="p-error block mt-1">{errors.phone}</small>}
            <small className="text-500 block mt-1">10 digits without spaces or special characters</small>
          </div>

          {/* Registration Date Field */}
          <div className="field mb-4">
            <label htmlFor="registrationDate" className="font-medium text-900 block mb-2">
              Registration Date <span className="text-red-500">*</span>
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon bg-gray-100 border-1 surface-border">
                <i className="pi pi-calendar text-600" />
              </span>
              <Calendar
                id="registrationDate"
                name="registrationDate"
                value={member.registrationDate}
                onChange={handleDateChange}
                dateFormat="yy-mm-dd"
                showIcon
                required
                className={`w-full ${errors.registrationDate ? "p-invalid" : ""}`}
                placeholder="Select registration date"
                showButtonBar
                readOnlyInput
              />
            </div>
            {errors.registrationDate && (
              <small className="p-error block mt-1">{errors.registrationDate}</small>
            )}
          </div>

          {/* Address Field */}
          <div className="field mb-4">
            <label htmlFor="address" className="font-medium text-900 block mb-2">
              Address Details
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon bg-gray-100 border-1 surface-border align-items-start pt-3">
                <i className="pi pi-map-marker text-600" />
              </span>
              <InputTextarea
                id="address"
                name="address"
                value={member.address}
                onChange={handleChange}
                placeholder="Enter house number, street, or additional address details"
                className="w-full"
                rows={3}
              />
            </div>
            <div className="bg-blue-50 border-1 border-blue-200 border-round p-2 mt-2">
              <div className="flex align-items-center gap-2 text-blue-700">
                <i className="pi pi-info-circle text-sm" />
                <span className="text-sm font-medium">Complete address will be:</span>
              </div>
              <div className="text-blue-600 text-sm mt-1">
                {member.address ? `${member.address}, ${defaultAddressPrefix}` : defaultAddressPrefix}
              </div>
            </div>
          </div>

          <Divider />

          {/* Action Buttons */}
          <div className="flex justify-content-between gap-3 pt-3">
            <div className="flex-1">
              <small className="text-500">
                Fields marked with <span className="text-red-500">*</span> are required
              </small>
            </div>
            <div className="form-button-group">
              {onCancel && (
                <Button
                  type="button"
                  label="Cancel"
                  icon="pi pi-times"
                  className="form-button"
                  onClick={onCancel}
                  disabled={loading}
                  severity="secondary"
                />
              )}
              <Button
                type="submit"
                label="Create Member"
                icon="pi pi-check"
                className="form-button"
                loading={loading}
                disabled={loadingRegNumber}
                severity="success"
              />
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};

CreateMemberForm.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default CreateMemberForm;