import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Admindashboard from "./Components/Admin/Admindashboard";
import Employeedashboard from "./Components/Employee/Employeedashboard";
import AuthContext from "./Context/AuthContext";
import PrivateRoutes from "./utile/PrivateRoutes";
import RoleBaseRoutes from "./utile/RoleBaseRoutes";
import Department from "./Components/Admin/Department/Department";
import AdminSummary from "./Components/Admin/AdminSummary";
import AddDep from "./Components/Admin/Department/AddDep";
import Editedep from "./Components/Admin/Department/Editedep";
import AddEmployee from "./Components/Employee/AddEmployee";
import ViewEmploee from "./Components/Employee/ViewEmploee";
import Editeemp from "./Components/Employee/Editeemp";
import AddSalary from "./Components/Salary/Salary";
import ViewSalary from "./Components/Salary/ViewSalary";
import EmployeeDash from "./Components/EmployeeDash/EmployeeDash";
import EmployeeSummary from "./Components/EmployeeDash/EmployeSummary";
import Leaves from "./Components/Leaves/Leaves";
import AddLeave from "./Components/Leaves/AddLeave";
import Setting from "./Components/SettingEmp/Setting";
import AdminLeaves from "./Components/Admin/LeaveAdmin/AdminLeave";
import Details from "./Components/Admin/LeaveAdmin/DetailsLeave";
function App() {
  return (
    <div className="App">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthContext>
          <Routes>
            <Route path="/" element={<Navigate to="/admin-dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoutes>
                  <RoleBaseRoutes requiredRole={["admin"]}>
                    <Admindashboard />
                  </RoleBaseRoutes>
                </PrivateRoutes>
              }
            >
              <Route index element={<AdminSummary />} />
              <Route
                path="/admin-dashboard/department"
                element={<Department />}
              />
              <Route
                path="/admin-dashboard/department/:id"
                element={<Editedep />}
              />
              <Route
                path="/admin-dashboard/Add-depatements"
                element={<AddDep />}
              />

              <Route
                path="/admin-dashboard/Employees"
                element={<Employeedashboard />}
              />
              <Route
                path="/admin-dashboard/Add-Employee"
                element={<AddEmployee />}
              />
              <Route
                path="/admin-dashboard/Employees/:id"
                element={<ViewEmploee />}
              />
              <Route
                path="/admin-dashboard/Employees/Edite/:id"
                element={<Editeemp />}
              />
              <Route
                path="/admin-dashboard/Salary/Add"
                element={<AddSalary />}
              />
              <Route
                path="/admin-dashboard/Salary/View/:id"
                element={<ViewSalary />}
              />
              <Route
                path="/admin-dashboard/EmployeeLeaves/:id"
                element={<Leaves />}
              />

              <Route path="/admin-dashboard/Setting" element={<Setting />} />
              <Route path="/admin-dashboard/Leaves" element={<AdminLeaves />} />
              <Route path="/admin-dashboard/Leaves/:id" element={<Details />} />
            </Route>
            <Route
              path="/employees-dashboard"
              element={
                <PrivateRoutes>
                  <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                    <EmployeeDash />
                  </RoleBaseRoutes>
                </PrivateRoutes>
              }
            >
              <Route index element={<EmployeeSummary />} />
              <Route
                path="/employees-dashboard/Profile/:id"
                element={<ViewEmploee />}
              />
              <Route
                path="/employees-dashboard/Leaves/:id"
                element={<Leaves />}
              />

              <Route
                path="/employees-dashboard/Leaves/AddLeave"
                element={<AddLeave />}
              />
              <Route
                path="/employees-dashboard/Salary/:id"
                element={<ViewSalary />}
              />
              <Route
                path="/employees-dashboard/Setting"
                element={<Setting />}
              />
            </Route>
          </Routes>
        </AuthContext>
      </Router>
    </div>
  );
}

export default App;
