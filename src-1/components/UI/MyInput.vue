<script>
  export default {
      name: 'MyInput',
      props: {
          modelValue:[String,Number]
          // value: [String,Number],
          // myValue: [String]
      },
      methods: {
          updateInput(event) {
              this.$emit('update:modelValue', event.target.value);
              // this.$emit('update:value', event.target.value);
              // this.$emit('update:myValue', event.target.value)
          }

      }
  }
</script>

<template>
    <input
            :value="modelValue"
            @input="updateInput"
            class="input_style"
            type="text"
    >
</template>

<style>
.input_style{
    max-width: 100%;
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 20px;
}
</style>