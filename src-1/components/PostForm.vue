<template>
    <div>
        <h2>
            Создать пост
        </h2>
        <form @submit.prevent>
            <!--                v-model:value="post.title"-->
            <!--                v-model:myValue="post.title"-->

            <my-input v-focus
                v-model="post.title"
                type="text"
                placeholder="title" />

            <my-input
                v-model="post.body"
                class="input_style"
                type="text" name="Описание" />

            <MyButton @click="createPost">
                Создать
            </MyButton>
        </form>
    </div>
</template>

<script>

import MyInput from "@/components/UI/MyInput.vue";

export default {
    components: {MyInput},

    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: ''
            }
        }
    },
    // watch: {
    //     post: {
    //         handler(newValue) {
    //             console.log(newValue)
    //         },deep: true,
    //     }
    // }
}
</script>

<style scoped>

</style>