window.onload = function() {
    const savedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    const birthdayList = document.getElementById('birthdayList');
    savedBirthdays.forEach(birthday => {
        const birthdayItem = createBirthdayItem(birthday.name, birthday.date);
        birthdayList.appendChild(birthdayItem);
    });
};

function addBirthday() {
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');
    const imageInput = document.getElementById('image');
    const birthdayList = document.getElementById('birthdayList');

    const name = nameInput.value;
    const date = dateInput.value;
    const imageUrl = imageInput.value;

    if (name && date && imageUrl) {
        const birthdayItem = createBirthdayItem(name, date, imageUrl);
        birthdayList.appendChild(birthdayItem);
        saveBirthdays();
        nameInput.value = '';
        dateInput.value = '';
        imageInput.value = '';
      }
}



function createBirthdayItem(name, date, imageUrl) {
    const birthdayItem = document.createElement('li');
    birthdayItem.className = 'birthdayItem';

    // Parse the birthdate to get the day and month
    const birthdate = new Date(date);
    const birthMonth = birthdate.getMonth();
    const birthDay = birthdate.getDate();

    // Get the current date
    const now = new Date();
    const currentYear = now.getFullYear();

    // Calculate the next birthday
    const nextBirthday = new Date(currentYear, birthMonth, birthDay);
    if (nextBirthday < now) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    // Calculate the days until the next birthday
    const daysUntilNextBirthday = Math.floor((nextBirthday - now) / (1000 * 60 * 60 * 24));

    // Display the name, date, and days until the next birthday
    birthdayItem.innerHTML = `<strong>${name}</strong>'s birthday on ${date}<br>
                           
                           <img class="profileImg" src="${imageUrl}" alt="Profile Image"> <br>
                           
                           ${daysUntilNextBirthday} days until next birthday`;

                         if(daysUntilNextBirthday==364){
                            alert("happy b'day")
                         }
    // Append the edit and remove buttons
    birthdayItem.innerHTML += `<button class="editButton" onclick="editBirthday(this)">Edit</button>
                           <button class="removeButton" onclick="removeBirthday(this)">Remove</button>`;

    return birthdayItem;
}




function removeBirthday(button) {
    const listItem = button.parentNode;
    const birthdayList = listItem.parentNode;
    birthdayList.removeChild(listItem);
    saveBirthdays();
}

function editBirthday(button) {
    const listItem = button.parentNode;
    const name = listItem.querySelector('strong').innerText;
    const date = listItem.innerText.split("on")[1].trim();
    const imageUrl = listItem.querySelector('img').src;


    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');
    const imageInput = document.getElementById('image');
    nameInput.value = name;
    dateInput.value = date;
    imageInput.value = imageUrl;
    removeBirthday(button);
}

function saveBirthdays() {
    const birthdayList = document.getElementById('birthdayList');
    const birthdays = [];
    birthdayList.childNodes.forEach(item => {
        const name = item.querySelector('strong').innerText;
        const date = item.innerText.split("on")[1].trim();
        birthdays.push({ name, date });
    });
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
}
function validateAndAdd() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const image = document.getElementById('image').value;

    if (name.trim() === '' || date.trim() === '' || image.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    addBirthday();
  }

