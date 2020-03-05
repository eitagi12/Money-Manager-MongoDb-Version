const components = {
  login: {
    component: "loginPage",
    url: "/login"
  },
  registerPage: {
    component: "registerPage",
    url: "/register"
  },
  dashboardPage: {
    component: "dashboardPage",
    url: "/dashboard"
  },
  activityPage: {
    component: "activityPage",
    url: "/newactivity"
  },
  historyPage: {
    component: "historyPage",
    url: "/history"
  }
};

export default {
  //role name as a key.
  user: {
    routes: [
      components.dashboardPage,
      components.activityPage,
      components.historyPage
    ],
    redirect: ["/dashboard"]
  },
  guest: {
    routes: [components.login, components.registerPage],
    redirect: ["/login"]
  }
};
