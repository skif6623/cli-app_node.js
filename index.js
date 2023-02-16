const contacts = require("./db/contacts.js");
const {program} = require("commander");

program
	.option("-a, --action, <type>")
	.option("-i, --id, <type>")
	.option("-n, --name, <type>")
	.option("-e, --email, <type>")
	.option("-p, --phone, <type>");

program.parse();

const options = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
	switch (action) {
		case "read":
			const allContacts = await contacts.listContacts();
			return console.table(allContacts);
		case "getById":
			const contact = await contacts.getContactById(id);
			return console.log(contact);
		case "delete":
			const deletedContact = await contacts.removeContact(id);
			return console.log(deletedContact);
		case "add":
			const newContact = await contacts.addContact({name, email, phone});
			return console.log(newContact);
		case "update":
			const updatedContact = await contacts.updateContact(id, {name, email, phone});
			return console.log(updatedContact);
		default:
			return;
	}
};

invokeAction(options);
