<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import EmployeePersonalInfoSection from './EmployeePersonalInfoSection.vue'
import EmployeeContactSection from './EmployeeContactSection.vue'
import EmployeeAddressSection from './EmployeeAddressSection.vue'
import { employeeSchema } from '../schemas/employee.schema'
import type { Employee } from '../types/employee.types'

const props = defineProps<{
  visible: boolean
  employeeToEdit?: Employee | null
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
  (e: 'save', payload: Employee): void
}>()

const isEdit = computed(() => !!props.employeeToEdit?.id)
const errors = ref<Record<string, string>>({})
const isSubmitted = ref(false)

const defaultState = {
  id: undefined as number | undefined,
  name: '',
  gender: '',
  dob: null as Date | null,
  pob: '',
  position: '',
  salary: 0,
  phone: '',
  email: '',
  province: '',
  district: '',
  commune: '',
  village: '',
  fullAddress: ''
}

const form = reactive({ ...defaultState })

const validateField = (field: string, value: any) => {
  const validator = (employeeSchema.shape as any)[field]
  if (!validator) return

  const hadError = !!errors.value[field]
  const isEmpty =
    value === '' ||
    value === null ||
    value === undefined ||
    (field === 'salary' && (value === 0 || value == null))

  // Before submit, empty fields
  if (!isSubmitted.value && isEmpty && !hadError) {
    return
  }

  const res = validator.safeParse(value)
  if (res.success) {
    delete errors.value[field]
  } else {
    // Show error if user submitted, or field had an error, or user explicitly entered an invalid value
    if (isSubmitted.value || hadError || !isEmpty) {
      errors.value[field] = res.error.issues[0]?.message || 'Invalid value'
    }
  }
}

watch(
  form,
  (newForm) => {
    for (const [key, val] of Object.entries(newForm)) {
      validateField(key, val)
    }
  },
  { deep: true }
)

watch(
  [() => props.visible, () => props.employeeToEdit],
  ([visible, employee]) => {
    isSubmitted.value = false
    errors.value = {}
    if (visible && employee) {
      Object.assign(form, {
        ...defaultState,
        ...employee,
        dob: employee.dob ? new Date(employee.dob) : null,
        salary: employee.salary ?? 0
      })
    } else if (visible) {
      Object.assign(form, { ...defaultState })
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  isSubmitted.value = true
  const result = employeeSchema.safeParse(form)

  if (!result.success) {
    errors.value = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (!errors.value[field]) {
        errors.value[field] = issue.message
      }
    }
    return
  }

  errors.value = {}
  isSubmitted.value = false
  console.log('-------------------------------------------')
  console.log('EMPLOYEE SUBMIT PAYLOAD :')
  console.log(result.data)
  console.log('JSON Payload:', JSON.stringify(result.data, null, 2))
  console.log('-------------------------------------------')

  emit('save', {
    ...result.data,
    id: form.id ?? result.data.id ?? Date.now()
  } as Employee)

  emit('update:visible', false)
}
</script>


<template>
  <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)"
    :header="isEdit ? 'Edit Employee' : 'Add Employee'" modal class="w-full max-w-2xl"
    :style="{ width: '92vw', maxWidth: '680px' }">
    <div class="space-y-6 pt-1 text-slate-700 text-sm">
      <!-- Section 1: Personal Information -->
      <EmployeePersonalInfoSection :form="form" :errors="errors" />

      <!-- Section 2: Contact Information -->
      <EmployeeContactSection :form="form" :errors="errors" />

      <!-- Section 3: Address -->
      <EmployeeAddressSection :form="form" :errors="errors" />
    </div>

    <!-- Footer Actions -->
    <template #footer>
      <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        <Button label="Cancel" severity="secondary" text @click="$emit('update:visible', false)" />
        <Button label="Save" icon="pi pi-save" severity="contrast" @click="handleSubmit" />
      </div>
    </template>
  </Dialog>
</template>
