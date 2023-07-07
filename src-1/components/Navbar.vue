<script>
  import MyButton from "@/components/UI/MyButton.vue";

  export default {
      name: "Navbar",
      components: {MyButton}
  }
</script>

<template>
  <nav class="nav">
      <div class="logo" @click="$router.push('/')">
          testing app
      </div>
      <my-button @click="$router.push('/posts/')">Посты</my-button>
      <my-button @click="$router.push('/about/')">О сайте</my-button>
      <my-button @click="$router.push('/postsWeb/')">Глобальное хранилище</my-button>
      <my-button @click="$router.push('/compositionApi/')">Composition Api</my-button>
  </nav>
</template>

<style>
  .nav{
      background: #000;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;
  }
  .nav button {
      color: white;
  }
</style>