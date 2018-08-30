
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
  .then((response) => callback('letterDay', JSON.parse(JSON.stringify(response))["_bodyText"]))
  .catch((error) => {
    console.error(error);
  });
}

function getWeekly(user, pass, callback) {
  fetch('https://phsapp.herokuapp.com/getSchedule', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      username: user,
      pw: 'a27d746f62f374136dda77f0da4f700b',
      ldappassword: pass,
      dbpw: '2f5d8c637f2fc436de714a3370ce5d1e',
      format: 'weekly'
    }
  })
  .then((response) => response.json())
  .then((responseJSON) => {
     callback('weekly', JSON.parse(JSON.stringify(responseJSON)));
  })
  .catch((error) => {
    console.error(error);
  });
}

function getMatrix(user, pass, callback) {
  fetch('https://phsapp.herokuapp.com/getSchedule', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      username: user,
      pw: 'a27d746f62f374136dda77f0da4f700b',
      ldappassword: pass,
      dbpw: '2f5d8c637f2fc436de714a3370ce5d1e',
      format: 'matrix'
    }
  })
  .then((response) => response.json())
  .then((responseJSON) => {
     callback('matrix', JSON.parse(JSON.stringify(responseJSON)));
  })
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
     callback('schedule', JSON.parse(JSON.stringify(responseJSON)));
  })
  .catch((error) => {
    console.error(error);
  });
}

export {
  getSchedule,
  getLetterDay,
  getMatrix,
  getWeekly,
};
