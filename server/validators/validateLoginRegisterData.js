export default function validateLoginRegisterData(data) {
  if (data.firstName === null || data.firstName === undefined) {
    if (data.password.length < 4) {
      return result(false, "Password can't be less than 4 characters");
    }
    if (data.password.length > 20) {
      return result(false, "Password can't be more than 20 characters");
    }
    if (data.email.length > 30) {
      return result(false, "Email can't be more than 30 characters");
    }
    if (!validateEmail(data.email)) {
      return result(false, "Please enter valid email");
    }
    return result(true);
  }
  if (data.firstName.length > 15) {
    return result(false, "First name length can't be more than 15 characters");
  }
  if (data.firstName.length < 2) {
    return result(false, "First name length can't be less than 2 characters");
  }
  if (data.lastName.length > 15) {
    return result(false, "Last name length can't be more than 15 characters");
  }
  if (data.lastName.length < 2) {
    return result(false, "Last name length can't be less than 2 characters");
  }
  if (data.password.length < 4) {
    return result(false, "Password can't be less than 4 characters");
  }
  if (data.password.length > 20) {
    return result(false, "Password can't be more than 20 characters");
  }
  if (data.email.length > 30) {
    return result(false, "Email can't be more than 30 characters");
  }
  if (!validateEmail(data.email)) {
    return result(false, "Please enter valid email");
  }
  return result(true);
}

function result(error, message = "") {
  if (!error) {
    return { status: "ERROR", errorMessage: message };
  } else {
    return {
      status: "OK",
    };
  }
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
