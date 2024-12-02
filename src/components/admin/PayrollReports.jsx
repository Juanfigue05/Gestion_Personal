// src/components/admin/PayrollReports.jsx
import React, { useState } from 'react';

function PayrollReports() {
  // Estado para los datos de nómina
  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      employeeName: "María García",
      position: "Diseñadora",
      department: "Diseño",
      baseSalary: 45000,
      bonuses: 2000,
      deductions: 1500,
      netSalary: 45500,
      paymentDate: "2024-02-28",
      status: "Pagado"
    },
    {
      id: 2,
      employeeName: "Juan Pérez",
      position: "Desarrollador",
      department: "IT",
      baseSalary: 52000,
      bonuses: 3000,
      deductions: 2000,
      netSalary: 53000,
      paymentDate: "2024-02-28",
      status: "Pagado"
    }
  ]);

  // Estado para filtros
  const [filters, setFilters] = useState({
    department: '',
    month: '',
    status: ''
  });

  // Estado para el modal de detalles
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Calcular totales para el resumen
  const totals = {
    totalEmployees: payrollData.length,
    totalPayroll: payrollData.reduce((sum, item) => sum + item.netSalary, 0),
    totalBonuses: payrollData.reduce((sum, item) => sum + item.bonuses, 0),
    totalDeductions: payrollData.reduce((sum, item) => sum + item.deductions, 0)
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Informes de Nómina</h2>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Exportar Excel
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Empleados</h3>
          <p className="text-2xl font-bold">{totals.totalEmployees}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Nómina Total</h3>
          <p className="text-2xl font-bold">${totals.totalPayroll.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Bonos</h3>
          <p className="text-2xl font-bold text-green-600">${totals.totalBonuses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Deducciones</h3>
          <p className="text-2xl font-bold text-red-600">${totals.totalDeductions.toLocaleString()}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
            <select
              name="department"
              className="w-full border-gray-300 rounded-md shadow-sm"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="IT">IT</option>
              <option value="Diseño">Diseño</option>
              <option value="RRHH">RRHH</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
            <select
              name="month"
              className="w-full border-gray-300 rounded-md shadow-sm"
              value={filters.month}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              name="status"
              className="w-full border-gray-300 rounded-md shadow-sm"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="Pagado">Pagado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Procesando">Procesando</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de nómina */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salario Base</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deducciones</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrollData.map((payroll) => (
              <tr key={payroll.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{payroll.employeeName}</div>
                  <div className="text-sm text-gray-500">{payroll.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payroll.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${payroll.baseSalary.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-600">+${payroll.bonuses.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600">-${payroll.deductions.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${payroll.netSalary.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${payroll.status === 'Pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {payroll.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedPayroll(payroll);
                      setShowDetailsModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalles */}
      {showDetailsModal && selectedPayroll && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h3 className="text-lg font-bold mb-4">Detalles de Nómina</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Empleado</p>
                <p className="font-medium">{selectedPayroll.employeeName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Departamento</p>
                <p className="font-medium">{selectedPayroll.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha de Pago</p>
                <p className="font-medium">{selectedPayroll.paymentDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <p className="font-medium">{selectedPayroll.status}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Desglose de Pago</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Salario Base</span>
                  <span>${selectedPayroll.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Bonos</span>
                  <span>+${selectedPayroll.bonuses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Deducciones</span>
                  <span>-${selectedPayroll.deductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>${selectedPayroll.netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PayrollReports;