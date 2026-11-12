<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import FormLabel from './FormLabel.vue'
import { calculateAge } from '../schemas/employee.schema'

const props = defineProps<{
  form: {
    name: string
    gender: string
    dob: Date | null
    pob?: string
    position: string
    salary: number | null
  }
  errors: Record<string, string>
}>()

const currentAge = computed(() => calculateAge(props.form.dob))
</script>

<template>
  <section>
    <h3 class="text-sm font-semibold text-slate-800 tracking-wide mb-3">Personal Information</h3>

    <!-- Employee Name -->
    <div class="mb-4">
      <FormLabel field="name">Employee Name</FormLabel>
      <InputText
        v-model="form.name"
        placeholder="Enter employee name"
        class="w-full text-sm"
        :invalid="!!errors.name"
      />
      <small v-if="errors.name" class="text-red-500 text-xs mt-1 block">{{ errors.name }}</small>
    </div>

    <!-- Gender & Date of Birth -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <FormLabel field="gender">Gender</FormLabel>
        <Select
          v-model="form.gender"
          :options="['Male', 'Female', 'Other']"
          placeholder="Select Gender"
          class="w-full text-sm"
          :invalid="!!errors.gender"
        />
        <small v-if="errors.gender" class="text-red-500 text-xs mt-1 block">{{ errors.gender }}</small>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <FormLabel field="dob">Date of Birth</FormLabel>
          <span
            v-if="currentAge !== null"
            class="text-[11px]"
            :class="currentAge >= 25 && currentAge <= 35 ? 'text-slate-500' : 'text-red-500 font-medium'"
          >
            Age: {{ currentAge }} years old
          </span>
        </div>
        <DatePicker
          v-model="form.dob"
          showIcon
          dateFormat="yy-mm-dd"
          placeholder="Select date of birth"
          class="w-full text-sm"
          :invalid="!!errors.dob"
        />
        <small v-if="errors.dob" class="text-red-500 text-xs mt-1 block">{{ errors.dob }}</small>
      </div>
    </div>

    <!-- Place of Birth & Position -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <FormLabel field="pob">Place of Birth</FormLabel>
        <Textarea
          v-model="form.pob"
          rows="1"
          autoResize
          placeholder="Enter place of birth"
          class="w-full text-sm resize-none"
        />
      </div>

      <div>
        <FormLabel field="position">Position</FormLabel>
        <Select
          v-model="form.position"
          :options="['Developer', 'Accountant', 'Designer', 'Manager', 'HR', 'QA Engineer', 'Marketing']"
          placeholder="Select Position"
          class="w-full text-sm"
          :invalid="!!errors.position"
        />
        <small v-if="errors.position" class="text-red-500 text-xs mt-1 block">{{ errors.position }}</small>
      </div>
    </div>

    <!-- Salary -->
    <div>
      <FormLabel field="salary">Salary</FormLabel>
      <InputNumber
        v-model="form.salary"
        placeholder="0"
        :min="0"
        :max="5000"
        class="w-full text-sm"
        :invalid="!!errors.salary"
      />
      <small v-if="errors.salary" class="text-red-500 text-xs mt-1 block">{{ errors.salary }}</small>
    </div>
  </section>
</template>
