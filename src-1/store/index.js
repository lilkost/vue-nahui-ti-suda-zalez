import {createStore} from "vuex";
import {postModule} from "@/store/postModule";

export default createStore ({
    // // состояние
    // state: {
    //     likes: 1,
    //     isAuth: false
    // },
    // // compueted свойства
    // getters:{
    //     doubleLikes(state) {
    //         return state.likes *2;
    //     }
    // },
    // // функции для изменения состояния
    // mutations: {
    //     incrementLikes(state) {
    //         state.likes +=1
    //     },
    //     decrementLikes(state) {
    //         state.likes -=1
    //     }
    // },
    // // функции которые в нутри себя используют мутации
    // actions:{
    //
    // },
    // // изолированый кусок кода с своими свойствами
    // modules:{
    //
    // }
    modules:{
        post: postModule
    }
})