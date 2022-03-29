<template>
  <div class="justify-center w-96 mt-10">
    <h1 class="text-2xl text-blue-600 font-bold mb-3">Generate</h1>
    <div>
      <input
        class="w-full rounded border border-gray-400 p-2 focus:outline-none"
        v-model="imageUrl"
        type="text"
        placeholder="Paste image url here"
      />
      <input
        class="w-full rounded border border-gray-400 p-2 focus:outline-none mt-2"
        v-model="avatarUrl"
        type="text"
        placeholder="Paste avatar url for batslap &amp; afusion api"
      />
    </div>

    <button
      class="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white mt-3 w-full"
      @click="getData"
    >
      Genetate
    </button>
    <div class="response my-5 grid grid-cols-2 grid-flow-row-dense gap-4">
      <img v-for="img in apiData" :src="img.src" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createToaster } from '@meforma/vue-toaster'
import optionsList from './options.json'
const toaster = createToaster({
  /* options */
})

const options = ref(optionsList)
const imageUrl = ref(null)
const avatarUrl = ref(null)
const apiData = ref([])
const baseUrl = `https://v1.api.amethyste.moe/generate`
const token =
  'Bearer 296b1f183da8205d9a21151b0010234953dd5216fd9386ef6fd874001c0bb95b066b8bad97ed2de1fbac1083591e467c9fc8ecab4081746cb5cee2d76cd5b565'

const getData = () => {
  let body = {}

  body = {
    url: imageUrl.value,
    avatar: avatarUrl.value,
  }
  if (Array.isArray(options.value)) {
    options.value.forEach((option) => {
      fetch(`${baseUrl}/${option.type}`, {
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
          apiData.value.push({ src: URL.createObjectURL(blob) })
        })
    })
  }
}
</script>
