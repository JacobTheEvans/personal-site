import axios from "axios";

export function loadPorts() {
  return (dispatch) => {
    return axios.get("/api/port").then((response) => {
      dispatch(setData("portfolioItems", response.data.data));
    }).catch((error) => {
      throw(error);
    });
  }
}

export function addPort(data, token) {
  return (dispatch) => {
    return axios.post("/api/port", data, {headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
      dispatch(loadPorts());
    }).catch((error) => {
      throw(error);
    });
  }
}

export function updatePort(id, data, token) {
  return (dispatch) => {
    return axios.put(`/api/port/${id}/`, data, {headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
      dispatch(loadPorts());
    }).catch((error) => {
      throw(error);
    })
  }
}

export function removePort(id, token) {
  return (dispatch) => {
    return axios.delete(`/api/port/${id}/`, {headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
      dispatch(loadPorts());
    }).catch((error) => {
      throw(error);
    });
  }
}


export function loadArticles() {
  return (dispatch) => {
    return axios.get("/api/article").then((response) => {
      dispatch(setData("articles", response.data.data));
    }).catch((error) => {
      throw(error);
    });
  }
}

export function addArticle(data, token) {
  return (dispatch) => {
    return axios.post("/api/article", data, {headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
      dispatch(loadArticles());
    }).catch((error) => {
      throw(error);
    });
  }
}

export function updateArticle(id, data, token) {
  return (dispatch) => {
    return axios.put(`/api/article/${id}/`, data, {headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
      dispatch(loadArticles());
    }).catch((error) => {
      throw(error);
    })
  }
}

export function removeArticle(id, token) {
  return (dispatch) => {
    return axios.delete(`/api/article/${id}/`, {headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
      dispatch(loadArticles());
    }).catch((error) => {
      throw(error);
    })
  }
}

export function setData(key, data) {
  return {type: "SET_DATA", key, data}
}

export function attemptLogin(username, password) {
  return (dispatch) => {
    return axios.post("/auth/login/", {username, password}).then((response) => {
      dispatch(login(response.data.token));
    }).catch((error) => {
      throw(error);
    })
  }
}

export function login(token) {
  return {type: "LOGIN", token};
}

export function logout() {
  return {type: "LOGOUT"}
}
