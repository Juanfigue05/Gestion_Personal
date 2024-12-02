// src/store/slices/candidateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    submitApplication: (state, action) => {
      state.applications.push({
        ...action.payload,
        id: `APP-${Date.now()}`,
        status: 'Pendiente',
        appliedDate: new Date().toISOString(),
        steps: [
          { name: "Aplicación Recibida", completed: true, date: new Date().toISOString() },
          { name: "Revisión de CV", completed: false, date: null },
          { name: "Entrevista RRHH", completed: false, date: null },
          { name: "Prueba Técnica", completed: false, date: null },
          { name: "Entrevista Final", completed: false, date: null }
        ]
      });
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
    },
    updateApplicationStatus: (state, action) => {
      const { id, status, step } = action.payload;
      const application = state.applications.find(app => app.id === id);
      if (application) {
        application.status = status;
        if (step) {
          const currentStep = application.steps.find(s => s.name === step);
          if (currentStep) {
            currentStep.completed = true;
            currentStep.date = new Date().toISOString();
          }
        }
      }
    }
  }
});

export const { 
  submitApplication, 
  setCurrentApplication, 
  updateApplicationStatus 
} = candidateSlice.actions;

export default candidateSlice.reducer;