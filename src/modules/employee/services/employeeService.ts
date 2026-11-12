import type { Employee, EmployeeInput } from '../types/employee.types'

const STORAGE_KEY = 'employee_management_data'

/**
 * Initial mock data matching the assignment specification
 */
const INITIAL_MOCK_EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'John Smith',
    gender: 'Male',
    phone: '012345678',
    email: 'john@example.com',
    position: 'Developer',
    salary: 1200,
    dob: new Date('1996-05-15'),
    pob: 'Phnom Penh',
    province: 'Phnom Penh',
    district: 'Boeng Keng Kang',
    commune: 'Boeng Keng Kang Ti Muoy',
    village: 'Phum Muoy',
    fullAddress: 'Phum Muoy, Boeng Keng Kang Ti Muoy, Boeng Keng Kang'
  },
  {
    id: 2,
    name: 'Sokha Chan',
    gender: 'Female',
    phone: '098765432',
    email: 'sokha@example.com',
    position: 'Accountant',
    salary: 1000,
    dob: new Date('1998-08-20'),
    pob: 'Kandal',
    province: 'Phnom Penh',
    district: 'Chamkar Mon',
    commune: 'Tonle Basak',
    village: 'Phum Pir',
    fullAddress: 'Phum Pir, Tonle Basak, Chamkar Mon'
  }
]

// In-memory / LocalStorage state helper
function loadState(): Employee[] {
  if (typeof window !== 'undefined' && window.localStorage) {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        return parsed.map((e: any) => ({
          ...e,
          dob: e.dob ? new Date(e.dob) : null
        }))
      } catch (err) {
        console.warn('Failed to parse stored employees, using initial mock data', err)
      }
    }
  }
  return [...INITIAL_MOCK_EMPLOYEES]
}

function saveState(list: Employee[]): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }
}

let employeesState: Employee[] = loadState()

/**
 * Employee Service
 * Acts as the single source of truth for all employee data operations.
 * Purely client-side mock service — no external API required.
 */
export const employeeService = {
  /**
   * Fetch all employees
   */
  async getAll(): Promise<Employee[]> {
    // Return a clone to prevent accidental outside mutations
    return employeesState.map((e) => ({ ...e }))
  },

  /**
   * Fetch an employee by ID
   */
  async getById(id: number): Promise<Employee | null> {
    const found = employeesState.find((e) => e.id === id)
    return found ? { ...found } : null
  },

  /**
   * Create a new employee
   */
  async create(input: EmployeeInput): Promise<Employee> {
    const newEmployee: Employee = {
      ...input,
      id: input.id || Date.now()
    }
    employeesState = [newEmployee, ...employeesState]
    saveState(employeesState)
    return { ...newEmployee }
  },

  /**
   * Update an existing employee
   */
  async update(id: number, changes: Partial<Employee>): Promise<Employee> {
    const index = employeesState.findIndex((e) => e.id === id)
    if (index === -1) {
      throw new Error(`Employee with ID ${id} not found`)
    }
    const updated: Employee = {
      ...employeesState[index],
      ...changes,
      id
    }
    employeesState[index] = updated
    saveState(employeesState)
    return { ...updated }
  },

  /**
   * Delete an employee by ID
   */
  async delete(id: number): Promise<boolean> {
    const index = employeesState.findIndex((e) => e.id === id)
    if (index === -1) {
      return false
    }
    employeesState.splice(index, 1)
    saveState(employeesState)
    return true
  },

  /**
   * Reset data back to initial mock dataset
   */
  async resetToDefault(): Promise<Employee[]> {
    employeesState = [...INITIAL_MOCK_EMPLOYEES]
    saveState(employeesState)
    return employeesState.map((e) => ({ ...e }))
  }
}
