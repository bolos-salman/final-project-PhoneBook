// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial list of contacts
    let contacts = [
        { id: 1, name: 'Me', phone: '054-921-9376', email: 'bolos@gmail.com', img: 'Images/bolos.png', address: '123 Main St', age: 29 },
        { id: 2, name: 'Bradly Martin', phone: '054-754-6962', email: 'martin@gmail.com', img: 'Images/bradly.png', address: '456 Oak Ave', age: 34 },
        { id: 3, name: 'Mhemad Zarora', phone: '053-8912-1223', email: 'zarora@gmail.com', img: 'Images/mhemad.png', address: '789 Pine Rd', age: 28 },
        { id: 4, name: 'Jesse White', phone: '053-6788-2769', email: 'jesseWhite@gmail.com', img: 'Images/bike.png', address: '321 Maple St', age: 26 }
    ];

    // Next contact ID to be used
    let nextId = 5;

    // Reference to the main contacts section where contacts will be displayed
    const contactsSection = document.querySelector('.contacts-section');
    // Reference to the search input field
    const searchInput = document.getElementById('search');
    // Reference to the delete all contacts button
    const deleteAllButton = document.getElementById('deleteAllButton');
    // Reference to the form for adding new contacts
    const contactForm = document.getElementById('contactForm');

    // Function to render contacts in the contacts section
    function renderContacts(filteredContacts = contacts) {
        contactsSection.innerHTML = ''; // Clear the current content
        if (filteredContacts.length === 0) {
            contactsSection.innerHTML = '<p>No contacts available.</p>'; // Show message if no contacts are found
        } else {
            // Loop through each contact and create its HTML representation
            filteredContacts.forEach(contact => {
                const contactElement = document.createElement('div');
                contactElement.className = 'mainContact';
                contactElement.dataset.id = contact.id;
                contactElement.innerHTML = `
                    <img src="${contact.img}" class="profile-pic" alt="${contact.name}">
                    <div class="info">
                        <div class="name">${contact.name}</div>
                        <div class="phone">${contact.phone}</div>
                        <div class="email">${contact.email}</div>
                    </div>
                    <div class="button-group">
                        <button class="info-button">Info</button>
                        <button class="edit-button">Edit</button>
                        <button class="delete-button">Delete</button>
                    </div>
                `;
                contactsSection.appendChild(contactElement); // Append contact to the section
            });
        }
    }

    // Function to open a popup showing contact info
    function openInfoPopup(contact) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h2>${contact.name}</h2>
                <img src="${contact.img}" class="profile-pic" alt="${contact.name}">
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Address:</strong> ${contact.address}</p>
                <p><strong>Age:</strong> ${contact.age}</p>
                <button type="button" class="close-popup">Close</button>
            </div>
        `;
        document.body.appendChild(popup);

        // Close the popup when the close button is clicked
        document.querySelector('.close-popup').addEventListener('click', function() {
            popup.remove();
        });
    }

    // Function to open a popup for editing a contact
    function openEditPopup(contact) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Edit Contact</h2>
                <form id="editForm">
                    <input type="text" id="editName" placeholder="Name" value="${contact.name}" required>
                    <input type="text" id="editPhone" placeholder="Phone Number" value="${contact.phone}" required>
                    <input type="email" id="editEmail" placeholder="Email" value="${contact.email}" required>
                    <input type="text" id="editAddress" placeholder="Address" value="${contact.address}">
                    <input type="number" id="editAge" placeholder="Age" value="${contact.age}">
                    <button type="submit">Save Changes</button>
                    <button type="button" class="close-popup">Cancel</button>
                </form>
            </div>
        `;
        document.body.appendChild(popup);

        // Close the popup when the cancel button is clicked
        document.querySelector('.close-popup').addEventListener('click', function() {
            popup.remove();
        });

        // Save changes to the contact and update the list when the form is submitted
        document.getElementById('editForm').addEventListener('submit', function(e) {
            e.preventDefault();
            contact.name = document.getElementById('editName').value;
            contact.phone = document.getElementById('editPhone').value;
            contact.email = document.getElementById('editEmail').value;
            contact.address = document.getElementById('editAddress').value;
            contact.age = document.getElementById('editAge').value;
            renderContacts();
            popup.remove(); // Close the popup after saving
        });
    }

    // Function to open a popup for adding a new contact
    function openAddContactPopup() {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Add New Contact</h2>
                <form id="addContactForm">
                    <input type="text" id="addName" placeholder="Name" required>
                    <input type="text" id="addPhone" placeholder="Phone Number" required>
                    <input type="email" id="addEmail" placeholder="Email" required>
                    <input type="text" id="addAddress" placeholder="Address">
                    <input type="number" id="addAge" placeholder="Age">
                    <button type="submit">Add Contact</button>
                    <button type="button" class="close-popup">Cancel</button>
                </form>
            </div>
        `;
        document.body.appendChild(popup);

        // Close the popup when the cancel button is clicked
        document.querySelector('.close-popup').addEventListener('click', function() {
            popup.remove();
        });

        // Add the new contact and update the list when the form is submitted
        document.getElementById('addContactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('addName').value;
            const phone = document.getElementById('addPhone').value;
            const email = document.getElementById('addEmail').value;
            const address = document.getElementById('addAddress').value;
            const age = document.getElementById('addAge').value;

            // Create a new contact object
            const newContact = {
                id: nextId++, // Increment ID for each new contact
                name: name,
                phone: phone,
                email: email,
                img: 'default.png', // Default image for new contacts
                address: address,
                age: age
            };

            contacts.push(newContact); // Add the new contact to the list
            renderContacts(); // Update the display with the new contact
            popup.remove(); // Close the popup after adding
        });
    }

    // Event listener for the form submission to add a new contact
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting normally
        openAddContactPopup(); // Open the add contact popup
    });

    // Event listener for clicks within the contacts section
    document.querySelector('.contacts-section').addEventListener('click', function(e) {
        const contactElement = e.target.closest('.mainContact'); // Find the clicked contact element
        const contactId = parseInt(contactElement.dataset.id, 10); // Get the ID of the contact

        if (e.target.classList.contains('delete-button')) {
            // Delete the contact if the delete button was clicked
            contacts = contacts.filter(contact => contact.id !== contactId); 
            renderContacts(); // Update the display after deletion
        } else if (e.target.classList.contains('edit-button')) {
            // Open the edit popup if the edit button was clicked
            const contact = contacts.find(contact => contact.id === contactId);
            if (contact) {
                openEditPopup(contact);
            }
        } else if (e.target.classList.contains('info-button')) {
            // Open the info popup if the info button was clicked
            const contact = contacts.find(contact => contact.id === contactId);
            if (contact) {
                openInfoPopup(contact);
            }
        }
    });

    // Event listener for the delete all button
    deleteAllButton.addEventListener('click', function() {
        contacts.length = 0; // Clear all contacts
        renderContacts(); // Update the display to show no contacts
    });

    // Event listener for the search input field
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase(); // Get the search term
        // Filter contacts based on the search term
        const filteredContacts = contacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm)
        );
        renderContacts(filteredContacts); // Update the display with filtered contacts
    });

    // Initial rendering of contacts when the page loads
    renderContacts();
});
