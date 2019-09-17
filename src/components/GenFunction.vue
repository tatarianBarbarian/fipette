<template>
    <article class="generator">
        <div class="color-input">
            <label>Base color:</label>
            <br>
            <input 
                class="color-input__input"
                @input="onBaseColorInput"
            />
        </div>
        <div class="color-input">
            <label>Derivative color:</label>
            <br>
            <input 
                class="color-input__input"
                @input="onDerivColorInput"
                :disabled="!isBaseChosen"
            />
        </div>
        <ResultColor :color="derivColor" />
        <ResultFunction :output="outputFunction" />
    </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ResultColor from './ResultColor';
import ResultFunction from './ResultFunction';

export default {
    name: 'GenFunction',
    data: () => ({
        isBaseChosen: false,
    }),
    components: {
        ResultColor,
        ResultFunction,
    },
    computed: {
        ...mapState({
            derivColor: state => state.genFunction.derivColor,
            baseColor: state => state.genFunction.baseColor.length,
            outputFunction: state => state.genFunction.outputFunction,
        })
    },
    methods: {
        ...mapActions('genFunction', ['chooseBaseColor','generateColorFunction', 'resetGenerator']),
        validateColorString(colorString) {
            const val = colorString.replace(/[ ;]/g, '');
            const hexMask = val.replace(/#[0-9a-fA-F]{6}/, '');
            const shortenHexMask = val.replace(/#[0-9a-fA-F]{3}/, '');
            const rgbaMask = val.replace(/rgba\([\d]{1,3},[\d]{1,3},[\d]{1,3},[0]{0,1}[.]{1}[\d]{1,2}\)/, '');
            const rgbMask = val.replace(/rgb\([\d]{1,3},[\d]{1,3},[\d]{1,3}\)/, '');
            const isInputValid = [hexMask, shortenHexMask, rgbaMask, rgbMask]
                .filter( checker => checker.length === 0 )
                .length === 1
                ? true
                : false;
            
            if ( val.length && isInputValid ) {
                return true;
            }

            return false;
        },
        onDerivColorInput({ target }) {
            if ( this.validateColorString(target.value) ) {
                this.generateColorFunction({ derivedColor: target.value });
            }
            if ( !target.value.length ) {
                this.resetGenerator();
            }
        },
        onBaseColorInput({ target }) {
            if ( this.validateColorString(target.value) ) {
                this.chooseBaseColor({ baseColor: target.value });
                this.isBaseChosen = true;
            }
            if ( !target.value.length ) {
                this.isBaseChosen = false;
            }
        },
    }
}
</script>

<style>
    .generator {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .color-input {
        width: 250px;
        margin-bottom: 12px;
        margin-top: 12px;
    }

    .color-input__input {
        display: block;
        width: 100%;
        padding: 6px;
        border-radius: 3px;
        border: 1px solid lightgray;
        box-sizing: border-box;
    }

</style>
