import React, { useState } from "react";

const ReportDiary = () => {
  const [report, setReport] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend API to submit the report
    console.log("Report submitted:", report);
    alert("Report submitted successfully!");
    setReport({ title: "", description: "" });
  };

  return (
    <div>
      <h1>Report Diary</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={report.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={report.description}
          onChange={handleChange}
          placeholder="Description"
          required
        ></textarea>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportDiary;
