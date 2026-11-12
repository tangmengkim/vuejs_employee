<script setup lang="ts">
import EmployeeTable from '../components/EmployeeTable.vue'
import EmployeeDialog from '../components/EmployeeDialog.vue'
import { useEmployeeManager } from '../composables/useEmployeeManager'

const {
  employees,
  isLoading,
  dialogVisible,
  selectedEmployee,
  openAddDialog,
  openEditDialog,
  handleSave,
  handleDelete
} = useEmployeeManager()
</script>

<template>
  <div class="space-y-6">
    <!-- Employee List Table Card -->
    <EmployeeTable :employees="employees" :loading="isLoading" @add="openAddDialog" @edit="openEditDialog"
      @delete="handleDelete" />

    <!-- Employee Form Dialog -->
    <EmployeeDialog v-model:visible="dialogVisible" :employeeToEdit="selectedEmployee" @save="handleSave" />
  </div>
</template>
