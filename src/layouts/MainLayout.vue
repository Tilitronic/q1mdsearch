<!-- eslint-disable @typescript-eslint/no-floating-promises -->
<!-- eslint-disable no-undef -->
<!-- eslint-disable brace-style -->
<!-- eslint-disable @typescript-eslint/no-unsafe-member-access -->
<!-- eslint-disable @typescript-eslint/no-unsafe-member-access -->
<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <AutocompInput
          class="searchInput"
          :placeholder="'search'"
          :onEnterPress="onEnterPress"
          v-model="searchValue"
          :autocompleateData="suggestions"
          :onChange="getSuggestions"
        />
        <AutocompInput
          class="filterInput"
          :placeholder="'filter'"
          :onEnterPress="onEnterPress"
          v-model="filterValue"
          :autocompleateData="words"
          :filter="true"
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
import { getDatamuseSug } from 'src/services/suggestionsApi';

export default {
    components: {
        AutocompInput,
    },
    data() {
        return {
            left: false,
            searchValue: '',
            filterValue: '',
            suggestions: [],
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
                    word: 'rrr',
                    id: '45664',
                },
            ],
        };
    },
    methods: {
        onEnterPress() {
            console.log('enter been pressed');
        },
        getSuggestions(word) {
            if (this.searchValue.length > 2) {
                console.log('I suggest you to lick my horse, it tastes like a raisins!');
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                getDatamuseSug(word).then((data) => this.$set(this, 'suggestions', data));
            } else if (this.searchValue.length < 2) {
                this.$set(this, 'suggestions', []);
            }
        },
    },
};
</script>

<style scoped>
.searchInput {
  width: 200px;
}
</style>
