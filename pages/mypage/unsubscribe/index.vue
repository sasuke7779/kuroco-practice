<template>
    <div>
        <h1>mypage > unsubscribe</h1>
        <p>ログイン状態でないと表示できない</p>
        <p v-if="updateStatus !== null" :style="{ color: resultMessageColor }">{{ resultMessage }}</p>
        <form @submit.prevent="deactivateAccout">
            <button type="submit">退会する</button>
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
                const profile = memberdetails.details;
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
            async deactivateAccout() {
                try {
                    const payload = {
                        email: this.profile.email,
                        name1: this.profile.name1,
                        name2: this.profile.name2,
                        login_ok_flg: 0,
                    };

                    await this.$store.dispatch('deactivateAccout', payload);

                    this.updateStatus = 'success';
                    this.resultMessage = '退会しました。';
                    await this.$store.dispatch('logout', payload);
                } catch (e) {
                    this.updateStatus = 'failure';
                    this.resultMessage = '退会できませんでした。';
                }
            },
        },
        mounted() {},
    };
</script>
