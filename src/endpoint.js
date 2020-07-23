import axios from "axios";

const DOMAIN = "https://api.github.com";

export const searchUsersByName = async (name) => {
  const retval = { error: false, message: "ok", data: null };

  await axios
    .get(`${DOMAIN}/search/users?q=${name}`)
    .then((res) => (retval.data = res.data.items))
    .catch((error) => {
      retval.error = true;
      retval.message = error.message;
    });

  return retval;
};

export const getUserProfile = async (name) => {
  const retval = { error: false, message: "ok", data: "" };

  await axios
    .get(`${DOMAIN}/users/${name}`)
    .then((res) => (retval.data = res.data))
    .catch((error) => {
      retval.error = true;
      retval.message = error.message;
    });

  return retval;
};
