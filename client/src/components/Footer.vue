<template>
    <div>
        <b-container fluid class="footer bg-dark border-top border-warning"><br>
            <b-row>
                <b-col class="text-warning">Pubcrawl</b-col>
            </b-row><br>
            <b-row cols="2">
                <b-col sm="6" class="text-warning"><b>Contact us</b><br><br>
                    <p>christian@pubcrawl.se</p>
                    <p>hjalmar@pubcrawl.se</p>
                    <p>hugo@pubcrawl.se</p>
                </b-col>
                <b-col class="text-muted"><b>Placeholder</b></b-col>
            </b-row>
            <b-row class="border-top border-secondary">
                <b-col class="text-muted">Pubcrawl legal info</b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style scoped>
.footer {
    margin-top: 25px;
    position: relative;
}
</style>
