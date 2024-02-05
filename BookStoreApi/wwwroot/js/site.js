const uri = 'api/books';
const db = "mongodb://localhost:27017";
let books = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addPriceTextbox = document.getElementById('add-price');
    const addCategoryTextbox = document.getElementById('add-category');
    const addAuthorTextbox = document.getElementById('add-author');

    const item = {
        IsAvailable: true,
        BookName: addNameTextbox.value.trim(),
        Price: addPriceTextbox.value.trim(),
        Category: addCategoryTextbox.value.trim(),
        Author: addAuthorTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addPriceTextbox.value = '';
            addCategoryTextbox.value = '';
            addAuthorTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = books.find(item => item.Id === Id);

    document.getElementById('edit-id').value = item.Id;
    document.getElementById('edit-name').value = item.BookName;
    document.getElementById('edit-price').value = item.Price;
    document.getElementById('edit-category').value = item.Category;
    document.getElementById('edit-author').value = item.Author;
    document.getElementById('edit-isAvailable').checked = item.IsAvailable;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
      
        Id: parseInt(itemId, 24),
        IsAvailable: document.getElementById('edit-isAvailable').checked,
        BookName: document.getElementById('edit-name').value.trim(),
        Price: document.getElementById('edit-price').value.trim(),
        Category: document.getElementById('edit-category').value.trim(),
        Author: document.getElementById('edit-author').value.trim()
    };

    fetch(`${uri}/${item.Id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'book' : 'books';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('books');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isAvailableCheckbox = document.createElement('input');
        isAvailableCheckbox.type = 'checkbox';
        isAvailableCheckbox.disabled = false;
        isAvailableCheckbox.checked = item.IsAvailable;

        let editButton = button.cloneNode(true);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.Id})`);

        let deleteButton = button.cloneNode(true);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.Id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isAvailableCheckbox);

        let td2 = tr.insertCell(1);
        let textName = document.createTextNode(item.Name);
        td2.appendChild(textName);

        let td3 = tr.insertCell(2);
        let textPrice = document.createTextNode(item.Price);
        td3.appendChild(textPrice);

        let td4 = tr.insertCell(3);
        let textCategory = document.createTextNode(item.Category);
        td4.appendChild(textCategory);

        let td5 = tr.insertCell(4);
        let textAuthor = document.createTextNode(item.Author);
        td5.appendChild(textAuthor);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
    });

    books = data;
}