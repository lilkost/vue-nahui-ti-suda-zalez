<template>
    <div class="posts">
<!--        <h1>{{ $store.state.isAuth ? "Пользователь авторизирован" : "Не авторизирован"}}</h1>-->
<!--        <p>{{ $store.state.likes }}</p>-->
<!--        <p>{{ $store.getters.doubleLikes }}</p>-->
<!--        <div>-->
<!--            <my-button @click="$store.commit('incrementLikes')">likes ++</my-button>-->
<!--            <my-button @click="$store.commit('decrementLikes')">likes &#45;&#45;</my-button>-->
<!--        </div>-->
        <h2>CТраница с поставми</h2>
        <my-input :model-value="searchQuery"
                  @update:model-value="setSearchQuery"
                  placeholder="Поиск"
                  v-focus
        />
        <div class="app__btn">
            <my-button @click="showDialog">
                Добваить пост
            </my-button>


            <MySelected
                    :model-value="selectedSort"
                    @update:model-value="setselectedSort"
                    :options="sortOption"
            />
        </div>


        <MyDialog v-model:show="dialogVis">
            <PostForm @create="createPost"/>
        </MyDialog>
<!--            :posts="posts"-->
<!--              :posts="sortedPosts"-->

        <PostList :posts="sortedAndSearchPost" @remove="remove" v-if="!isPostsLoading"/>
        <div v-else>Идет загрузка</div>
        <div v-inter-section="loadMorePosts" class="observer"></div>
        <!--      <div class="page-wrapper">
                  <div class="page"
                       v-for="pageNumber in totalPage"
                       :key="pageNumber"
                       :class="{
                           'current-page': page === pageNumber
                       }"
                      @click="changePage(pageNumber)"
                  >{{ pageNumber }}</div>
              </div>-->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue"
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelected from "@/components/UI/MySelected.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";

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

        }
    },
    methods: {
        ...mapMutations({
            setPage:'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setselectedSort:'post/setselectedSort'
        }),
        ...mapActions({
            loadMorePosts:'post/loadMorePosts',
            fetchPost: 'post/fetchPost',
        }),
        createPost (post) {
            this.posts.push(post);
            this.dialogVis = false
        },
        remove(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog() {
            this.dialogVis = true
        },
        // changePage(pageNumber){
        //   this.page = pageNumber
        //     // this.fetchPost()
        // },
        // async fetchPost() {
        //     try {
        //         this.isPostsLoading = true
        //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        //             params: {
        //                 _page: this.page,
        //                 _limit: this.limit,
        //             }
        //         });
        //         this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        //         this.posts = response.data
        //         this.isPostsLoading = false;
        //     } catch (e) {
        //         alert('error')
        //     }
        //     // finally {
        //     //      this.isPostsLoading = false;
        //     // }
        // },
        // async loadMorePosts() {
        //     try {
        //         this.page +=1;
        //         // this.isPostsLoading = true
        //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        //             params: {
        //                 _page: this.page,
        //                 _limit: this.limit,
        //             }
        //         });
        //         this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        //         this.posts = [...this.posts, ...response.data]
        //         this.isPostsLoading = false;
        //     } catch (e) {
        //         alert('error')
        //     }
        //     // finally {
        //     //      this.isPostsLoading = false;
        //     // }
        // }
    },
    mounted() {
        this.fetchPost();
        // console.log(this.$refs.observer)
        // const options = {
        //     rootMargin: '8px',
        //     threshold: 1.0
        // }
        // const callback =  (entries, observer)=> {
        //     if(entries[0].isIntersecting && this.page < this.totalPage) {
        //         this.loadMorePosts()
        //     }
        // }
        // const observer = new IntersectionObserver(callback, options)
        // observer.observe(this.$refs.observer)
    },
    computed: {
        // sortedPosts() {
        //     return [...this.posts].sort((post1, post2)=> {
        //         return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        //     })
        // },
        // sortedAndSearchPost() {
        //     return this.sortedPosts.filter(post=> post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        // }
        ...mapState({
            posts: state => state.post.posts,
            searchQuery: state =>state.post.searchQuery,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPage: state => state.post.totalPage,
            sortOption:state => state.post.sortOption
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchPost:"post/sortedAndSearchPost"
        })
    },
    watch: {
        // selectedSort(newValue) {
        //     this.posts.sort((post1, post2)=> {
        //       return post1[newValue]?.localeCompare(post2[newValue])
        //     })
        // }
        /*          page() {
                    this.fetchPost()
                  }*/
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