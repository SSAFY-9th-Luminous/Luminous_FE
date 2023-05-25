<template>
  <div>
    <button class="scroll-to-top" @click="scrollToTop" v-if="showScrollButton">
      👆
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showScrollButton: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > 300) {
        this.showScrollButton = true;
      } else {
        this.showScrollButton = false;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  height:50px;
  width:50px;
  border-radius: 50%;
  background-color: #0d376ea9;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
}

.scroll-to-top:hover {
  background-color: #0a2850a9;
}
</style>