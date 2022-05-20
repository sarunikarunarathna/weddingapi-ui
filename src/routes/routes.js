import AddCategory from "../components/admin/AddCategory";
import Dashboard from "../components/admin/Dashboard";
import EditCategory from "../components/admin/EditCategory";
import ViewCategory from "../components/admin/ViewCategory";

const routes = [
    {path: '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    {path: '/admin/addCategory', exact: true, name: 'AddCategory', component: AddCategory},
    {path: '/admin/viewCategory', exact: true, name: 'ViewCategory', component: ViewCategory},
    {path: '/admin/editCategory/:id', exact: true, name: 'editCategory', component: EditCategory},

];

export default routes;