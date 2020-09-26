<template>
    <div>
        <b-button variant="outline-warning" @click="modalShow = !modalShow">
            <b-icon icon="plus-circle"></b-icon> New event
        </b-button>
        <b-modal
        header-bg-variant="dark"
        header-text-variant="secondary"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="info"
        v-model="modalShow"
        size="lg"
        centered
        :title="title"
        >
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'add-event-btn',
  props: ['username'],
  data() {
    return {
      modalShow: false
    }
  }
}
</script>

<style scoped>
.btn {
    margin: 20px 15px;
    float: right;
}
</style>
