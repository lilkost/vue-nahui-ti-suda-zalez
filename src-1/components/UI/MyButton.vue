<script>
  export default {
      name: 'MyButton'
  }
</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style >
  button {
      background: none;
      border: 1px solid #000;
      font-size: 16px;
      padding: 10px 20px;
  }
</style>