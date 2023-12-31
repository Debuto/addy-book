//BL for AddressBook
function AddressBook() {
  this.contacts = {};
  this.currentID = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignID();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignID = function() {
  this.currentID += 1;
  return this.currentID;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

//BL for Contact
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
}

Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName + " " + this.phoneNumber + " " + this.email;
};

//UI LOGIC
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(id) {
    const contact = addressBookToDisplay.findContact(parseInt(id));
    const li = document.createElement("li");
    const fullName = contact.fullName();
    li.append(fullName);
    ul.append(li);
  });
  contactsDiv.append(ul);
  }

function handleFormSub(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmail = document.querySelector("input#new-email").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
  addressBook.addContact(newContact);
  listContacts(addressBook);
}

window.addEventListener("load", function() {
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSub);
});