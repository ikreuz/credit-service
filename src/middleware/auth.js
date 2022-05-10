// import jsCookie from "js-cookie";


// this section was commented out for testing

export default function auth({ next, router }) {
  // if (!localStorage.getItem('jwt')) {
  // if (!jsCookie.get("access_token")) {
  //   return router.push({
  //     path: "/login",
  //   });
  // }

  return next();
}
