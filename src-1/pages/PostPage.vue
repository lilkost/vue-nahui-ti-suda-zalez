<template>
    <div class="posts">
        <h2>CТраница с поставми</h2>
        <my-input v-model="searchQuery"
                  placeholder="Поиск"
                  v-focus
        />
        <div class="app__btn">
            <my-button @click="showDialog">
                Добваить пост
            </my-button>


            <MySelected
                    v-model="selectedSort"
                    :options="sortOption"
            />
        </div>


        <MyDialog v-model:show="dialogVis">
            <PostForm @create="createPost"/>
        </MyDialog>
        <!--    :posts="posts" -->
        <!--      :posts="sortedPosts" -->

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
import axios from 'axios';
import MySelected from "@/components/UI/MySelected.vue";
import MyInput from "@/components/UI/MyInput.vue";
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
            posts: [

            ],
            dialogVis: false,
            // modificatorVModel: '',
            isPostsLoading: false,
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            sortOption:[
                {value: 'title', name: 'По нозванию'},
                {value: 'body', name: 'По описани.'}
            ],
            searchQuery:''
        }
    },
    methods: {
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
        async fetchPost() {
            try {
                this.isPostsLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data
                this.isPostsLoading = false;
            } catch (e) {
                alert('error')
            }
            // finally {
            //      this.isPostsLoading = false;
            // }
        },
        async loadMorePosts() {
            try {
                this.page +=1;
                // this.isPostsLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
                this.isPostsLoading = false;
            } catch (e) {
                alert('error')
            }
            // finally {
            //      this.isPostsLoading = false;
            // }
        }
    },
    mounted() {
        this.fetchPost();
        console.log(this.$refs.observer)
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
        sortedPosts() {
            return [...this.posts].sort((post1, post2)=> {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedAndSearchPost() {
            return this.sortedPosts.filter(post=> post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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