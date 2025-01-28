const donorForm = document.getElementById('donorForm');
const searchResults = document.getElementById('searchResults');

donorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const donor = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        bloodGroup: document.getElementById('bloodGroup').value
    };
    fetch('/donors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donor)
    }).then(response => response.text())
      .then(message => alert(message));
    donorForm.reset();
});

function searchDonors() {
    const searchBloodGroup = document.getElementById('searchBloodGroup').value;
    fetch(`/donors?bloodGroup=${searchBloodGroup}`)
        .then(response => response.json())
        .then(results => {
            if (results.length > 0) {
                searchResults.innerHTML = results.map(donor => `
                    <div>
                        <p>Name: ${donor.name}</p>
                        <p>Phone: ${donor.phone}</p>
                        <p>Address: ${donor.address}</p>
                        <p>Blood Group: ${donor.bloodGroup}</p>
                    </div>
                `).join('');
            } else {
                searchResults.innerHTML = `<p>No donors found for blood group ${searchBloodGroup}.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching donor data:', error);
            searchResults.innerHTML = `<p>Error fetching donor data. Please try again later.</p>`;
        });
}

function sendSOS() {
    fetch('/sos', {
        method: 'POST'
    }).then(response => response.text())
      .then(message => alert(message));
}
