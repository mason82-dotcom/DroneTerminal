<script setup lang="ts" generic="T extends {[key: string]: any}">
import { computed, reactive, ref, UnwrapRef, useSlots, watch } from 'vue';
import IconVue from '../general/IconVue.vue'
import { stringSimilarity } from 'string-similarity-js'
import { updateObject } from '@/util/vue';

const props = defineProps<{
    columnLabels: {[key: string]: string}
    data: T[]

    sortableByColumn?: boolean
    filterableByString?: boolean
    maxHeight?: string //px or 1em or anything
    selectable?: boolean // this only works reliably if data has the property "id"

    templateColumns?: string

    sortById?: 'asc' | 'desc'

    highlightRow?: (row: T)=>boolean
}>()

type SortingType = 'az' | 'za' | 'none'

const selectedSortingType = ref<SortingType>('none')
const selectedSortingColumn = ref('')

const sortedData = computed(() => {

    const copyOfData = filteredData.value.slice()

    if(selectedSortingType.value === 'none'){

        if(typeof props.sortById === 'string'){
            const sorted = copyOfData.sort((a, b)=>{
                if(a.id < b.id){
                    return -1
                }

                if(a.id > b.id){
                    return 1
                }

                return 0
            })

            if(props.sortById === 'asc'){
                return sorted
            } else {
                return sorted.reverse()
            }
        }

        return copyOfData
    }

    const sorted = copyOfData.sort((a, b)=>{
        const aValue = a[selectedSortingColumn.value]
        const bValue = b[selectedSortingColumn.value]

        const aInt = parseInt(aValue)
        const bInt = parseInt(bValue)

        // try to sort by number at beginning of string
        if(!isNaN(aInt) && !isNaN(bInt)){
            if(aInt < bInt){
                return -1
            }

            if(aInt > bInt){
                return 1
            }

            //same, so continue with text comparison (the text after the numbers)
        }

        if(aValue < bValue){
            return -1
        }

        if(aValue > bValue){
            return 1
        }

        return 0
    })

    if(selectedSortingType.value === 'az'){
        return sorted
    } else {
        return sorted.reverse()
    }
})

const filter = ref('')

const filteredData = computed(() => {

    if(filter.value === ''){
        return props.data
    }

    const startTime = performance.now()

    const filtered : {score: number, value: T}[] = []

    for(const d of (props.data || [])){

        let highestScore = 0

        for(const key of Object.keys(d)){
            const value = d[key]

            if(typeof value !== 'string'){
                continue
            }
            if(value.indexOf(filter.value) >= 0){
                const score = 1
                if(score > highestScore){
                    highestScore = score
                }
            }

            if(value.toLowerCase().indexOf(filter.value.toLowerCase()) >= 0){
                const score = 0.999999
                if(score > highestScore){
                    highestScore = score
                }
            }

            if(filter.value.length > 2){
                const similarity = stringSimilarity(value, filter.value)

                if(similarity > highestScore){
                    highestScore = similarity
                }
            }
        }

        if(highestScore >= 0.9){
            filtered.push({
                score: 1,
                value: d
            })
        }
    }

    const endTime = performance.now()

    console.log('SmartTable sorting took', endTime-startTime,  'ms for', props.data.length, 'entries')

    return filtered.map(v => v.value).sort((a, b)=>{
        if(a.score < b.score){
            return -1
        }

        if(a.score > b.score){
            return 1
        }

        return 0
    })
})

//TODO select stuff

function parseSlotName(slotName: string){
    return slotName.match(/[^\(]*\(([^\)]*)\)/)
}


function getRowDataForNamedSlot(row: T, slotName: string){
    const match = parseSlotName(slotName)

    if(match){
        const name = match[1]
        return row[name]
    } else {
        return row
    }
}

function getColumnIndexForNamedSlot(slotName: string){
    const match = parseSlotName(slotName)

    if(!match){
        return ''
    }

    let i = props.selectable ? 2 : 1

    for(const k of Object.keys(props.columnLabels)){
        if(k === match[1]){
            return i
        }

        i++
    }
}

function selectSorting(sortingType: SortingType, sortingColumn: string){
    selectedSortingType.value = sortingType
    selectedSortingColumn.value = sortingColumn
}

function resetSorting(){
    selectedSortingType.value = 'none'
    selectedSortingColumn.value = ''
}

function toggleSorting(sortingType: SortingType, sortingColumn: string){
    if(selectedSortingType.value === sortingType && selectedSortingColumn.value === sortingColumn){
        resetSorting()
    } else {
        selectSorting(sortingType, sortingColumn)
    }
}

const selected = reactive<T[]>([])

const isIdMode = computed(()=>{
    return props.data && props.data[0] && typeof props.data[0]['id'] === 'number'// if id field was found use that to identify rows
})

watch(()=>filteredData.value, ()=>{

    if(isIdMode){
        let wasChanged = false

        selected.forEach((v, i)=>{
            const existingFilteredData = filteredData.value.find(f => f.id === v.id)
            if(!existingFilteredData){
                selected.splice(i, 1)
                wasChanged = true
            } else {
                updateObject(v, existingFilteredData)
            }
        })

        if(wasChanged){
            triggerChange()
        }

    } else {// otherwise reset selection
        selected.splice(0, selected.length)
        triggerChange()
    }
})

