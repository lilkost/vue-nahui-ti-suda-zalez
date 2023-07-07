<script>
  import togglemixin from "@/mixins/togglemixin";

  export default  {
      name: 'MyDialog',
      // props: {
      //     show: {
      //         type: Boolean,
      //         default: false,
      //     }
      // },
      // methods: {
      //     hiddeDialog() {
      //         this.$emit('update:show', false)
      //     }
      // }
      mixins: [togglemixin],
      mounted() {
          console.log('no mixin in component')
      }
  }
</script>

<template>
  <div
          class="dialog"
          v-if="show"
          @click="hiddeDialog"
  >
    <div @click.stop class="dialog__content">
        <slot>

        </slot>
    </div>
  </div>
</template>

<style>
  .dialog{
      position: absolute;
    inset: 0%;

      background: rgba(0, 0 ,0, .5);
      display: flex;
  }
  .dialog__content{
      margin: 0;
      background: #fff;
      padding: 10px;
  }
</style>