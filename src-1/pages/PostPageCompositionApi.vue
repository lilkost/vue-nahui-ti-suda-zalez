<template>
    <div class="posts">

        <h2>CТраница с поставми</h2>
        <my-input v-model="searchQuery"
                  placeholder="Поиск"
        />
        <div class="app__btn">


            <MySelected
                    v-model="selectedSort"
                    :options="sortOption"
            />
        </div>


<!--        <MyDialog v-model:show="dialogVis">-->
<!--&lt;!&ndash;            <PostForm @create="createPost"/>&ndash;&gt;-->
<!--        </MyDialog>-->
        <!--    :posts="posts" -->
        <!--      :posts="sortedPosts" -->

        <PostList :posts="sortedAndSearchPost" @remove="remove" v-if="!isPostsLoading"/>
        <div v-else>Идет загрузка</div>
<!--        <div v-inter-section="loadMorePosts" class="observer"></div>-->

    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue"
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from 'axios';
import MySelected from "@/components/UI/MySelected.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {ref} from "vue";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearch from "@/hooks/useSortedAndSearch";
export default  {
    components: {
        MyInput,
        MySelected,
        MyButton,
        MyDialog,
        PostForm,
        PostList
    },
    data() {
        return {


            page: 1,


            sortOption:[
                {value: 'title', name: 'По нозванию'},
                {value: 'body', name: 'По описани.'}
            ],
        }
    },
    setup(props) {
        const {posts, totalPage, isPostsLoading} = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts)
        const {searchQuery, sortedAndSearchPost} = useSortedAndSearch(sortedPosts)
        return {
            posts, totalPage, isPostsLoading,
            sortedPosts, selectedSort,
            searchQuery, sortedAndSearchPost
        }
    }
}
</script>

<style>

.post {
    padding: 20px;
    border: 2px solid #000;
}
.posts .post:not(:last-child) {
    margin-bottom: 15px;
}
.posts{
    padding-inline: 15px;
}
form{
    margin-bottom: 20px;
}
.app__btn{
    display: flex;
    justify-content: space-between;
}
.page-wrapper{
    display: flex;
}
.current-page {
    border: 19px solid greenyellow;
    background: greenyellow;
}
.page{
    border: 1px solid #000000;
    padding: 10px;
    border-radius: 10px;
}
.observer{
    height: 30px;
    background: gray;
}
</style>