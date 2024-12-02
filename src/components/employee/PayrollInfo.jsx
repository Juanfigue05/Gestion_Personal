// src/components/employee/PayrollInfo.jsx
import React, { useState } from 'react';

function PayrollInfo() {
  // Estado para los datos de nómina
  const [payrollData] = useState({
    currentSalary: {
      base: 45000,
      bonuses: 2000,
      deductions: 1500,
      net: 45500
    },
    payrollHistory: [
      {
        id: 1,
        period: "Febrero 2024",
        baseAmount: 45000,
        bonuses: 2000,
        deductions: 1500,
        netAmount: 45500,
        paymentDate: "2024-02-28",
        status: "Pagado",
        details: {
          overtime: 500,
          transport: 300,
          health: 800,
          pension: 700
        }
      },
      {
        id: 2,
        period: "Enero 2024",
        baseAmount: 45000,
        bonuses: 1800,
        deductions: 1500,
        netAmount: 45300,
        paymentDate: "2024-01-31",
        status: "Pagado",
        details: {
          overtime: 300,
          transport: 300,
          health: 800,
          pension: 700
        }
      }
    ]
  });

  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const viewDetails = (payroll) => {
    setSelectedPayroll(payroll);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mi Nómina</h2>

      {/* Resumen de Salario Actual */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Salario Actual</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Salario Base</p>
            <p className="text-2xl font-bold text-gray-900">
              ${payrollData.currentSalary.base.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Bonificaciones</p>
            <p className="text-2xl font-bold text-green-600">
              +${payrollData.currentSalary.bonuses.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Deducciones</p>
            <p className="text-2xl font-bold text-red-600">
              -${payrollData.currentSalary.deductions.toLocaleString()}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-600">Total Neto</p>
            <p className="text-2xl font-bold text-indigo-600">
              ${payrollData.currentSalary.net.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Historial de Nómina */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Historial de Pagos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Período</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha de Pago</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto Neto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollData.payrollHistory.map((payroll) => (
                <tr key={payroll.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payroll.period}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{payroll.paymentDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${payroll.netAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewDetails(payroll)}
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
      </div>

      {/* Modal de Detalles */}
      {showModal && selectedPayroll && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">
                Detalles de Nómina - {selectedPayroll.period}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Cerrar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Fecha de Pago</p>
                <p className="font-medium">{selectedPayroll.paymentDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <p className="font-medium">{selectedPayroll.status}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Desglose de Pago</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salario Base</span>
                    <span className="font-medium">${selectedPayroll.baseAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Bonificaciones</span>
                    <span>+${selectedPayroll.bonuses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Deducciones</span>
                    <span>-${selectedPayroll.deductions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total Neto</span>
                    <span>${selectedPayroll.netAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Detalles Adicionales</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Horas Extra</p>
                    <p className="font-medium">${selectedPayroll.details.overtime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transporte</p>
                    <p className="font-medium">${selectedPayroll.details.transport}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salud</p>
                    <p className="font-medium">-${selectedPayroll.details.health}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pensión</p>
                    <p className="font-medium">-${selectedPayroll.details.pension}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
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

export default PayrollInfo;