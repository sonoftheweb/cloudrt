import Database from '@tauri-apps/plugin-sql'
import { defineStore } from 'pinia'

export const useDbStore = defineStore('db', () => {
  const database = ref<Database | null>(null)

  async function loadDatabase() {
    if (!database.value) {
      const db: Database = await Database.load('sqlite:cloudrt.db')
      database.value = db
    }
  }

  return {
    database,
    loadDatabase,
  }
})
