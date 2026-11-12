import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import { definePreset } from '@primeuix/themes';


const primevueKey = import.meta.env.PRIMEVUE_KEY || import.meta.env.VITE_PRIMEVUE_KEY
const app = createApp(App)


const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{surface.50}',
            100: '{surface.100}',
            200: '{surface.200}',
            300: '{surface.300}',
            400: '{surface.400}',
            500: '{surface.500}',
            600: '{surface.600}',
            700: '{surface.700}',
            800: '{surface.800}',
            900: '{surface.900}',
            950: '{surface.950}',
            color: 'light-dark({primary.950}, {primary.50})',
            contrastColor: 'light-dark(#ffffff, {primary.950})',
            hoverColor: 'light-dark({primary.800}, {primary.200})',
            activeColor: 'light-dark({primary.700}, {primary.300})'
        },
        highlight: {
            background: 'light-dark({primary.950}, {primary.50})',
            focusBackground: 'light-dark({primary.700}, {primary.300})',
            color: 'light-dark(#ffffff, {primary.950})',
            focusColor: 'light-dark(#ffffff, {primary.950})'
        }
    }
});


app.use(PrimeVue, {
  license: primevueKey,
  theme: {
    preset: Noir,
    options: {
      darkModeSelector: ".p-dark",
      cssLayer: false,
    },
  }
})

app.use(ConfirmationService)
app.use(ToastService)

app.mount('#app')
