import React from 'react';
import { Redirect } from 'react-router-dom';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: React.lazy(() => import('./views/dashboard/Dashboard')),
  },
  {
    path: '/admin/list',
    name: 'Author',
    component: React.lazy(() =>
      import('./views/author-list/AuthorList'),
    ),
    exact: true,
  },
  {
    path: '/admin/list-Page',
    name: 'Page',
    component: React.lazy(() =>
      import('./views/page-list/PageList'),
    ),
    exact: true,
  },
  
  /*
   * Errors
   */
  {
    path: '/errors/error-404',
    name: 'Page404',
    exact: true,
    component: React.lazy(() => import('./views/pages/page404/Page404')),
  },
  {
    name: '404',
    component: () => <Redirect to="/errors/error-404" />,
  },
];

export default routes;
