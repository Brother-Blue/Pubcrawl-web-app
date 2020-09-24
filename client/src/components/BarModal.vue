<template>
    <b-modal
    ref="bar-modal"
    size="lg"
    :title="barName"
    >
      <div>
        <p>To be finished :)</p>
      </div>
    </b-modal>
</template>

<script>
export default {
  name: 'bar-modal',
  props: ['ref', 'bar-name']
}
</script>

<style scoped>

</style>
