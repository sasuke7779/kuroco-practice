<template>
    <div>
        <h1>mypage > profile > edit/address</h1>
        <p>ログイン状態でないと表示できない</p>
        <ul>
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
