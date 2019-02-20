<template>
<div class="form-view">
  <my-form />
</div>
</template>

<script>
import MyForm from '../components/Form'
export default {
  name: 'FormView',
  components: {
    MyForm
  }
}
</script>

<style scoped lang="scss">
.form-view {
  width: 500px;
  margin: 0 auto;
}
@media screen and (max-width: 500px) {
  .form-view {
    width: 300px;
    margin: 0 auto;
  }
}
</style>
