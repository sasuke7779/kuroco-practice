<template>
    <div>
        <nuxt-link to="/news">news</nuxt-link>
        <nuxt-link to="/form">form</nuxt-link>
        <nuxt-link to="/login">login</nuxt-link>
        <nuxt-link to="/mypage">mypage</nuxt-link>
        <nuxt-link to="/login/signup">/login/signup</nuxt-link>
        <button type="button" @click="logout">ログアウト</button>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions(['logout']),
        },
    };
</script>
