import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { employeeService } from '../services/employeeService'
import type { Employee } from '../types/employee.types'

export function useEmployeeManager() {
  const toast = useToast()
  const employees = ref<Employee[]>([])
  const isLoading = ref(false)
  const dialogVisible = ref(false)
  const selectedEmployee = ref<Employee | null>(null)

  const fetchEmployees = async () => {
    isLoading.value = true
    try {
      employees.value = await employeeService.getAll()
    } catch (err) {
      console.error('Failed to load employees from service:', err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchEmployees()
  })

  const openAddDialog = () => {
    selectedEmployee.value = null
    dialogVisible.value = true
  }

  const openEditDialog = (employee: Employee) => {
    selectedEmployee.value = { ...employee }
    dialogVisible.value = true
  }

  const handleSave = async (employeeData: Employee) => {
    try {
      const exists = employees.value.some((e) => e.id === employeeData.id)

      if (exists) {
        const updated = await employeeService.update(employeeData.id, employeeData)
        
        // Create a new array reference so PrimeVue DataTable detects the change and re-renders!
        employees.value = employees.value.map((e) => (e.id === updated.id ? { ...updated } : e))

        toast.add({
          severity: 'success',
          summary: 'Updated',
          detail: `Employee ${updated.name} updated successfully!`,
          life: 3000
        })
      } else {
        const created = await employeeService.create(employeeData)
        
        // Prepend new employee with fresh array reference
        employees.value = [{ ...created }, ...employees.value]

        toast.add({
          severity: 'success',
          summary: 'Created',
          detail: `Employee ${created.name} created successfully!`,
          life: 3000
        })
      }
    } catch (err) {
      console.error('Error saving employee:', err)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to save employee data.',
        life: 3000
      })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const target = employees.value.find((e) => e.id === id)
      const success = await employeeService.delete(id)
      if (success) {
        employees.value = employees.value.filter((e) => e.id !== id)
        toast.add({
          severity: 'info',
          summary: 'Deleted',
          detail: `Employee ${target?.name || ''} was deleted.`,
          life: 3000
        })
      }
    } catch (err) {
      console.error('Error deleting employee:', err)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete employee.',
        life: 3000
      })
    }
  }

  return {
    employees,
    isLoading,
    dialogVisible,
    selectedEmployee,
    fetchEmployees,
    openAddDialog,
    openEditDialog,
    handleSave,
    handleDelete
  }
}
