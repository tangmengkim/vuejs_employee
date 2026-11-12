// Pages / Views
export { default as EmployeePage } from './pages/EmployeePage.vue'

// Components
export { default as EmployeeTable } from './components/EmployeeTable.vue'
export { default as EmployeeDialog } from './components/EmployeeDialog.vue'
export { default as EmployeePersonalInfoSection } from './components/EmployeePersonalInfoSection.vue'
export { default as EmployeeContactSection } from './components/EmployeeContactSection.vue'
export { default as EmployeeAddressSection } from './components/EmployeeAddressSection.vue'

// Composables
export { useEmployeeManager } from './composables/useEmployeeManager'
export { useAddressCascading } from './composables/useAddressCascading'

// Services
export { employeeService } from './services/employeeService'

// Schemas
export { employeeSchema } from './schemas/employee.schema'

// Types
export type { Employee, EmployeeInput } from './types/employee.types'

// Data
export * from './data/cambodiaAddress.data'
