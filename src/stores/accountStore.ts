import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AccountRecord, RecordType, TagObject } from '../types'

const STORAGE_KEY = 'accounting_records'

export const useAccountStore = defineStore('account', () => {
  const records = ref<AccountRecord[]>([])

  const loadFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        records.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to load records from storage:', e)
      }
    }
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.value))
  }

  const parseTags = (tagsString: string): TagObject[] => {
    if (!tagsString.trim()) return []
    return tagsString
      .split(';')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0)
      .map((tag: string) => ({ text: tag }))
  }

  const addRecord = () => {
    const newRecord: AccountRecord = {
      id: Date.now().toString(),
      tags: [],
      type: 'Локальная',
      login: '',
      password: ''
    }
    records.value.push(newRecord)
    saveToStorage()
    return newRecord.id
  }

  const updateRecord = (id: string, data: {
    tags: string
    type: RecordType
    login: string
    password: string | null
  }) => {
    const index = records.value.findIndex((r: AccountRecord) => r.id === id)
    if (index !== -1) {
      records.value[index] = {
        id,
        tags: parseTags(data.tags),
        type: data.type,
        login: data.login,
        password: data.type === 'LDAP' ? null : data.password
      }
      saveToStorage()
    }
  }

  const deleteRecord = (id: string) => {
    const index = records.value.findIndex((r: AccountRecord) => r.id === id)
    if (index !== -1) {
      records.value.splice(index, 1)
      saveToStorage()
    }
  }

  const getRecordById = (id: string) => {
    return records.value.find((r: AccountRecord) => r.id === id)
  }

  return {
    records,
    loadFromStorage,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecordById
  }
})
