export default {
    mounted(el,binding) {
        console.log(el,binding);
        const options = {
            rootMargin: '8px',
            threshold: 1.0
        }
        const callback =  (entries, observer)=> {
            // if(entries[0].isIntersecting && this.page < this.totalPage) {
            if(entries[0].isIntersecting){
                binding.value()
            }
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe(el)
    },
    name: 'interSection'
}