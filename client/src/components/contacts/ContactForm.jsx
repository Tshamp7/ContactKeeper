import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  const resetContact = {
    name: "",
    email: "",
    phone: "",
    type: "personal",
  };

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(resetContact);
    }
    //eslint-disable-next-line
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setAlert("Name can't be blank.", "error");
    }
    if (current === null) {
      addContact(contact);
      clearCurrent();
    } else {
      updateContact(contact);
      clearCurrent();
    }
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current === null ? "Add Contact" : "Edit Contact"}
      </h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current === null ? "Add Contact" : "Update Contact"}
          className="btn btn-primary btn-block"
          onChange={onChange}
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
