export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hiddeDialog() {
            this.$emit('update:show', false)
        }
    },
    mounted() {
        console.log('mixin toggleMixin')
    }
}