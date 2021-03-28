export default function validateLoginRegisterData(data) {
  if (data.firstName === null || data.firstName === undefined) {
    if (data.password === "") {
      return result(false, "Password can't be empty", "EMPTYPASSWORD");
    }
    if (data.password.length < 4) {
      return result(
        false,
        "Password can't be less than 4 characters",
        "SHORTPASSWORD"
      );
    }
    if (data.password.length > 20) {
      return result(
        false,
        "Password can't be more than 20 characters",
        "LONGPASSWORD"
      );
    }
    if (data.email === "") {
      return result(false, "Email can't be empty", "EMPTYEMAIL");
    }
    if (data.email.length < 5) {
      return result(
        false,
        "Email can't be less than 5 characters",
        "SHORTEMAIL"
      );
    }
    if (data.email.length > 30) {
      return result(
        false,
        "Email can't be more than 30 characters",
        "LONGEMAIL"
      );
    }
    if (!validateEmail(data.email)) {
      return result(false, "Please enter a valid email", "BADEMAIL");
    }
    return result(true);
  }
  if (data.firstName === "") {
    return result(false, "First name can't be empty", "EMPTYFIRSTNAME");
  }
  if (data.firstName.length < 2) {
    return result(
      false,
      "First name length can't be less than 2 characters",
      "SHORTFIRSTNAME"
    );
  }

  if (data.firstName.length > 15) {
    return result(
      false,
      "First name length can't be more than 15 characters",
      "LONGFIRSTNAME"
    );
  }
  if (data.lastName === "") {
    return result(false, "Last name can't be empty", "EMPTYLASTNAME");
  }
  if (data.lastName.length < 2) {
    return result(
      false,
      "Last name length can't be less than 2 characters",
      "SHORTLASTNAME"
    );
  }
  if (data.lastName.length > 15) {
    return result(
      false,
      "Last name length can't be more than 15 characters",
      "LONGLASTNAME"
    );
  }
  if (data.password === "") {
    return result(false, "Password can't be empty", "EMPTYPASSWORD");
  }
  if (data.password.length < 4) {
    return result(
      false,
      "Password can't be less than 4 characters",
      "SHORTPASSWORD"
    );
  }
  if (data.password.length > 20) {
    return result(
      false,
      "Password can't be more than 20 characters",
      "LONGPASSWORD"
    );
  }
  if (data.email === "") {
    return result(false, "Email can't be empty", "EMPTYEMAIL");
  }
  if (data.email.length < 5) {
    return result(false, "Email can't be less than 5 characters", "SHORTEMAIL");
  }
  if (data.email.length > 30) {
    return result(false, "Email can't be more than 30 characters", "LONGEMAIL");
  }

  if (!validateEmail(data.email)) {
    return result(false, "Please enter a valid email", "BADEMAIL");
  }
  return result(true);
}

export function result(error, message = "", errorStatus = "") {
  if (!error) {
    return { status: "ERROR", errorMessage: message, errorStatus: errorStatus };
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
