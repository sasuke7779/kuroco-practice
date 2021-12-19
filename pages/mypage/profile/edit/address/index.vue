<template>
    <div>
        <h1>mypage > profile > edit/address</h1>
        <p>ログイン状態でないと表示できない</p>
        <form @submit.prevent="update">
            <p
                v-if="updateStatus !== null"
                :style="{ color: resultMessageColor }"
            >{{ resultMessage }}</p>
            <span>メールアドレス</span>
            <input v-model="profile.email" name="email" type="email" />
            <button type="submit">メールアドレス変更</button>
        </form>
    </div>
</template>

<script>
    export default {
        async asyncData({ $axios }) {
            try {
                const memberdetails = await $axios.$get(
                    process.env.BASE_URL + '/rcms-api/3/member/details'
                );
                const profile = memberdetails.details
                return { profile };
            } catch (e) {
                console.log(e.message);
            }
        },
        data() {
            return {
                updateStatus: null,
                resultMessage: null,
            };
        },
        middleware: 'auth',
        computed: {
            resultMessageColor() {
                switch (this.updateStatus) {
                    case 'success':
                        return 'green';
                    case 'failure':
                        return 'red';
                    default:
                        return '';
                }
            },
        },
        methods: {
            async update() {
                try {
                    const payload = {
                        email: this.profile.email,
                        name1: this.profile.name1,
                        name2: this.profile.name2,
                    };

                    await this.$store.dispatch('update', payload);

                    this.updateStatus = 'success';
                    this.resultMessage = 'メールアドレスを変更しました。';
                } catch (e) {
                    this.updateStatus = 'failure';
                    this.resultMessage = 'メールアドレスを変更できませんでした。';
                }
            },
        },
        mounted() {},
    };
</script>
