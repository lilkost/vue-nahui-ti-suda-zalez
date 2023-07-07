import {computed, ref} from "vue";
export default function useSortedAndSearch(sortedPosts) {
    const searchQuery = ref('')

    const sortedAndSearchPost = computed(()=>{
        return sortedPosts.value.filter(post=> post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchQuery,sortedAndSearchPost
    }
}