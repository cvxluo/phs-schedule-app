
function getClassOrder(letter) {
  if (letter == 'No school today') {
    return [];
  }
  if (letter == 'A') {
    return [1, 2, 'Morning Break & Announcements', 3, 4, 5, 'Lunch Break', 6, 7, 8];
  }
  if (letter == 'B') {
    return [2, 3, 'Morning Break & Announcements', 4, 1, 6, 'Lunch Break', 7, 8, 5];
  }
  if (letter == 'C') {
    return [3, 4, 'Morning Break & Announcements', 1, 2, 7, 'Lunch Break', 8, 5, 6];
  }
  if (letter == 'D') {
    return [4, 1, 'Morning Break & Announcements', 2, 3, 8, 'Lunch Break', 5, 6, 7];
  }
  if (letter == 'E') {
    return [3, 1, 'Lunch Break', 7, 5];
  }
  if (letter == 'F') {
    return [4, 2, 'Lunch Break', 8, 6];
  }
}

function getClassTime(timeslot, letter) {
  if (timeslot == 'Morning Break & Announcements') {
    return '9:53 AM - 9:59 AM';
  }

  if (timeslot == 'Lunch Break' && (letter == 'E' || letter == 'F')) {
    return '11:04 AM - 11:44 AM';
  }
  else if (timeslot == 'Lunch Break' && (letter == 'A' || letter == 'B' || letter == 'C' || letter == 'D')) {
    return '12:23 PM - 12:57 PM';
  }

  if (letter == 'A' || letter == 'B' || letter == 'C' || letter == 'D') {
    if (timeslot == 1) {
      return '8:20 AM - 9:04 AM';
    }
    if (timeslot == 2) {
      return '9:08 AM - 9:53 AM';
    }
    if (timeslot == 3) {
      return '10:03 AM - 10:47 AM';
    }
    if (timeslot == 4) {
      return '10:51 AM - 11:35 AM';
    }
    if (timeslot == 5) {
      return '11:39 AM - 12:23 PM';
    }
    if (timeslot == 6) {
      return '1:01 PM - 1:45 PM';
    }
    if (timeslot == 7) {
      return '1:49 PM - 2:33 PM';
    }
    if (timeslot == 8) {
      return '2:37 PM - 3:21 PM';
    }
  }

  else {
    if (timeslot == 1) {
      return '8:20 AM - 9:37 AM';
    }
    if (timeslot == 2) {
      return '9:47 AM - 11:04 AM';
    }
    if (timeslot == 3) {
      return '11:48 AM - 1:05 PM';
    }
    if (timeslot == 4) {
      return '1:15 PM - 2:32 PM';
    }
  }
}


export {
  getClassTime,
  getClassOrder,
}
