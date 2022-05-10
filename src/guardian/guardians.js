import store from "../store";

// this section was commented out for testing

export const guardian_1 = (to, from, next) => {
  // let user = store.state.user;
  // let employees = store.state.guardianEmployees.entries;
  // for (let index = 0; index < employees.length; index++) {
  //   if (user.email === employees[index].email) {
  //     next();
  //   }
  // }
  next();
};

// this section was commented out for testing

export const guardian_2 = (to, from, next) => {
  // if (user) {
  //   next();
  // }
  next();
};
