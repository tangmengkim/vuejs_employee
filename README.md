# Employee Management Application (បង្កើត Form Employee)

A complete Vue 3 + TypeScript application built according to the specification with **PrimeVue 4**, **Tailwind CSS**, and **Vuelidate**.

## 🛠️ Tech Stack & Resources Used

- **Vite 8**: Scaffolding & Build tool
- **Vue 3**: Composition API with `<script setup>` syntax
- **TypeScript**: Strict types & interfaces
- **PrimeVue 4**: Aura theme with PrimeIcons
  - `DataTable` & `Column` with sorting & pagination
  - `Dialog` for Add & Edit Employee
  - `ConfirmDialog` with Yes/No confirmation buttons for Delete
  - `InputText`, `Select` (with search filter), `DatePicker`, `InputNumber`, `InputMask`, `Textarea`, `Button`, `Toast`
- **Tailwind CSS v4**: Utility-first CSS styling
- **Vuelidate**: `@vuelidate/core` and `@vuelidate/validators` for form validation

---

## 📋 Features Implemented

### 1. Employee List (`EmployeeTable.vue`)
- Columns matching the specification:
  - **Employee Name** (sortable `⇅`)
  - **Gender**
  - **Phone**
  - **Email**
  - **Position** (pill badge with distinct color schemes per role, e.g., Developer, Accountant)
  - **Salary** (formatted as currency `$1,200.00`)
  - **Address** (`village_1, bkk, daun_penh`)
  - **Actions** (Pencil Edit button & Red Trash Delete button)
- Paginator with page navigation and rows-per-page dropdown (`[5, 10, 20, 50]`).
- Pre-populated with initial mock data matching the screenshot (`John Smith`, `Sokha Chan`).
- **+ Add Employee** button opens the form in creation mode.
- **Edit** button opens the dialog with pre-filled employee data.
- **Delete** button triggers a PrimeVue `ConfirmDialog` with **Yes** and **No** buttons.

### 2. Employee Dialog & Form (`EmployeeDialog.vue`)
- Modal Dialog divided into 3 clear sections:
  1. **Personal Information**
     - Employee Name `*`
     - Gender `*` (Select)
     - Date of Birth `*` (DatePicker with input calendar icon)
     - Place of Birth (Textarea)
     - Position `*` (Select)
     - Salary `*` (InputNumber, default 0)
  2. **Contact Information**
     - Phone `*` (InputMask)
     - Email `*` (InputText with email validator)
  3. **Address**
     - Province `*` (Filterable Select with search)
     - District `*` (Filterable Select with search, dependent on Province)
     - Commune `*` (Filterable Select with search, dependent on District)
     - Village `*` (Filterable Select with search, dependent on Commune)
     - Full Address (Textarea auto-populated from selected location)
- **Required Field Labels**: Marked with red asterisk `<span class="text-red-500 font-bold">*</span>`.
- **Cancel** & **Save** footer buttons.

### 3. Field Validation Rules (Vuelidate)
- **Employee Name**: Required text.
- **Gender**: Required select.
- **Date of Birth**: Required DatePicker, validates that the employee's age is between **25 and 35 years old**.
- **Place of Birth**: Textarea.
- **Position**: Required select.
- **Salary**: Required number, validated between **1 and 5000** (default 0 triggers error on submit).
- **Phone**: Required InputMask, formatted according to phone numbers (8 to 11 digits).
- **Email**: Required, validated email format.
- **Cascading Address with Live Search**:
  - Selecting **Province** filters available **Districts**.
  - Selecting **District** filters available **Communes**.
  - Selecting **Commune** filters available **Villages**.
  - **Reset Logic**: Changing Province automatically resets District, Commune, and Village!
  - **Full Address Auto-generation**: Selecting address levels updates the Full Address textarea automatically.
- **Validation Messages**: Displayed directly below each input box in red text upon clicking **Save/Submit**.
- **Submit Payload**: Logs the form payload to browser console with `console.log` and updates the employee list reactively.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
