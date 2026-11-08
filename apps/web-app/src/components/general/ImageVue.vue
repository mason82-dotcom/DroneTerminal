<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    url: string
    alt?: string
    size: {pixel: number} | {em: number} | {percent: number}
}>()

const style = computed(()=>{
    const ret: any = {
        backgroundImage: `url(${props.url})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }
    if('pixel' in props.size){
        ret.width = props.size.pixel + 'px',
        ret.height = props.size.pixel + 'px'
    } else if('em' in props.size){
        ret.width = props.size.em + 'em',
        ret.height = props.size.em + 'em'
    } else if('percent' in props.size){
        ret.width = props.size.percent + '%',
        ret.height = props.size.percent + '%'
    }

    return ret
})
</script>

<template>

    <div :style="style">
    </div>

</template>

<style lang="scss" scoped>

    div{
        display: flex;
        justify-content: center;
        align-items: center;

        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
</style>
