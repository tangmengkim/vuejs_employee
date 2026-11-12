<script setup lang="ts">
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import FormLabel from './FormLabel.vue'
import { useAddressCascading } from '../composables/useAddressCascading'

const props = defineProps<{
  form: {
    province: string
    district: string
    commune: string
    village: string
    fullAddress: string
  }
  errors: Record<string, string>
}>()

const {
  provinceOptions,
  districtOptions,
  communeOptions,
  villageOptions,
  onProvinceChange,
  onDistrictChange,
  onCommuneChange,
  onVillageChange
} = useAddressCascading(props.form)
</script>

<template>
  <section>
    <h3 class="text-sm font-semibold text-slate-800 tracking-wide mb-3">Address</h3>

    <!-- Province & District -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <FormLabel field="province">Province</FormLabel>
        <Select
          v-model="form.province"
          :options="provinceOptions"
          filter
          placeholder="Select Province"
          class="w-full text-sm"
          @change="onProvinceChange"
          :invalid="!!errors.province"
        />
        <small v-if="errors.province" class="text-red-500 text-xs mt-1 block">{{ errors.province }}</small>
      </div>

      <div>
        <FormLabel field="district">District</FormLabel>
        <Select
          v-model="form.district"
          :options="districtOptions"
          filter
          :disabled="!form.province"
          placeholder="Select District"
          class="w-full text-sm"
          @change="onDistrictChange"
          :invalid="!!errors.district"
        />
        <small v-if="errors.district" class="text-red-500 text-xs mt-1 block">{{ errors.district }}</small>
      </div>
    </div>

    <!-- Commune & Village -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <FormLabel field="commune">Commune</FormLabel>
        <Select
          v-model="form.commune"
          :options="communeOptions"
          filter
          :disabled="!form.district"
          placeholder="Select Commune"
          class="w-full text-sm"
          @change="onCommuneChange"
          :invalid="!!errors.commune"
        />
        <small v-if="errors.commune" class="text-red-500 text-xs mt-1 block">{{ errors.commune }}</small>
      </div>

      <div>
        <FormLabel field="village">Village</FormLabel>
        <Select
          v-model="form.village"
          :options="villageOptions"
          filter
          :disabled="!form.commune"
          placeholder="Select Village"
          class="w-full text-sm"
          @change="onVillageChange"
          :invalid="!!errors.village"
        />
        <small v-if="errors.village" class="text-red-500 text-xs mt-1 block">{{ errors.village }}</small>
      </div>
    </div>

    <!-- Full Address -->
    <div>
      <FormLabel field="fullAddress">Full Address</FormLabel>
      <Textarea
        v-model="form.fullAddress"
        rows="2"
        placeholder="village_1, bkk, daun_penh"
        class="w-full text-sm"
      />
    </div>
  </section>
</template>