function toggleSelected(row: T, checkbox: HTMLInputElement){

    const newState = checkbox.checked
    if(newState){
        //@ts-ignore
        selected.push(row)
        checkbox.checked = true
    } else {

        const existingSelectedRowIndex = isIdMode ? selected.findIndex(r => r.id === row.id) : selected.indexOf(row as any)
        selected.splice(existingSelectedRowIndex, 1)
        checkbox.checked = false
    }

    triggerChange()
}

function triggerChange(){
    emit('change-selected', selected.map(v => v as T))
}

const emit = defineEmits<{
    (e: 'change-selected', v: T[])
}>()

const slots = useSlots()

const style = computed(()=>{

    let columnTemplate : string

    if(typeof props.templateColumns === 'string'){
        columnTemplate = props.templateColumns
    } else {

        let count = slots ? Object.keys(slots).length : Object.keys(props.columnLabels).length//TODO this doesnt work?

        if(props.selectable){
            count++
        }

        columnTemplate = `repeat(${count}, auto)`
    }

    return `grid-template-columns: ${columnTemplate};` + (props.maxHeight ? ` max-height: ${props.maxHeight}; overflow-y: auto; scrollbar-gutter: stable;` : '')
})

</script>

<template>

    <div class="table">

        <div v-if="props.filterableByString" class="filter">
            <IconVue name="search" class="search_icon"></IconVue>
            <input type="text" v-model="filter" :placeholder="$t('inputs.search')">
        </div>

        <div class="grid" :style="style">

            <div class="thead">

                <div v-if="props.selectable" class="cell" style="grid-column: 1;">

                </div>

                <div v-for="(_, slotName) of $slots" :key="slotName" class="cell">
                    {{ props.columnLabels[(parseSlotName('' + slotName) || [])[1]] }}
                    <div v-if="props.sortableByColumn" :class="['sort_icons', {empty_label: props.columnLabels[(parseSlotName('' + slotName) || [])[1]].length === 0}]">
                        <IconVue name=caret-down-fill @click="toggleSorting('az', parseSlotName('' + slotName)[1])" :class="['icon', {selected: selectedSortingType === 'az' && selectedSortingColumn === parseSlotName('' + slotName)[1]}]"></IconVue>
                        <IconVue name=caret-up-fill @click="toggleSorting('za', parseSlotName('' + slotName)[1])" :class="['icon', {selected: selectedSortingType === 'za' && selectedSortingColumn === parseSlotName('' + slotName)[1]}]"></IconVue>
                    </div>
                </div>
            </div>

            <div class="tbody">
                <div v-for="(row, index) of sortedData" :key="index" :class="['row', {highlighted: typeof props.highlightRow === 'function' && props.highlightRow(row)}]">

                    <div v-if="props.selectable" class="cell select" style="grid-column: 1;">
                        <input type="checkbox" @click="(evt)=>{toggleSelected(row, evt.target as HTMLInputElement)}">
                    </div>

                    <div v-for="(_, slotName) of $slots" :key="slotName" class="cell" :style="'grid-column: ' + getColumnIndexForNamedSlot('' + slotName)">
                        <slot :name="slotName" v-bind="{index, column: (parseSlotName('' + slotName) || [])[1], value: getRowDataForNamedSlot(row, '' + slotName), row}"></slot>
                    </div>
                </div>
                <div v-if="sortedData.length === 0" class="cell" style="grid-column: 1/-1;">{{ $t("smart_table.no_data") }}</div>
            </div>

        </div>
    </div>

</template>

<style scoped lang="scss">

.table {

    .filter {
        grid-column: 1/-1;
        display: flex;
        position: relative;
        background-color: var(--neutral-darker);
        margin-bottom: 0.4em;

        input {
            padding-left: 2em;
            width: 25em;
        }

        .search_icon {
            position: absolute;
            left: 0.5em;
            top: 50%;
            transform: translateY(-50%);
            color: var(--neutral-light);
        }
    }

    .grid {
        display: grid;

        .thead {
            display: contents;

            .cell {
                position: sticky;
                top: 0;
                align-self: start;
                background-color: var(--neutral-darker);

            }
        }

        .tbody {
            display: contents;

            .row {
                display: contents;

                &.highlighted .cell {
                    background: var(--neutral-medium);
                }

                .cell {
                    margin: 0.2em 0;
                }
            }
        }

        .cell {
            padding: 0.3em 0.8em;
            background-color: var(--neutral-dark);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: left;


            &:first-child {
                border-top-left-radius: 0.2em;
                border-bottom-left-radius: 0.2em;

            }

            &:last-child {
                border-top-right-radius: 0.2em;
                border-bottom-right-radius: 0.2em;
            }

            .sort_icons {
                display: inline-block;
                color: var(--neutral-medium);
                font-size: 1.3em;
                white-space: nowrap;

                &:not(.empty_label) {
                    margin-left: 0.5em;
                }

                .icon {
                    cursor: pointer;

                    &:hover {
                        color: var(--neutral-light);
                    }

                    &.selected {
                        color: var(--neutral-lighter);

                        &:hover {
                            color: var(--neutral-lighter);
                        }
                    }
                }

            }

            &.select {
            }
        }

    }
}

</style>
