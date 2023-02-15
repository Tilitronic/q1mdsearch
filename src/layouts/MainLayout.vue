<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <AutocompInput
          class="searchInput"
          :onEnterPress="onEnterPress"
          v-model="searchValue"
          :autocompleateData="words"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="this.$route.name === '/about'"
      show-if-above
      :value="left"
      side="left"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import AutocompInput from 'src/components/AutocompInput.vue';

export default {
    components: {
        AutocompInput,
    },
    data() {
        return {
            left: false,
            searchValue: '',
            words: [
                {
                    word: 'word',
                    id: '4564',
                },
                {
                    word: 'worii',
                    id: '4578964',
                },
                {
                    word: 'woryyd',
                    id: '45464',
                },
                {
                    word: 'worhhd',
                    id: '45664',
                },
            ],
        };
    },
    methods: {
        onEnterPress() {
            console.log('enter been pressed');
        },
    },
};
</script>

<style scoped>
.searchInput {
  width: 200px;
}
</style>
