<template>
    <div>
        <LinkList></LinkList>
        <h1 class="title">{{ response.details.subject }}</h1>
        <div class="post" v-html="response.details.contents"></div>
        <div>
            <img v-bind:src="response.details.newsimage.url" alt />
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import LinkList from '@/components/LinkList';
    export default {
        middleware: 'auth',
        components: {
            LinkList,
        },
        async asyncData({ $axios, params }) {
            try {
                const response = await $axios.$get(
                    process.env.BASE_URL +
                        '/rcms-api/1/newsdetail/' +
                        `${params.slug}`
                );
                console.log(response);
                return { response };
            } catch (e) {
                console.log(e.message);
            }
        },
        head() {
            return {
                title: this.response.details.subject,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'partial description' + this.response.details.contents,
                    },
                    {
                        hid: 'og:site_name',
                        property: 'og:site_name',
                        content: 'partial og:site_name' + this.response.details.subject,
                    },
                    { hid: 'og:type', property: 'og:type', content: 'website' },
                    { hid: 'og:url', property: 'og:url', content: 'BASE_URL' },
                    {
                        hid: 'og:title',
                        property: 'og:title',
                        content: 'partial og:title' + this.response.details.subject,
                    },
                    {
                        hid: 'og:description',
                        property: 'og:description',
                        content: 'partial og:description' + this.response.details.contents,
                    },
                    {
                        hid: 'og:image',
                        property: 'og:image',
                        content: 'partial og:image',
                    },
                ],
            };
        },
        methods: {
            ...mapActions(['logout']),
        },
    };
</script>
