const variables = {
  userId: "",
  name: "admin",
  password: "1234",

  createUserErrorInput: {
    name: "client",
    password: "1234",
    passwordAgain: "12345"
  },

  createUserAdminInput: {
    name: "admin",
    password: "1234",
    passwordAgain: "1234"
  },

  createUserClientInput: {
    name: "client",
    password: "1234",
    passwordAgain: "1234"
  },

  updateUserInput: {
    oldPassword: "1234",
    newPassword: "4321",
    newPasswordAgain: "4321"
  },

  updateUserErrorInput: {
    name: "client",
    oldPassword: "1234",
    newPassword: "4321",
    newPasswordAgain: "43210"
  }
};

export default variables;
