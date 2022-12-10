import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import appInfo from './app-info';
import routes from './app-routes';
import { SideNavOuterToolbar as SideNavBarLayout } from './layouts';
import { Footer } from './components';

export default function() {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route
            exact
            key={path}
            path={path}
            component={component}
          />
        ))}
        <Redirect to={'/'} />
      </Switch>
      <Footer>
        Copyright © 2022-{new Date().getFullYear()} {appInfo.title} Inc.
        <br />
        Команда слабоумие и отвага.
      </Footer>
    </SideNavBarLayout>
  );
}
