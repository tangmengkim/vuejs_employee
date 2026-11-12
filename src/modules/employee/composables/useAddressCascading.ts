import { ref, computed, onMounted } from 'vue'
import {
  loadGeoData,
  getProvincesFromTree,
  getDistrictsFromTree,
  getCommunesFromTree,
  getVillagesFromTree,
  type CambodiaGeoTree
} from '../data/cambodiaAddress.data'

export interface AddressState {
  province: string
  district: string
  commune: string
  village: string
  fullAddress: string
}

export function useAddressCascading(form: AddressState) {
  const geoTree = ref<CambodiaGeoTree | null>(null)
  const isLoading = ref(false)

  const initData = async () => {
    if (geoTree.value) return
    isLoading.value = true
    try {
      geoTree.value = await loadGeoData()
    } catch (err) {
      console.error('Failed to load Cambodia geo data:', err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    initData()
  })

  const provinceOptions = computed(() => getProvincesFromTree(geoTree.value))

  const districtOptions = computed(() => {
    return getDistrictsFromTree(geoTree.value, form.province)
  })

  const communeOptions = computed(() => {
    return getCommunesFromTree(geoTree.value, form.province, form.district)
  })

  const villageOptions = computed(() => {
    return getVillagesFromTree(geoTree.value, form.province, form.district, form.commune)
  })

  const onProvinceChange = () => {
    form.district = ''
    form.commune = ''
    form.village = ''
    updateFullAddress()
  }

  const onDistrictChange = () => {
    form.commune = ''
    form.village = ''
    updateFullAddress()
  }

  const onCommuneChange = () => {
    form.village = ''
    updateFullAddress()
  }

  const onVillageChange = () => {
    updateFullAddress()
  }

  const updateFullAddress = () => {
    const parts = [form.village, form.commune, form.district]
    if (form.province && form.province !== 'Phnom Penh') {
      parts.push(form.province)
    }
    if (parts.length === 0 && form.province) {
      parts.push(form.province)
    }
    form.fullAddress = parts.filter(Boolean).join(', ')
  }

  return {
    isLoading,
    provinceOptions,
    districtOptions,
    communeOptions,
    villageOptions,
    onProvinceChange,
    onDistrictChange,
    onCommuneChange,
    onVillageChange,
    updateFullAddress
  }
}
