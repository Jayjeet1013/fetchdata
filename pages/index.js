import React, { useState } from "react";
import Image from "next/image";
import Airtable from "airtable";
import { Container, Row, Col, Alert } from "react-bootstrap";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    mail: "",
    feedback: "",
    appointmentDate: "",
  });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { name, number, address, feedback, appointmentDate, email } = formData;

  const handleChange = (e) => {
    let fieldName = e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const sendData = (e) => {
    e.preventDefault();
    setLoading(true);

    const base = new Airtable({
      apiKey: process.env.NEXT_PUBLIC_AT_API_KEY,
    }).base(process.env.NEXT_PUBLIC_AT_APP_ID);

    base("Table 2").create(
      [
        {
          fields: {
            Name: name,
            Number: number,
            Email: email,
            Feedback: feedback,
            Address: address,
            AppointmentDate: appointmentDate,
          },
        },
      ],
      function (err, records) {
        setLoading(false);
        if (err) {
          setErr(err.message);
          return;
        }
        console.log(records);
        setSuccess(true);
        setFormData({
          name: "",
          number: "",
          email: "",
          feedback: "",
          address: "",
          appointmentDate: "",
        });
      }
    );
  };

  return (
    <div className="feedback section-container">
      <div className="feedback__form-box">
        <h3 className="heading-h3 mb-3 text-center">
          Feedback <span className="g-text">Form</span>
        </h3>

        <form className="book-appointment__form" onSubmit={sendData}>
          <input
            required
            placeholder="Your name"
            type="text"
            className="custom-inp"
            name="name"
            value={formData.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            required
            placeholder="Contact number"
            type="tel"
            className="custom-inp"
            name="number"
            value={formData.number}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            placeholder="e-mail id (optional)"
            type="email"
            className="custom-inp"
            name="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            required
            placeholder="Address"
            type="text"
            className="custom-inp"
            name="address"
            value={formData.address}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            required
            placeholder="Apointment date"
            type="date"
            className="custom-inp"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <textarea
            placeholder="Feedback"
            type="textfield"
            className="custom-inp"
            name="feedback"
            value={formData.feedback}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="custom-btn w-100"
          >
            {isLoading ? "Loading..." : "Send Feedback"}
          </button>
        </form>
        {/* ALERT ERROR */}
        {err && (
          <Alert variant="danger">
            Opps! some error while sending your feedback.
          </Alert>
        )}
        {/* ALERT SUCCESS */}
        {success && (
          <Alert variant="success">Thank you, We get your Feedback.</Alert>
        )}
      </div>
    </div>
  );
}