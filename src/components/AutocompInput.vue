<!-- eslint-disable @typescript-eslint/no-unsafe-call -->
<script>
export default {
    props: {
        onEnterPress: {
            type: Function,
            default: () => () => null,
        },
        value: {
            type: String,
        },
        autocompleate: {
            type: Boolean,
            default: true,
        },
        autocompleateData: {
            type: Array,
            default: () => [],
        },
        filter: {
            type: Boolean,
            default: false,
        },
    },
    // data() {
    //     return {
    //         inputValue: '',
    //     };
    // },
    methods: {
        handleEnterPress() {
            console.log('handleEnterPress works');
            this.onEnterPress();
        },
        updateValue(value) {
            console.log(value);
            this.$emit('input', value);
        },
    },
};
</script>

<template>
    <div class="autocompleteInput">
        <q-input
            :value="value"
            @input="updateValue($event)"
            square
            dense
            outlined
            color="black"
            bg-color="white"
            @keydown.enter="handleEnterPress"
        />
        <div
            class="autocompListWrapper"
            v-if="autocompleateData.length"
        >
        <q-list
            class="autocompList"
        >
            <q-item
                class="autocompItem"
                v-for="obj in autocompleateData"
                :key="obj.id"
                clickable
                v-ripple
            >
                <q-item-section>
                    {{ obj.word }}
                </q-item-section>
            </q-item>

        </q-list>
        </div>
    </div>
</template>

<style lang="scss">
.autocompleteInput{
    position: relative;
}
.autocompListWrapper{
    background-color: rgb(141, 30, 30);
}
.autocompList {
    position: absolute;
    display: flex;
    flex-direction: column;
    color: black;
    background-color: rgb(255, 255, 255);
    width: 100%;
}
.autocompItem{
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
}
</style>
