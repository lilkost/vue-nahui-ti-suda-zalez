<script>

  export default {

      props: {
          post: {
              type: Object,
              required: true,
          }
      }
  }
</script>

<template>
    <div class="post" >
        <div>
            <span>{{ post.id }}</span>
            <h2>
                Название:  <i>{{post.title}}</i>
            </h2>
            <p>
                Описание: <i>{{post.body}}</i>
            </p>

        </div>
        <MyButton @click="$router.push(`/posts/${post.id}`)">
            Перейти
        </MyButton>
        <MyButton @click="$emit('remove', post)">
            Удалить
        </MyButton>
    </div>
</template>

<style scoped>

</style>