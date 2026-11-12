<script setup lang="ts">
import { computed } from 'vue'
import { isRequired, type EmployeeFormField } from '../schemas/employee.schema'

const props = withDefaults(
  defineProps<{
    field?: EmployeeFormField | (string & {})
    required?: boolean
    for?: string
    class?: string
  }>(),
  {
    required: undefined
  }
)

const showAsterisk = computed(() => {
  if (typeof props.required === 'boolean') {
    return props.required
  }
  if (props.field) {
    return isRequired(props.field)
  }
  return false
})
</script>

<template>
  <label :for="props.for" :class="['block text-xs font-medium text-slate-700 mb-1.5', props.class]">
    <slot />
    <span v-if="showAsterisk" class="text-red-500 font-bold ml-0.5">*</span>
  </label>
</template>
