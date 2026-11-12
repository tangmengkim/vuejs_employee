<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import { EmployeePage } from '@/modules/employee'
</script>

<template>
  <main class="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-8xl mx-auto">
      <!-- Employee Feature Page -->
      <EmployeePage />
    </div>

    <!-- Global PrimeVue Providers -->
    <ConfirmDialog />
    <Toast position="bottom-right" />
  </main>
</template>
