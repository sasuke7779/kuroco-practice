<template>
    <div>
        <div v-for="n in response.list" :key="n.slug">
            <nuxt-link :to="'/'+ n.topics_id">{{n.ymd}} {{n.subject}}</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        async asyncData({ $axios }) {
            try {
                const response = await $axios.$get(
                    process.env.BASE_URL + '/rcms-api/1/news'
                );
                console.log(response);
                console.log(response.pageInfo.pageNo);
                return { response };
            } catch (e) {
                console.log(e.message);
            }
        },
    };
</script>
