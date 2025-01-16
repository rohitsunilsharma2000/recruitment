"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
export default function AddDepartmentModal({ initialData, onClose, onSave }) {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      departmentName: initialData.departmentName || "",
      parentDepartmentId: initialData.parentDepartmentId || "",
      departmentLead: initialData.departmentLead || { firstName: "", lastName: "", email: "" },
      attachmentPath: initialData.attachmentPath || "",
    },
  });
  // Handling form submission
  const handleSave = (data) => {
    alert("Call depart create api");
    // Call the parent’s onSave callback with updated data
    onSave(data);
    // Close the modal
    onClose();
  };
  // Dynamically setting form values when the component mounts
  React.useEffect(() => {
    setValue("departmentLead.firstName", initialData.departmentLead.firstName);
    setValue("departmentLead.lastName", initialData.departmentLead.lastName);
    setValue("departmentLead.email", initialData.departmentLead.email);
  }, [initialData, setValue]);
  // Log error messages
  React.useEffect(() => {
    if (errors.departmentName) {
      console.error("Department Name Error:", errors.departmentName.message);
    }
    if (errors.parentDepartmentId) {
      console.error("Parent Department Error:", errors.parentDepartmentId.message);
    }
    if (errors.departmentLead?.firstName) {
      console.error("Department Lead First Name Error:", errors.departmentLead.firstName.message);
    }
    if (errors.departmentLead?.lastName) {
      console.error("Department Lead Last Name Error:", errors.departmentLead.lastName.message);
    }
    if (errors.departmentLead?.email) {
      console.error("Department Lead Email Error:", errors.departmentLead.email.message);
    }
    if (errors.attachmentPath) {
      console.error("Attachment Path Error:", errors.attachmentPath.message);
    }
  }, [errors]);
  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Department</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(handleSave)}>
              {/* Department Name */}
              <div className="mb-3">
                <label htmlFor="departmentName" className="form-label">Department Name</label>
                <Controller
                  control={control}
                  name="departmentName"
                  render={({ field }) => <input {...field} className="form-control" />}
                  rules={{ required: "Department Name is required" }}
                />
                {errors.departmentName && <p className="text-danger">{errors.departmentName.message}</p>}
              </div>
              {/* Parent Department */}
              <div className="mb-3">
                <label htmlFor="parentDepartmentId" className="form-label">Parent Department</label>
                <Controller
                  control={control}
                  name="parentDepartmentId"
                  render={({ field }) => (
                    <select {...field} className="form-select">
                      <option value="">Select Parent Department</option>
                      <option value="1">Engineering</option>
                      <option value="2">HR</option>
                    </select>
                  )}
                  rules={{ required: "Parent Department is required" }} // Adding the required validation rule
                />
                {errors.parentDepartmentId && <p className="text-danger">{errors.parentDepartmentId.message}</p>}
              </div>
              {/* Department Lead */}
              <div className="mb-3">
                <label className="form-label">Department Lead</label>
                <div className="d-flex">
                  <Controller
                    control={control}
                    name="departmentLead.firstName"
                    render={({ field }) => <input {...field} className="form-control me-2" placeholder="First Name" />}
                    rules={{ required: "First Name is required" }}
                  />
                  {errors.departmentLead?.firstName && <p className="text-danger">{errors.departmentLead.firstName.message}</p>}
                  <Controller
                    control={control}
                    name="departmentLead.lastName"
                    render={({ field }) => <input {...field} className="form-control me-2" placeholder="Last Name" />}
                    rules={{ required: "Last Name is required" }}
                  />
                  {errors.departmentLead?.lastName && <p className="text-danger">{errors.departmentLead.lastName.message}</p>}
                  <Controller
                    control={control}
                    name="departmentLead.email"
                    render={({ field }) => <input {...field} className="form-control" placeholder="Email" />}
                    rules={{ required: "Email is required" }}
                  />
                  {errors.departmentLead?.email && <p className="text-danger">{errors.departmentLead.email.message}</p>}
                </div>
              </div>
              {/* Attachment Path */}
              <div className="mb-3">
                <label htmlFor="attachmentPath" className="form-label">Attachment Path</label>
                <Controller
                  control={control}
                  name="attachmentPath"
                  render={({ field }) => <input {...field} className="form-control" type="file" />}
                  rules={{ required: "Attachment Path is required" }}
                />
                {errors.attachmentPath && <p className="text-danger">{errors.attachmentPath.message}</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}