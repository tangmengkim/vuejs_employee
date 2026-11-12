<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { useConfirm } from 'primevue/useconfirm'
import type { Employee } from '../types/employee.types'

const props = defineProps<{
  employees: Employee[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit', employee: Employee): void
  (e: 'delete', id: number): void
}>()

const confirm = useConfirm()

const onDeleteClick = (employee: Employee) => {
  confirm.require({
    message: `Are you sure you want to delete employee "${employee.name}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle text-amber-500',
    rejectLabel: 'No',
    acceptLabel: 'Yes',
    rejectProps: {
      label: 'No',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Yes',
      severity: 'danger'
    },
    accept: () => {
      emit('delete', employee.id)
    }
  })
}

const formatSalary = (amount: number | null | undefined): string => {
  if (amount == null) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const getPositionSeverity = (position: string): 'info' | 'success' | 'warn' | 'contrast' | 'secondary' => {
  switch (position?.toLowerCase()) {
    case 'developer':
      return 'info'
    case 'accountant':
      return 'success'
    case 'designer':
      return 'warn'
    case 'manager':
      return 'contrast'
    default:
      return 'secondary'
  }
}
</script>


<template>
  <div class="flex flex-col gap-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between border-slate-100 gap-4">
      <div>
        <h2 class="text-xl font-bold text-slate-800 tracking-tight">Employees</h2>
        <p class="text-sm text-slate-500 mt-0.5">Manage employee information</p>
      </div>
      <div>
        <Button @click="$emit('add')" icon="pi pi-plus" label="Add Employee" severity="contrast"
          class="rounded-md! ring-2! ring-zinc-950! ring-offset-2!" />

      </div>
    </div>

    <!-- Data Table -->
    <DataTable :value="employees" :loading="loading" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      responsiveLayout="scroll" stripedRows
      class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" dataKey="id">
      <template #empty>
        <div class="text-center py-8 text-slate-400">
          <i class="pi pi-inbox text-3xl mb-2 block"></i>
          <span>No employees found. Click "Add Employee" to create one.</span>
        </div>
      </template>

      <!-- Employee Name -->
      <Column field="name" header="Employee Name" sortable
        headerClass="text-xs font-semibold text-slate-600 bg-slate-50/70">
        <template #body="{ data }">
          <span class="font-medium text-slate-800 text-sm">{{ data.name }}</span>
        </template>
      </Column>

      <!-- Gender -->
      <Column field="gender" header="Gender" headerClass="text-xs font-semibold text-slate-600 bg-slate-50/70">
        <template #body="{ data }">
          <span class="text-slate-600 text-sm">{{ data.gender }}</span>
        </template>
      </Column>

      <!-- Phone -->
      <Column field="phone" header="Phone" headerClass="text-xs font-semibold text-slate-600 bg-slate-50/70">
        <template #body="{ data }">
          <span class="text-slate-600 text-sm font-mono">{{ data.phone }}</span>
        </template>
      </Column>

      <!-- Email -->
      <Column field="email" header="Email" headerClass="text-xs font-semibold text-slate-600 bg-slate-50/70">
        <template #body="{ data }">
          <span class="text-slate-600 text-sm">{{ data.email }}</span>
        </template>
      </Column>

      <!-- Position -->
      <Column field="position" header="Position" headerClass="text-xs font-semibold text-slate-600 bg-slate-50/70">
        <template #body="{ data }">
          <Tag :value="data.position" :severity="getPositionSeverity(data.position)" rounded />
        </template>
      </Column>

      <!-- Salary -->
      <Column field="salary" header="Salary" headerClass="text-xs font-semibold text-slate-600 bg-slate-50/70">
        <template #body="{ data }">
          <span class="text-slate-700 text-sm font-medium">
            {{ formatSalary(data.salary) }}
          </span>
        </template>
      </Column>

      <!-- Address -->
      <Column field="fullAddress" header="Address" headerClass="text-xs font-semibold text-slate-600 bg-slate-50/70">
        <template #body="{ data }">
          <span class="text-slate-600 text-sm">{{ data.fullAddress }}</span>
        </template>
      </Column>

      <!-- Actions -->
      <Column header="Actions" headerClass="text-xs font-semibold text-slate-600 bg-slate-50/70" bodyClass="text-right">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <Button icon="pi pi-pencil" severity="secondary" text rounded size="small" title="Edit Employee"
              @click="$emit('edit', data)" />
            <Button icon="pi pi-trash" severity="danger" text rounded size="small" title="Delete Employee"
              @click="onDeleteClick(data)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
