import { getFunction } from '../../api/funcGenerator';

const state = {
    baseColor: '',
    derivColor: 'white',
    outputFunction: '',
};

const getters = {

}

const actions = {
    chooseBaseColor({ commit }, { baseColor }){
        commit('setBaseColor', { baseColor });
    },
    generateColorFunction({ commit, state }, { derivedColor }) {
        commit('setDerivedColor', { color: derivedColor });
        commit('setOutputFunction', { func: getFunction(state.baseColor, derivedColor) });
    },
    resetGenerator({ commit }) {
        commit('setBaseColor', { baseColor: '' });
        commit('setDerivedColor', { color: 'white' });
        commit('setOutputFunction', { func: '' });
    }
}

const mutations = {
    setBaseColor(state, { baseColor }) {
        state.baseColor = baseColor;
    },
    setDerivedColor(state, { color }) {
        state.derivColor = color;
    },
    setOutputFunction(state, { func }) {
        state.outputFunction = func;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
