
function getLetterDay(user, pass, callback) {
  fetch('https://phsapp.herokuapp.com/getLetterDay', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      username: user,
      pw: 'a27d746f62f374136dda77f0da4f700b',
      ldappassword: pass,
      dbpw: '2f5d8c637f2fc436de714a3370ce5d1e',
    }
  })
  .then((response) => callback(response))
  .catch((error) => {
    console.error(error);
  });
}


function getSchedule(user, pass, callback) {
  fetch('https://phsapp.herokuapp.com/getSchedule', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      username: user,
      pw: 'a27d746f62f374136dda77f0da4f700b',
      ldappassword: pass,
      dbpw: '2f5d8c637f2fc436de714a3370ce5d1e',
      format: 'currentYear'
    }
  })
  .then((response) => response.json())
  .then((responseJSON) => {
     callback(JSON.parse(JSON.stringify(responseJSON)));
  })
  .catch((error) => {
    console.error(error);
  });
}

export {
  getSchedule,
  getLetterDay
};
