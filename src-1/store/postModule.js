import axios from 'axios';
export const postModule = {

    state: ()=> ({
        posts: [],
        searchQuery:'',
        isPostsLoading: false,
        selectedSort: '',
        page: 1,
        limit: 10,
        totalPage: 0,
        sortOption:[
            {value: 'title', name: 'По нозванию'},
            {value: 'body', name: 'По описани.'}
        ],

    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2)=> {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchPost(state,getters) {
            return getters.sortedPosts.filter(post=> post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setselectedSort(state,selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, query) {
            state.searchQuery = query
        },

        settotalPage(state, totalPage) {
            state.totalPage = totalPage
        },


    },
    actions: {
        async fetchPost({state,commit,}) {
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('settotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts',  response.data)

                this.isPostsLoading = false;
            } catch (e) {
                console.log(e)
            }
            finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state,commit}) {
            try {
                commit('setPage', state.page+=1)

                // this.isPostsLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('settotalPage', Math.ceil(response.headers['x-total-count'] / this.limit));
                commit('setPosts', [...state.posts, ...response.data]);
                // this.isPostsLoading = false;
                // commit('setLoading', false)
            } catch (e) {
                console.log(e)
            }
            // finally {
            //      this.isPostsLoading = false;
            // }
        }
    },
    namespaced: true,
}