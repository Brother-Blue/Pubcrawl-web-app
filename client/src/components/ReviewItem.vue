<template>
    <b-list-group-item
    :id="index"
    class="bg-secondary text-light my-1"
    >
        <b-avatar variant="primary"></b-avatar><span> Name</span><b-badge class="float-right" pill variant="primary">0</b-badge>
        <p>{{bar.reviews}}</p>
    </b-list-group-item>
</template>

<script>
export default {
  name: 'review-item',
  props: [
    'index',
    'review'
  ]
}
</script>

<style scoped>

</style>
