// src/components/admin/EmployeeManagement.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
//import { addNotification } from "../store/slices/notificationSlice";
import { addNotification } from "../../store/slices/notificationSlice";

function EmployeeManagement() {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      position: "Desarrollador",
      department: "IT",
      status: "Activo",
      email: "juan@empresa.com",
      phone: "123456789",
    },
    {
      id: 2,
      name: "María García",
      position: "Diseñadora",
      department: "Diseño",
      status: "Activo",
      email: "maria@empresa.com",
      phone: "987654321",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    status: "Activo",
  });

  // Nuevos estados para búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    status: "",
  });

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData(employee);
    } else {
      setEditingEmployee(null);
      setFormData({
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        status: "Activo",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      dispatch(
        addNotification({
          type: "error",
          title: "Error de Validación",
          message: "Por favor, corrija los errores en el formulario",
        })
      );
      return;
    }

    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? { ...formData, id: emp.id } : emp
        )
      );
      dispatch(
        addNotification({
          type: "success",
          title: "Empleado Actualizado",
          message: `Se actualizó la información de ${formData.name}`,
        })
      );
    } else {
      const newEmployee = {
        ...formData,
        id: Date.now(),
      };
      setEmployees([...employees, newEmployee]);
      dispatch(
        addNotification({
          type: "success",
          title: "Nuevo Empleado",
          message: `Se agregó a ${formData.name} como nuevo empleado`,
        })
      );
    }
    handleCloseModal();
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("¿Está seguro de eliminar este empleado?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // Función para filtrar empleados
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filters.department === "" || employee.department === filters.department;
    const matchesStatus =
      filters.status === "" || employee.status === filters.status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Agregar antes del return existente:
  const departments = [...new Set(employees.map((emp) => emp.department))];
  const statuses = [...new Set(employees.map((emp) => emp.status))];

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Título del documento
    doc.text("Lista de Empleados", 14, 15);

    // Preparar datos para la tabla
    const tableData = filteredEmployees.map((emp) => [
      emp.name,
      emp.position,
      emp.department,
      emp.email,
      emp.status,
    ]);

    // Generar tabla
    doc.autoTable({
      head: [["Nombre", "Cargo", "Departamento", "Email", "Estado"]],
      body: tableData,
      startY: 20,
    });

    // Guardar el PDF
    doc.save("empleados.pdf");
  };

  const exportToExcel = () => {
    // Preparar datos para Excel
    const excelData = filteredEmployees.map((emp) => ({
      Nombre: emp.name,
      Cargo: emp.position,
      Departamento: emp.department,
      Email: emp.email,
      Estado: emp.status,
      Teléfono: emp.phone,
    }));

    // Crear workbook y worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Agregar worksheet al workbook
    XLSX.utils.book_append_sheet(wb, ws, "Empleados");

    // Guardar archivo
    XLSX.writeFile(wb, "empleados.xlsx");
  };

  const validateForm = (data) => {
    const errors = {};

    // Validación del nombre
    if (!data.name.trim()) {
      errors.name = "El nombre es requerido";
    } else if (data.name.length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
    }

    // Validación del email
    if (!data.email) {
      errors.email = "El email es requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      errors.email = "Email inválido";
    }

    // Validación del teléfono
    if (data.phone && !/^\d{9,}$/.test(data.phone)) {
      errors.phone = "El teléfono debe tener al menos 9 dígitos";
    }

    // Validación del cargo
    if (!data.position.trim()) {
      errors.position = "El cargo es requerido";
    }

    // Validación del departamento
    if (!data.department.trim()) {
      errors.department = "El departamento es requerido";
    }

    return errors;
  };

  return (
    <div className="p-6">
      {/* Header y Botón Agregar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Gestión de Empleados
        </h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          + Nuevo Empleado
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Gestión de Empleados
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={exportToExcel}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Exportar Excel
              </button>
              <button
                onClick={exportToPDF}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Exportar PDF
              </button>
              <button
                onClick={() => handleOpenModal()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                + Nuevo Empleado
              </button>
            </div>
          </div>
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departamento
            </label>
            <select
              name="department"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="status"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilters({ department: "", status: "" });
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de Empleados */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {employee.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {employee.position}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {employee.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(employee)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Agregar/Editar Empleado */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">
              {editingEmployee ? "Editar Empleado" : "Nuevo Empleado"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  {" "}
                  {/* Este es el div que debes reemplazar */}
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cargo
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Departamento
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Suspendido">Suspendido</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  {editingEmployee ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;
