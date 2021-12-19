<template>
    <div>
        <h1>mypage</h1>
        <p>ログイン状態でないと表示できない</p>
        <ul>
            <li>
                <nuxt-link to="/mypage/profile">プロフィール</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mypage/profile/edit">プロフィール変更</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mypage/profile/edit/address">メールアドレス変更</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mypage/profile/edit/password">パスワード変更</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mypage/unsubscribe">退会</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        async asyncData({ $axios }) {
            try {
                const memberdetails = await $axios.$get(
                    process.env.BASE_URL + '/rcms-api/3/member/details'
                );
                const profile = memberdetails.details;
                return { profile };
            } catch (e) {
                console.log(e.message);
            }
        },
        middleware: 'auth',
        methods: {},
    };
</script>
