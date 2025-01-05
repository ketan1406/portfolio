// src/components/Contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import "../index.css";

const InputField = ({ label, value, onChange, placeholder, name, type }) => (
  <label className="flex flex-col mb-2">
    <span className="text-white text-[8px] font-medium mb-2 leading-tight">
      {label}
    </span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        bg-tertiary
        py-2 px-3
        rounded-lg
        outline-none 
        border-none 
        text-white 
        text-[8px]
        placeholder:text-[8px] placeholder:text-secondary
        font-medium
      "
    />
  </label>
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setNameError("");
    setConfirmation("");

    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!form.name.trim()) {
      setNameError("Name is required.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ketan Saini",
          from_email: form.email,
          to_email: "sainiketan99@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setConfirmation("Thank you! I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setConfirmation("Something went wrong. Please try again. :/");
        }
      );
  };

  return (
    <section id="contact" className="relative w-full h-screen mx-auto overflow-visible">
      {/* 
        1) Absolutely position your form on the left, 
           so the model is free-floating in the section.
      */}
      <div
        className="
          absolute
          top-[50px]       /* Adjust as needed */
          left-12           /* Adjust as needed */
          bg-black-100
          p-2 sm:p-3
          rounded-2xl
          w-[240px]        /* fix the width to keep size consistent */
          min-h-[270px]
          z-0             /* form above the model if they overlap */
        "
      >
        <p className={`${styles.sectionSubText}`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText}`}>Contact Me</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col">
          <InputField
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Insert Your name here..."
            type="text"
          />
          {nameError && <span className="text-red-500 text-xs">{nameError}</span>}

          <InputField
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email address?"
            type="email"
          />
          {emailError && <span className="text-red-500 text-xs">{emailError}</span>}

          <InputField
            label="Your Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What do you want to say...?"
            type="text"
          />

          <button
            type="submit"
            className="
              bg-tertiary
              py-2 px-4
              rounded-xl
              text-white
              text-xs
              font-bold
              w-fit
              shadow-md
              shadow-primary
            "
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {confirmation && (
            <p className="text-green-500 text-xs">{confirmation}</p>
          )}
        </form>
      </div>

      {/* 
        2) Place ComputersCanvas at top level, 
           so there's no extra bounding div restricting it.
      */}
      <ComputersCanvas />
    </section>
  );
};

export default Contact;
