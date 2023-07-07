import MainPage from "@/pages/MainPage.vue"
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage.vue";
import About from "@/pages/About.vue";
import PostIdPage from "@/pages/PostIdPage.vue";
import PostPageWebStore from "@/pages/PostPageWebStore.vue";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi.vue";
const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage,
    },
    {
        path:'/postsWeb',
        component: PostPageWebStore
    },
    {
        path: '/compositionApi',
        component:PostPageCompositionApi
    }
]

const router = createRouter({
    routes,
    history:createWebHistory(process.env.BASE_URL)
});

export default router;