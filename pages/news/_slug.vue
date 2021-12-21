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
    import LinkList from "@/components/LinkList";
    export default {
        middleware: 'auth',
        components: {
            LinkList
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
        methods: {
            ...mapActions(['logout']),
        }
    };
</script>
