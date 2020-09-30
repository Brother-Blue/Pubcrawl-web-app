<template>
  <div class="main bg-dark">
    <pubcrawl-header/>
    <pubcrawl-register-form/>
    <pubcrawl-footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RegisterForm from '@/components/RegisterForm'

export default {
  name: 'register',
  components: {
    'pubcrawl-header': Header,
    'pubcrawl-footer': Footer,
    'pubcrawl-register-form': RegisterForm
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
