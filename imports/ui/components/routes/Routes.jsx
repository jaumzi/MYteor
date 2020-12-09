import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import DefaultRoute from './DefaultRoute';
import Loading from '../loading/Loading';
import { RoutesConfig } from '../../config/RoutesConfig';

const Routes = () => (
  <>
    <Router>
      <Suspense fallback={<Loading text="Carregando recursos ..." />}>
        <Switch>
          {RoutesConfig.map((route, i) => (
            <DefaultRoute
              // eslint-disable-next-line react/no-array-index-key
              key={`route-${route.path}-${i}`}
              exact={!!route.path}
              path={route.path}
              component={lazy(() => (route.component))}
              isProtected={route.isProtected}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  </>
)

export default Routes;
