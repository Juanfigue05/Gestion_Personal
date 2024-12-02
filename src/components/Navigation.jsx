// src/components/Navigation.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import NotificationCenter from "./NotificationCenter";

function Navigation() {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  
  // <div className="flex space-x-4">
  // </div>


  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-lg font-bold">Sistema RRHH</span>
            <div className="hidden md:block ml-10">
              
                {!user ? (
                  <>
                    <Link
                      to="/apply"
                      className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md"
                    >
                      Postular
                    </Link>
                    <Link
                      to="/application-status"
                      className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md"
                    >
                      Estado de Postulación
                    </Link>
                  </>
                ) : role === "employee" ? (
                  <>
                    <Link
                      to="/employee"
                      className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/employee/training"
                      className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md"
                    >
                      Capacitaciones
                    </Link>
                    <Link
                      to="/employee/payroll"
                      className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md"
                    >
                      Mi Nómina
                    </Link>
                  </>
                ) : role === "candidate" ? (
                  <>
                    <Link to="/candidate" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                      Inicio
                    </Link>
                    <Link to="candidate/perfil" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                    Mi Perfil
                    </Link>
                    <Link to="/candidate/Progreso" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                      Progreso
                    </Link>
                    <Link to="/candidate/calendar" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                      Calendario
                    </Link>
                  </>
                ) : null}  
            </div>
          </div>
          <div className="flex items-center">
            {user && (
              <>
                <NotificationCenter />
                <span className="text-white mr-4">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
