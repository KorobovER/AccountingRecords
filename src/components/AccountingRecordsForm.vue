<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Учетные записи</h1>
        <button 
          type="button"
          @click="addNewRecord"
          class="w-10 h-10 flex items-center justify-center border-2 border-gray-300 bg-white rounded-lg hover:bg-gray-50 font-bold text-xl transition-colors" 
          aria-label="Добавить новую учетную запись"
        >
          +
        </button>
      </header>

      <form class="bg-white rounded-lg shadow overflow-hidden" role="form">
        <div class="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200 font-semibold text-sm text-gray-700" role="row">
          <div class="col-span-2" role="columnheader">Метки</div>
          <div class="col-span-2" role="columnheader">Тип записи</div>
          <div class="col-span-2" role="columnheader">Логин</div>
          <div class="col-span-3" role="columnheader">Пароль</div>
          <div class="col-span-1 text-center" role="columnheader">Действия</div>
        </div>

        <div v-if="store.records.length === 0" class="px-6 py-12 text-center text-gray-500">
          Нет учетных записей. Нажмите "+" для добавления.
        </div>

        <div v-for="record in store.records" :key="record.id" role="rowgroup">
          <div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors" :class="{ 'bg-red-50': hasErrors(record.id) }" role="row">
            <div class="col-span-2" role="gridcell">
              <input 
                type="text" 
                :value="getTagsInput(record.id)"
                @input="(e) => updateField(record.id, 'tags', (e.target as HTMLInputElement).value)"
                @blur="() => validateAndSave(record.id)"
                placeholder="Метки" 
                maxlength="50" 
                aria-label="Метки"
                :class="{ 'border-red-500': errors[record.id]?.tags }"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
              />
            </div>

            <div class="col-span-2" role="gridcell">
              <select 
                :value="getField(record.id, 'type')"
                @change="(e) => handleTypeChange(record.id, (e.target as HTMLSelectElement).value)"
                aria-label="Тип записи" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="Локальная">Локальная</option>
                <option value="LDAP">LDAP</option>
              </select>
            </div>
            
            <div class="col-span-2" role="gridcell">
              <input 
                type="text" 
                :value="getField(record.id, 'login')"
                @input="(e) => updateField(record.id, 'login', (e.target as HTMLInputElement).value)"
                @blur="() => validateAndSave(record.id)"
                placeholder="Логин" 
                maxlength="100" 
                aria-label="Логин"
                :class="{ 'border-red-500': errors[record.id]?.login }"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
              />
            </div>

            <div class="col-span-3" role="gridcell">
              <input 
                v-if="getField(record.id, 'type') === 'Локальная'"
                type="password" 
                :value="getField(record.id, 'password')"
                @input="(e) => updateField(record.id, 'password', (e.target as HTMLInputElement).value)"
                @blur="() => validateAndSave(record.id)"
                placeholder="Пароль" 
                maxlength="100" 
                aria-label="Пароль"
                :class="{ 'border-red-500': errors[record.id]?.password }"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
              />
              <div v-else class="h-10 bg-gray-100 rounded border border-gray-300"></div>
            </div>

            <div class="col-span-1 flex justify-center" role="gridcell">
              <button 
                type="button" 
                @click="deleteRecord(record.id)"
                aria-label="Удалить запись" 
                class="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAccountStore } from '../stores/accountStore'
import type { RecordType } from '../types'

const store = useAccountStore()
const errors = ref<Record<string, Record<string, boolean>>>({})
const editingTags = ref<Record<string, string>>({})

onMounted(() => {
  store.loadFromStorage()
})

const addNewRecord = () => {
  store.addRecord()
}

const deleteRecord = (id: string) => {
  store.deleteRecord(id)
  delete errors.value[id]
  delete editingTags.value[id]
}

const getField = (id: string, field: string): any => {
  const record = store.getRecordById(id)
  if (!record) return ''
  if (field === 'tags') {
    return record.tags.map((t: any) => t.text).join('; ')
  }
  return (record as any)[field] || ''
}

const getTagsInput = (id: string): string => {
  if (editingTags.value[id] !== undefined) {
    return editingTags.value[id]
  }
  return getField(id, 'tags')
}

const updateField = (id: string, field: string, value: string) => {
  const record = store.getRecordById(id)
  if (!record) return

  if (field === 'tags') {
    editingTags.value[id] = value
  } else if (field === 'type') {
    record.type = value as RecordType
    if (value === 'LDAP') {
      record.password = null
    }
  } else if (field === 'login') {
    record.login = value
  } else if (field === 'password') {
    record.password = value
  }
}

const handleTypeChange = (id: string, value: string) => {
  updateField(id, 'type', value)
  validateAndSave(id)
}

const hasErrors = (id: string): boolean => {
  return Object.keys(errors.value[id] || {}).length > 0
}

const validateRecord = (id: string): boolean => {
  const record = store.getRecordById(id)
  if (!record) return false

  const recordErrors: Record<string, boolean> = {}
  let isValid = true

  if (!record.login.trim()) {
    recordErrors.login = true
    isValid = false
  }

  if (record.type === 'Локальная' && !record.password?.trim()) {
    recordErrors.password = true
    isValid = false
  }

  errors.value[id] = recordErrors
  return isValid
}

const validateAndSave = (id: string) => {
  const record = store.getRecordById(id)
  if (!record) return

  const tagsString = editingTags.value[id] !== undefined ? editingTags.value[id] : getField(id, 'tags')

  store.updateRecord(id, {
    tags: tagsString,
    type: record.type,
    login: record.login,
    password: record.password
  })

  delete editingTags.value[id]
  validateRecord(id)
}
</script>
