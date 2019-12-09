const API_ENDPOINTS = {
  auth: {
    login: {
      method: "post",
      url: "/auth/login"
    },
    register: {
      method: "post",
      url: "/auth/register"
    },
    user: {
      method: "get",
      url: "/auth/me"
    },
    refresh: {
      method: "get",
      url: "/auth/refresh"
    },
    profile: {
      method: "put",
      url: "/auth/profile"
    },
    changePassword: {
      method: "put",
      url: "/auth/change-password"
    },
    forgotPassword: {
      method: "post",
      url: "/auth/forgot-password"
    },
    resetPassword: {
      check: {
        method: "get",
        url: "/auth/reset-password/check"
      },
      reset: {
        method: "put",
        url: "/auth/reset-password"
      }
    }
  }
};

export default API_ENDPOINTS;
