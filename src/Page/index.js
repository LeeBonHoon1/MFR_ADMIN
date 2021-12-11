import React, { useContext } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import Layout from '../Component/Layout';
import { AuthContext } from '../Context';
import Authority from './Authority';
import Login from './Login';
import Main from './Main';
import Notice from './Notice';
import ResetPassword from './ResetPassword';
import SearchId from './SearchId';
import Server from './Server';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignUpResult from './SignUpResult';
import WorkplaceLink from './WorkplaceLink';
import WorkplaceList from './WorkplaceList';
import WorkplaceRegist from './WorkplaceRegist';

function Page() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  if(!auth?.state) {
    return (
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signupresult" component={SignUpResult} />
        <Route path="/searchid" component={SearchId} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Layout history={history}>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/notice" component={Notice} />
        <Route path="/workplace/list" component={WorkplaceList} />
        <Route path="/workplace/link" component={WorkplaceLink} />
        <Route path="/workplace/regist" component={WorkplaceRegist} />
        <Route path="/authority" component={Authority} />
        <Route path="/server" component={Server} />
      </Switch>
    </Layout>
  )
}

export default Page;