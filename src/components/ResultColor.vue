<template>
    <div class="result-color" :style="{ background: color }">
        <span class="result-color__color-string">
            {{ color }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'ResultColor',
    props: {
        color: {
            type: String,
            default: '#f2f4f9',
        }
    },
}
</script>

<style>
    .result-color {
        width: 250px;
        height: 250px;
        border: 1px solid lightgray;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        text-align: center;
    }
</style>
