<script setup lang="ts">
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import FormLabel from './FormLabel.vue'

defineProps<{
  form: {
    phone: string
    email: string
  }
  errors: Record<string, string>
}>()
</script>

<template>
  <section>
    <h3 class="text-sm font-semibold text-slate-800 tracking-wide mb-3">Contact Information</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <FormLabel field="phone">Phone</FormLabel>
        <InputMask
          v-model="form.phone"
          mask="999999999?9"
          :autoClear="false"
          placeholder="012345678"
          class="w-full text-sm"
          :invalid="!!errors.phone"
        />
        <small v-if="errors.phone" class="text-red-500 text-xs mt-1 block">{{ errors.phone }}</small>
      </div>

      <div>
        <FormLabel field="email">Email</FormLabel>
        <InputText
          v-model="form.email"
          type="email"
          placeholder="john@example.com"
          class="w-full text-sm"
          :invalid="!!errors.email"
        />
        <small v-if="errors.email" class="text-red-500 text-xs mt-1 block">{{ errors.email }}</small>
      </div>
    </div>
  </section>
</template>
