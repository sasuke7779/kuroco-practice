<template>
    <div>
        <LinkList></LinkList>
        <h1>mypage > profile > edit/password</h1>
        <p>ログイン状態でないと表示できない</p>
        <form @submit.prevent="resetpassword">
            <p
                v-if="updateStatus !== null"
                :style="{ color: resultMessageColor }"
            >{{ resultMessage }}</p>
            <div>
                <span>現在のパスワード</span>
                <input v-model="currentpassword" name="currentpassword" type="currentpassword" />
            </div>
            <div>
                <span>新しいパスワード</span>
                <input v-model="newpassword" name="newpassword" type="newpassword" />
            </div>
            <button type="submit">パスワードを変更</button>
        </form>
    </div>
</template>

<script>
    import LinkList from '@/components/LinkList';
    export default {
        middleware: 'auth',
        components: {
            LinkList,
        },
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
                currentpassword: '',
                newpassword: '',
            };
        },
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
            async resetpassword() {
                try {
                    const payload = {
                        login_id: this.profile['email'],
                        current_password: this.currentpassword,
                        new_password: this.newpassword,
                    };

                    await this.$store.dispatch('resetpassword', payload);

                    this.updateStatus = 'success';
                    this.resultMessage = 'パスワードを変更しました。';
                } catch (e) {
                    this.updateStatus = 'failure';
                    this.resultMessage = 'パスワードを変更できませんでした。';
                }
            },
        },
        mounted() {},
    };
</script>
