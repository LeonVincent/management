<template>
  <div class="carousel-table">
    <carousel :router="router" :items="items" />
    <one-tables />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import OneTables from '@/components/Tables'
export default {
  name: 'CarouselTable',
  data () {
    return {
      router: [],
      items: [1, 2, 3, 4, 5, 6]
    }
  },
  components: {
    Carousel,
    OneTables
  }
}
</script>

<style lang="scss">
</style>
