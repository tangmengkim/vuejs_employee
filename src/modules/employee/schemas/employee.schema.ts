import { z } from 'zod'

export const calculateAge = (dob: Date | null | undefined): number | null => {
  if (!dob) return null
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

export const employeeSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1, 'Employee Name is required'),
  gender: z.string().min(1, 'Gender is required'),
  dob: z
    .custom<Date | null>((val) => val instanceof Date && !isNaN(val.getTime()), 'Date of Birth is required')
    .refine((val) => {
      const age = calculateAge(val)
      return age !== null && age >= 25 && age <= 35
    }, 'Employee age must be between 25 and 35 years old'),
  pob: z.string().optional().default(''),
  position: z.string().min(1, 'Position is required'),
  salary: z
    .number({ message: 'Salary is required' })
    .min(1, 'Salary must be between 1 and 5000')
    .max(5000, 'Salary must be between 1 and 5000'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .refine((val) => {
      const digits = val.replace(/\D/g, '')
      return digits.length >= 8 && digits.length <= 11
    }, 'Phone must be a valid phone number (e.g. 012345678)'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  province: z.string().min(1, 'Province is required'),
  district: z.string().min(1, 'District is required'),
  commune: z.string().min(1, 'Commune is required'),
  village: z.string().min(1, 'Village is required'),
  fullAddress: z.string().optional().default('')
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

export type EmployeeFormField = keyof typeof employeeSchema.shape

export const isRequired = (field: EmployeeFormField | string): boolean => {
  const fieldSchema = (employeeSchema.shape as any)[field]
  if (!fieldSchema) return false
  return !fieldSchema.safeParse(undefined).success
}
