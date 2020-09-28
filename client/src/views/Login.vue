<template>
    <div class="main bg-dark">
        <pubcrawl-header/>
        <pubcrawl-login-form/>
        <pubcrawl-footer/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoginForm from '@/components/LoginForm'

export default {
  name: 'login',
  components: {
    'pubcrawl-header': Header,
    'pubcrawl-footer': Footer,
    'pubcrawl-login-form': LoginForm
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
