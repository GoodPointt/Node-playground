const { program } = require('commander');

const contacts = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      console.log('There are all contacts ✌️');
      console.table(contactsList);
      break;
    case 'get':
      const contact = await contacts.getContactById(id);
      console.log('There is a contact u looking for ⭐', contact);
      break;
    case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.log('Removed successfuly ✅', removedContact);
      break;
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      console.log('Added successfuly ✅', newContact);
      break;
    case 'edit':
      const editedContacat = await contacts.editContact(id, {
        name,
        email,
        phone,
      });
      console.log('Edited successfuly ✅', editedContacat);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
      break;
  }
};

program
  .option('-a, --action, <type>')
  .option('-id, --id, <type>')
  .option('-p, --phone, <type>')
  .option('-n, --name, <type>')
  .option('-e --email, <type>');

program.parse();

const options = program.opts();
invokeAction(options);
