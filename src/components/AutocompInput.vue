<!-- eslint-disable @typescript-eslint/restrict-plus-operands -->
<!-- eslint-disable no-useless-return -->
<script>
export default {
    props: {
        onEnterPress: {
            type: Function,
            default: () => () => null,
        },
        onChange: {
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
        placeholder: {
            type: String,
            default: '',
        },
    },
    created() {
        document.addEventListener('focusin', this.focusChanged);
        this.dataToShow = this.autocompleateData;
    },
    beforeDestroy() {
        document.removeEventListener('focusin', this.focusChanged);
    },
    data() {
        return {
            showDropdown: false,
            selectedItem: -1,
        };
    },
    methods: {
        setSelectedItem(value) {
            this.$set(this, 'selectedItem', value);
        },
        setShowDropdown(value) {
            this.$set(this, 'showDropdown', value);
        },
        focusChanged(event) {
            const activeElementId = event.target.id;
            const inputElementId = this.$refs.inputEl.$refs.input.id;

            if (activeElementId === inputElementId) {
                this.setShowDropdown(true);
            } else if (this.dataToShow.find((obj, index) => this.$refs[obj.word + index][0].$el === event.target)) {
                return;
            } else {
                this.setShowDropdown(false);
            }
        },
        handleKeyPress(event) {
            if (event.key === 'Enter') {
                this.onEnterPress();
                this.setSelectedItem(-1);
            } else if (event.key === 'ArrowUp' && this.selectedItem - 1 > 0) {
                event.preventDefault();
                this.setSelectedItem(this.selectedItem - 1);
            } else if (event.key === 'ArrowUp' && this.selectedItem - 1 < 0) {
                event.preventDefault();
                this.setSelectedItem(this.dataToShow.length - 1);
            } else if (event.key === 'ArrowDown' && this.selectedItem + 1 < this.dataToShow.length) {
                this.setSelectedItem(this.selectedSug + 1);
            } else if (event.key === 'ArrowDown' && this.selectedItem + 1 === this.dataToShow.length) {
                this.setSelectedItem(0);
            }
            console.log(event);
            console.log(this.selectedItem);
        },
        updateValue(value) {
            this.$emit('input', value);
            this.onChange(value);
            if (value.length < 3) {
                this.setSelectedItem(-1);
            }
        },
        onItemClick(word) {
            this.updateValue(word);
        },
    },
    computed: {
        dataToShow: {
            get() {
                let filteredData = this.autocompleateData;
                if (this.filter) {
                    filteredData = this.autocompleateData.filter((obj) => this.value === obj.word.slice(0, this.value.length));
                }
                return filteredData;
            },
            set() { null; },
        },
    },
};
</script>

<template>
    <div class="autocompleteInput">
        <q-input
            ref="inputEl"
            :value="value"
            @input="updateValue($event)"
            :placeholder="placeholder"
            square
            dense
            outlined
            color="black"
            bg-color="white"
            @keydown="handleKeyPress"
        />
        <div
            class="autocompListWrapper z-top"
            v-show="autocompleateData.length && showDropdown"
        >
        <q-card square class="listCard z-top">

                <q-list
                    class="autocompList"
                >
                    <q-item
                        class="autocompItem"
                        v-for="(obj, index) in dataToShow"
                        :ref="obj.word+index"
                        :key="index"
                        dense
                        clickable
                        v-ripple
                        @click="onItemClick(obj.word)"
                    >
                            {{ obj.word }}
                    </q-item>

                </q-list>

        </q-card>
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
.listCard{
    position: absolute;
    width: 100%;
}
.autocompList {
    width: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    background-color: rgb(255, 255, 255);
}
.autocompItem{
    padding: 0;
    height: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
}
</style>
