<template>
    <div>
        <h1>mypage > profile</h1>
        <p>ログイン状態でないと表示できない</p>
        <nuxt-link to="/mypage">マイページへ</nuxt-link>
        <ul>
            <li v-for="(value, key) in profile" :key="key">
                <span>{{key}} : {{value}}</span>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        async asyncData({ $axios }) {
            try {
                const profile = await $axios.$get(
                    process.env.BASE_URL + '/rcms-api/3/profile'
                );
                return { profile };
            } catch (e) {
                console.log(e.message);
            }
        },
        middleware: 'auth',
        methods: {},
    };
</script>
