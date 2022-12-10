import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, Status, Traffic, Sales, Tips, Temperature, Station, Ownerstation, Users, Setting, Buyer, Ikey, SetupStation, Collection, Maintenance } from './pages';

const routes = [
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/',
    component: HomePage
  },
  { path : "/status",
    component : Status 
  },
  { path : "/traffic",
    component : Traffic
  },
  { path : "/sales", 
    component : Sales
  },
  { path : "/tips",
    component : Tips
  },
  { path : "/temperature",
    component : Temperature
  },
  { path : "/station",
    component : Station
  },
  { path : "/ownerstation",
    component : Ownerstation
  },
  { path : "/users",
    component: Users
  },
  { path : "/setting",
    component : Setting
  },
  { path : "/buyer",
    component : Buyer
  },
  { path : "/ikey",
    component : Ikey
  },
  { path : "/setupstation",
    component : SetupStation
  },
  { path : "/collection",
    component : Collection
  },
  { path : "/maintenance",
    component : Maintenance
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
