import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AddBudgetPlan from "./components/frontend/AddBudgetPlan";
import AddService from "./components/frontend/AddService";
import Appoinment from "./components/frontend/Appoinment";
import AppoinmentToService from "./components/frontend/AppoinmentToService";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import BudgetPlanning from "./components/frontend/BudjetPlanning";
import Collections from "./components/frontend/Collections";
import CollectionToUser from "./components/frontend/CollectionToUser";
import Communication from "./components/frontend/Communication";
import CommunicationServiceList from "./components/frontend/communicationServiceList";
import CommunicationToService from "./components/frontend/CommunicationToService";
import CompletedTodoList from "./components/frontend/CompletedTodoList";
import EditAppoinment from "./components/frontend/EditAppoinment";
import EditService from "./components/frontend/EditService";
import EditTodoList from "./components/frontend/EditTodoList";
import FullyPaidBudget from "./components/frontend/FullyPaidBudget";
import Home from "./components/frontend/Home";
import Offers from "./components/frontend/offers";
import OffersToUser from "./components/frontend/OffersToUser";
import ProductsCatWizeToUser from "./components/frontend/ProductCatWizeToUser";
import ProductsCatWize from "./components/frontend/ProductsCatWize";
import SearchBudget from "./components/frontend/SearchBudget";
import serviceDetails from "./components/frontend/serviceDetails";
import serviceDetailsToUser from "./components/frontend/ServiceDetailsToUser";
import ServiceHome from "./components/frontend/ServiceHome";
import TodoList from "./components/frontend/TodoList";
import UserHome from "./components/frontend/UserHome";
import ViewAppoinmentToUser from "./components/frontend/ViewAppoinmentToUser";
import viewService from "./components/frontend/ViewService";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/serviceHome" component={ServiceHome} />
          <Route path="/userHome" component={UserHome} />
          <Route path="/todolist" component={TodoList} />
          <Route path="/addService" component={AddService} />
          <Route path="/offerList" component={Offers} />
          <Route path="/offerListToUser" component={OffersToUser} />
          <Route path="/viewService" component={viewService} />
          <Route path="/edit-Service/:id" component={EditService} />
          <Route path="/collections" component={Collections} />
          <Route path="/collectionsToUser" component={CollectionToUser} />
          <Route path="/collection/:name" component={ProductsCatWize} />
          <Route path="/collectionToUser/:name" component={ProductsCatWizeToUser} />
          <Route path="/category/:serviceName" component={serviceDetails} />
          <Route path="/categoryToUser/:serviceName" component={serviceDetailsToUser} />
          <Route path="/edit-todolist/:id" component={EditTodoList} />
          <Route path="/communication/:id" component={Communication} />
          <Route path="/appoinment/:id" component={Appoinment} />
          <Route path="/appoinment" component={AppoinmentToService} />
          <Route path="/edit-appoinment/:id" component={EditAppoinment} />
          <Route path="/budgetPlanning" component={BudgetPlanning} />
          <Route path="/add-palan" component={AddBudgetPlan} />
          <Route path="/paid-items" component={FullyPaidBudget} />
          <Route path="/searchBudget" component={SearchBudget} />
          <Route path="/completedTodoList" component={CompletedTodoList} />
          <Route path="/viewAppoinment" component={ViewAppoinmentToUser} />
          <Route path="/reply/:service_id" component={CommunicationToService} />
          <Route path="/messageList" component={CommunicationServiceList} />

          {/* <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/servicelogin" component={ServiceLogin} /> */}

          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
          </Route>

          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
          </Route>
          

          {/* <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} /> */}

          <AdminPrivateRoute path="/admin" name="Admin" />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
