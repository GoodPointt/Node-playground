const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  if (!contactId) throw new Error('⚠️ Incorrect ID data!⚠️');

  const contacts = await listContacts();
  const findedContact = contacts.find((contact) => contact.id === contactId);

  return findedContact || null;
};

const removeContact = async (contactId) => {
  if (!contactId) throw new Error('⚠️ Incorrect ID data!⚠️');

  const contacts = await listContacts();

  const contactIdx = await isExist(contactId);

  if (contactIdx === -1) return null;

  const [result] = contacts.splice(contactIdx, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  if (!name || !email || !phone) throw new Error('⚠️ Incorrect data!⚠️');

  const contacts = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  const contactIdx = await isExist(null, email, phone);
  if (!(contactIdx === -1))
    throw new Error('⚠️ Contact with same email/phone already exist!⚠️');

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const editContact = async (id, data) => {
  if (!data.name || !data.email || !data.phone)
    throw new Error('⚠️ Incorrect data!⚠️');

  const contacts = await listContacts();
  const conatctIdx = await isExist(id, data.email, data.phone);

  if (conatctIdx === -1) return null;

  contacts[conatctIdx] = { id, ...data };

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[conatctIdx];
};

const isExist = async (id, email, phone) => {
  const contacts = await listContacts();

  const existedContactIdx = contacts.findIndex(
    (contact) =>
      contact.email === email || contact.phone === phone || contact.id === id
  );

  return existedContactIdx;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
};
