<template>
    <div class="output-string" v-show="output">
        <p>{{ output }}</p>
        <span 
            class="copy-btn" 
            @click="onCopyBtnClick">[ {{ copyBtnText }} ]</span>
    </div>
</template>

<script>
export default {
    name: 'ResultFunction',
    data: () => ({
        copyBtnText: "копировать",
    }),
    props: {
        output: {
            type: String,
            default: 'Here will be result',
        }
    },
    methods: {
        onCopyBtnClick() {
            this.$clipboard(this.output);
            this.copyBtnText = "🤙";
            setTimeout( () => {
                this.copyBtnText = "копировать"
            }, 1500 );
        }
    }
}
</script>

<style>
    .output-string {
        text-align: center;
    }

    .copy-btn {
        font-weight: bold;
        cursor: pointer;
    }

    .copy-btn:hover {
        font-weight: 400;
    }
</style>
