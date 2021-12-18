<template>
    <div>
        <h1>mypage > unsubscribe</h1>
        <p>ログイン状態でないと表示できない</p>
        <ul>
            <li>
                <nuxt-link to="/mypage/profile">プロフィール</nuxt-link>
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
        middleware: 'auth',
        methods: {

        },
    };
</script>
