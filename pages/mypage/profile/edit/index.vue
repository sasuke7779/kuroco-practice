<template>
    <div>
        <LinkList></LinkList>
        <h1>mypage > profile > edit/address</h1>
        <p>ログイン状態でないと表示できない</p>
        <form @submit.prevent="update">
            <p
                v-if="updateStatus !== null"
                :style="{ color: resultMessageColor }"
            >{{ resultMessage }}</p>
            <div>
                <span>name1</span>
                <input v-model="profile.name1" name="name1" type="name1" />
            </div>
            <div>
                <span>name2</span>
                <input v-model="profile.name2" name="name2" type="name2" />
            </div>
            <button type="submit">プロフィール更新</button>
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
                        name1: this.profile.name1,
                        name2: this.profile.name2,
                    };

                    await this.$store.dispatch('update', payload);

                    this.updateStatus = 'success';
                    this.resultMessage = 'プロフィールを更新しました。';
                } catch (e) {
                    this.updateStatus = 'failure';
                    this.resultMessage = 'プロフィールを更新できませんでした。';
                }
            },
        },
        mounted() {},
    };
</script>
