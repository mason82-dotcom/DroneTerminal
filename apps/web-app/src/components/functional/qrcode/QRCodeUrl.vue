<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import QRCode from 'qrcode-generator'
import { drawLogoOntopOfImage, loadImage } from '@/util/canvas';

const props = defineProps<{
    url: string
    withLogo?: boolean
}>()

const dataUrl = ref('')

async function makeImage(){
    const qr = QRCode(0, 'M')
    qr.addData(props.url)
    qr.make()

    const baseImageDataUrl = qr.createDataURL(20)

    if(props.withLogo){

        const logoImage = await loadImage('/images/logo_small.png')
        const baseImage = await loadImage(baseImageDataUrl)

        const canvas = drawLogoOntopOfImage(baseImage, logoImage, 0.2)
        dataUrl.value = canvas.toDataURL()
    } else {
        dataUrl.value = baseImageDataUrl
    }
}

watch(()=>props.url, makeImage)
watch(()=>props.withLogo, makeImage)
onMounted(makeImage)

</script>

<template>

    <div>

        <img :src="dataUrl" alt="QR Code" />

    </div>

</template>

<style scoped lang="scss">

img {
    width: 300px;
}

</style>
