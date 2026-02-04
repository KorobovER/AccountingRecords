<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <header class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Учетные записи</h1>
        <button type="button"
          class="w-10 h-10 flex items-center justify-center border-2 border-gray-300 bg-white rounded-lg hover:bg-gray-50 font-bold text-xl transition-colors"
          aria-label="Добавить новую учетную запись">
          +
        </button>
      </header>

      <form class="bg-white rounded-lg shadow overflow-hidden" role="form">
        <div
          class="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200 font-semibold text-sm text-gray-700"
          role="row">
          <div class="col-span-2" role="columnheader">Метки</div>
          <div class="col-span-2" role="columnheader">Тип записи</div>
          <div class="col-span-2" role="columnheader">Логин</div>
          <div class="col-span-3" role="columnheader">Пароль</div>
          <div class="col-span-1 text-center" role="columnheader">Действия</div>
        </div>

        <div role="rowgroup">
          <div
            class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors"
            role="row">
            <div class="col-span-2" role="gridcell">
              <input type="text" placeholder="Метки" maxlength="50" aria-label="Метки"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <div class="col-span-2" role="gridcell">
              <select aria-label="Тип записи"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                <option value="Локальная">Локальная</option>
                <option value="LDAP">LDAP</option>
              </select>
            </div>
            <div class="col-span-2" role="gridcell">
              <input type="text" placeholder="Логин" maxlength="100" aria-label="Логин"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <div class="col-span-3" role="gridcell">
              <input type="password" placeholder="Пароль" maxlength="100" aria-label="Пароль"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <div class="col-span-1 flex justify-center" role="gridcell">
              <button type="button" aria-label="Удалить запись"
                class="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors">🗑️</button>
            </div>
          </div>

          <div
            class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors"
            role="row">
            <div class="col-span-2" role="gridcell">
              <input type="text" placeholder="Метки" maxlength="50" aria-label="Метки"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <div class="col-span-2" role="gridcell">
              <select aria-label="Тип записи"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                <option value="Локальная">Локальная</option>
                <option value="LDAP">LDAP</option>
              </select>
            </div>
            <div class="col-span-2" role="gridcell">
              <input type="text" placeholder="Логин" maxlength="100" aria-label="Логин"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <div class="col-span-3" role="gridcell">
              <div class="h-10 bg-gray-100 rounded border border-gray-300"></div>
            </div>
            <div class="col-span-1 flex justify-center" role="gridcell">
              <button type="button" aria-label="Удалить запись"
                class="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors">🗑️</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
</script>
