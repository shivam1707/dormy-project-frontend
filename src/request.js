import axios from "axios";
import { api } from "./settings";

const authAxios = axios.create({
  baseURL: api,
});

const token = localStorage.getItem("jwttoken");

export const getToken = () => {
  return {
    headers: {
      token: token,
      type: "web",
    },
  };
};

class Request {
  error = (err) => {
    try {
      if (err.response.status === 401) {
        localStorage.removeItem("jwttoken");
      }
    } catch (e) {}
  };

  login(values) {
    return new Promise((next, error) => {
      authAxios
        .post("/login/token", { ...values })
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.response.data);
          this.error(err);
        });
    });
  }

  register(values) {
    return new Promise((next, error) => {
      authAxios
        .post("/login/register", { ...values })
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.response.data);
          this.error(err);
        });
    });
  }

  getotp(values) {
    return new Promise((next, error) => {
      authAxios
        .post("/login/generateOTP", { ...values })
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.response.data);
          this.error(err);
        });
    });
  }

  validateOTP(values) {
    return new Promise((next, error) => {
      authAxios
        .post("/login/validateOTP", { ...values })
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.response.data);
          this.error(err);
        });
    });
  }

  propertyRegister(values) {
    return new Promise((next, error) => {
      authAxios
        .post("/property/registerWithout", values)
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.response.data);
          this.error(err);
        });
    });
  }

  fetchReport(id) {
    return new Promise((next, error) => {
      authAxios
        .get(`/userdata/report/${id}`, getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.response.data);
          this.error(err);
        });
    });
  }

  submitForm(data) {
    return new Promise((next, error) => {
      authAxios
        .post("/userdata", { ...data }, getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.respose.data);
          this.error(err);
        });
    });
  }

  updateForm(data, id) {
    console.log(id, data);
    return new Promise((next, error) => {
      authAxios
        .put(`/userdata/${id}`, { ...data }, getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.respose.data);
          this.error(err);
        });
    });
  }

  deleteForm(id) {
    return new Promise((next, error) => {
      authAxios
        .delete(`/userdata/${id}`, getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.respose.data);
          this.error(err);
        });
    });
  }
}

export default new Request();
