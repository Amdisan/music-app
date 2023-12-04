<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50 example"
    :class="`song-id-${song.docID}`"
  >
    <div>
      <!-- name 'id' must be same as in router dynamic route (:id) -->
      <RouterLink
        :to="{ name: 'song', params: { id: song.docID } }"
        class="font-bold block text-gray-600 composition-name"
        >{{ song.modifiedName }}
      </RouterLink>
      <span class="text-gray-500 text-sm">{{ song.displayName }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <RouterLink
        custom
        :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.commentCount }}
        </span>
      </RouterLink>
    </div>
  </li>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'SongItem',
  props: ['song'],
  components: { RouterLink }
}
</script>
