// src/components/Contact.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas"; // We'll hide this on small screens
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import "../index.css";

const InputField = ({ label, value, onChange, placeholder, name, type }) => (
  <label className="flex flex-col">
    {/* 
      1) Make the label smaller on screens < md, normal on md+ 
         e.g., text-sm on small, text-base on md. 
    */}
    <span className="text-white font-medium mb-2 text-sm md:text-base">
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
        rounded-lg
        outline-none
        border-none
        text-white
        placeholder:text-secondary
        font-medium
        py-2 px-4     /* smaller padding on small screens */
        md:py-4 md:px-6 /* revert to bigger on md+ */
        text-sm md:text-base  /* smaller text on mobile, normal on md+ */
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
    <div
      className={`
        xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden
      `}
    >
      {/* Left side: The form */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact Me</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-6"
        >
          <InputField
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Insert Your name here..."
            type="text"
          />
          {nameError && (
            <span className="text-red-500 text-sm md:text-base">
              {nameError}
            </span>
          )}

          <InputField
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email address?"
            type="email"
          />
          {emailError && (
            <span className="text-red-500 text-sm md:text-base">
              {emailError}
            </span>
          )}

          <InputField
            label="Your Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What you want to say...?"
            type="text"
          />

          {/* Button: smaller on mobile, normal on md+ */}
          <button
            type="submit"
            className="
              bg-tertiary
              rounded-xl
              outline-none
              text-white
              font-bold
              shadow-md shadow-primary
              py-2 px-4
              md:py-3 md:px-8
              text-sm md:text-base
              w-fit
            "
          >
            {loading ? "Sending..." : "Send"}
          </button>
          {confirmation && (
            <p className="text-green-500 text-sm md:text-base">{confirmation}</p>
          )}
        </form>
      </motion.div>

      {/* Right side: The ComputersCanvas, only show on md+ */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        // Hide for screens < md
        className="hidden md:block md:flex-1 md:h-[550px] xl:flex-1 xl:h-auto"
      >
        <ComputersCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
