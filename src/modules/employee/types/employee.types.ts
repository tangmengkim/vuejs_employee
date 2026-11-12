export interface Employee {
  id: number
  name: string
  gender: string
  dob: Date | string | null
  pob?: string
  position: string
  salary: number
  phone: string
  email: string
  province: string
  district: string
  commune: string
  village: string
  fullAddress: string
}

export type EmployeeInput = Omit<Employee, 'id'> & { id?: number }
