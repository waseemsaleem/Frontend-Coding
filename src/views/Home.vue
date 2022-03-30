<template>
  <div class="justify-center w-96 mt-10">
    <h1 class="text-2xl text-blue-600 font-bold mb-3">Generate</h1>
    <div class="flex">
      <div class="relative rounded w-full border border-gray-400 basis-1/2">
        <select
          class="block rounded p-2 w-full appearance-none focus:outline-none"
          v-model="type"
        >
          <option selected>Select Type</option>
          <option
            v-for="(option, index) in options"
            :value="option.type"
            :key="index"
          >
            {{ option.type }}
          </option>
        </select>
        <div
          class="flex items-center pointer-events-none absolute inset-y-0 right-0 px-2 text-gray-700"
        >
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <input
        class="w-full rounded border ml-2 border-gray-400 p-2 focus:outline-none"
        v-model="imageUrl"
        type="text"
        placeholder="Paste url here"
      />
    </div>
    <div v-if="type === 'batslap' || type === 'afusion'" class="mt-2">
      <input
        class="w-full rounded border border-gray-400 p-2 focus:outline-none"
        v-model="avatarUrl"
        type="text"
        placeholder="Paste avatar url for batslap &amp; afusion api"
      />
    </div>

    <button
      class="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white mt-2 w-full"
      @click="getData"
    >
      Genetate
    </button>
    <div class="response mt-5">
      <img :src="apiData.src" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createToaster } from '@meforma/vue-toaster'
import optionsList from './options.json'
import { AMETHYSTE_API_TOKEN, BASE_URL } from '../constants'
const toaster = createToaster({
  /* options */
})

const type = ref('Select Type')
const options = ref(optionsList)
const avatarUrl = ref(null)
const imageUrl = ref(null)
const apiData = ref({})

const baseUrl = BASE_URL
const token = AMETHYSTE_API_TOKEN
const getData = () => {
  let body = {}
  if (type.value === 'batslap' || type.value === 'afusion') {
    body = {
      url: imageUrl.value,
      avatar: avatarUrl.value,
    }
  } else {
    body = {
      url: imageUrl.value,
    }
  }
  fetch(`${baseUrl}/${type.value}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 404 || response.status === 400) {
        toaster.error(`error`)
      } else {
        toaster.success(`Success`)
      }
      return response.blob()
    })
    .then((blob) => {
      apiData.value = { src: URL.createObjectURL(blob) }
    })
}
</script>
