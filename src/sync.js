
function infoSubmit(user, pass) {
  fetch('https://phs-schedule-server.herokuapp.com/getSchedule', {
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
    return JSON.parse(JSON.stringify(responseJSON));
  })
  .catch((error) => {
    console.error(error);
  });
}

export default infoSubmit;
