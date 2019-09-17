<template>
    <article class="generator">
        <div class="from-palette">
            <span>Базовый цвет{{ baseColor }}</span>
            <br>
            <form class="from-palette__select-wrapper">
                <select 
                    class="from-palette__select" 
                    @change="onBaseColorChose"
                >
                    <option value="" disabled selected>---Black to white---</option>
                    <option value="@black">black</option>
                    <option value="@light-black">light-black</option>
                    <option value="@dark-gray">dark-gray</option>
                    <option value="@extra-gray">extra-gray</option>
                    <option value="@gray">gray</option>
                    <option value="@divider-gray">divider-gray</option>
                    <option value="@button-gray">button-gray</option>
                    <option value="@background-gray">background-gray</option>
                    <option value="@white">white</option>
                    <option value="" disabled>---Main colors---</option>
                    <option value="@brand-blue">brand-blue</option>
                    <option value="@link-blue">link-blue</option>
                    <option value="@profit-green">profit-green</option>
                    <option value="@error-red">error-red</option>
                    <option value="@brand-yellow">brand-yellow</option>
                    <option value="@link-purple">link-purple</option>
                    <option value="@discount-magenta">discount-magenta</option>
                    <option value="" disabled>---Promo colors---</option>
                    <option value="@pistachio">pistachio</option>
                    <option value="@light-orange">light-orange</option>
                    <option value="@vivid-orange">vivid-orange</option>
                    <option value="@brown">brown</option>
                    <option value="@dark-magenta">dark-magenta</option>
                    <option value="@vivid-magenta">vivid-magenta</option>
                    <option value="@vivid-purple">vivid-purple</option>
                    <option value="@dark-red">dark-red</option>
                    <option value="@dark-green">dark-green</option>
                    <option value="@dark-blue">dark-blue</option>
                    <option value="@seawave">seawave</option>
                </select>
            </form>
        </div>
        <div class="derivative-color">
            <label for="">Производный цвет</label>
            <br>
            <input 
                class="derivative-color__input"
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
            baseColor: state => state.genFunction.baseColor.length ? `: ${state.genFunction.baseColor}` : '',
            outputFunction: state => state.genFunction.outputFunction,
        })
    },
    methods: {
        ...mapActions('genFunction', ['chooseBaseColor','generateColorFunction', 'resetGenerator']),
        onDerivColorInput({ target }) {
            const val = target.value.replace(/[ ;]/g, '');
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
                this.generateColorFunction({ derivedColor: val });
            }
            else if ( !val.length ) {
                this.resetGenerator();
            }
        },
        onBaseColorChose({ target }) {
            this.chooseBaseColor({ baseColor: target.value });
            this.isBaseChosen = true;
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

    .derivative-color {
        width: 250px;
        margin-bottom: 12px;
        margin-top: 12px;
    }

    .derivative-color__input {
        display: block;
        width: 100%;
        padding: 6px;
        border-radius: 3px;
        border: 1px solid lightgray;
        box-sizing: border-box;
    }

    .from-palette__select-wrapper {
        width: 250px;
    }

    .from-palette__select-wrapper:not(:last-child) {
        margin-bottom: 6px;
    }

    .from-palette__select {
        width: 100%;
        display: block;
    }

</style>
