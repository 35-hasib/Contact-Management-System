const Contact = require("../models/Contacts");

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, notes } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      notes,
      userId: req.user.userId,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact created", contact: newContact });
  } catch (error) {
    console.error("Create contact error:", error);
    res.status(500).json({ error: "Error creating contact" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!contact) return res.status(404).json({ error: "Contact not found" });

    res.json({ contact });
  } catch (error) {
    console.error("Get contact error:", error);
    res.status(500).json({ error: "Error fetching contact" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!contact) return res.status(404).json({ error: "Contact not found" });

    res.json({ message: "Contact updated", contact });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({ error: "Error updating contact" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!contact) return res.status(404).json({ error: "Contact not found" });

    res.json({ message: "Contact deleted" });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ error: "Error deleting contact" });
  }
};
