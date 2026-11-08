
<script setup lang="ts">

import backgroundSvg from "@/assets/background.svg";
import backgroundAnimatedSvg from "@/assets/background_animated.svg";

const props = defineProps<{
    animated?: boolean
}>()

</script>


<template>
  <div>
    <img id="image" :src="props.animated === true ? backgroundAnimatedSvg : backgroundSvg"/>
  </div>
</template>

<style lang="scss">

#image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>
