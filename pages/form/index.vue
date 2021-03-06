<template>
    <div>
        <h1>FORMページ</h1>

        <form v-if="!submitted" ref="form" enctype="multipart/form-data">
            <!-- <div v-if="error" class="error">
                <p v-for="(err, idx) in error" :key="idx">{{ err }}</p>
            </div>-->

            <div class="row--status">
                <h2>フォーム名</h2>
                <div>{{ name }}</div>
            </div>

            <div class="row--status">
                <h2>説明</h2>
                <div>
                    <p v-for="(line, idx) in textLines2texts(info)" :key="idx">{{ line }}</p>
                </div>
            </div>

            <div class="row--status">
                <h2>サンクス文言</h2>
                <div>
                    <p v-for="(line, idx) in textLines2texts(thanksText)" :key="idx">{{ line }}</p>
                </div>
            </div>

            <div class="row--status">
                <h2>フォーム項目</h2>
                <div class="row--internal">
                    <div v-for="col in cols" :key="col.key">
                        <p>[{{ col.title }}]</p>
                        <pre>{{ col }}</pre>
                    </div>
                </div>
            </div>

            <div v-for="col in cols" :key="col.objKey" class="row--form">
                <h2>[{{ col.title }}]</h2>
                <div v-if="error" class="error">
                    <p v-for="(err, idx) in errorDisplay(col.objKey)" :key="idx">{{ err }}</p>
                </div>
                <span v-if="col.type == 7">
                    <input :name="col.objKey" type="file" />
                </span>
                <span v-if="col.type == 3">
                    <input :name="col.objKey" type="radio" :id="col.objKey" />
                    <label :for="col.objKey">{{col.options.label1}}</label>
                </span>
                <input v-else :name="col.objKey" type="text" />
            </div>

            <div class="row--bottom-next">
                <button @click="handleOnSubmit">submit</button>
            </div>
        </form>

        <form v-else enctype="multipart/form-data">
            <div class="row--status">
                <h2>問い合わせID</h2>
                <div>{{ submittedId }}</div>
            </div>

            <div class="row--status">
                <h2>サンクス文言</h2>
                <div>
                    <p v-for="(line, idx) in textLines2texts(thanksText)" :key="idx">{{ line }}</p>
                </div>
            </div>

            <div class="row--bottom-back">
                <button @click="handleOnBack">back</button>
            </div>
        </form>
    </div>
</template>

<script>
    const FORM_ID = 3; // 作成したフォーム定義のID

    export default {
        async asyncData({ $axios }) {
            const response = await $axios.$get(
                process.env.BASE_URL + `/rcms-api/1/form/${FORM_ID}`
            );
            return {
                name: response.details.inquiry_name,
                info: response.details.inquiry_info,
                thanksText: response.details.thanks_text,
                cols: Object.entries(response.details.cols).map(([k, v]) => ({
                    objKey: k,
                    ...v,
                })),
            };
        },
        head() {
            return {
                script: [
                    {
                        src: 'https://www.google.com/recaptcha/enterprise.js?render=6LfAi7sdAAAAAAeNy_lDWib0V6aPPP6INHrROcI7',
                    },
                ],
            };
        },
        data: () => {
            return {
                submitted: false,
                submittedId: null,
                error: null,
            };
        },
        methods: {
            textLines2texts(textLines = '') {
                return textLines.split('\r\n');
            },
            async handleOnSubmit(e) {
                e.preventDefault();
                const _this = this;

                // reCAOTCHA
                grecaptcha.enterprise.ready(function () {
                    grecaptcha.enterprise
                        .execute('6LfAi7sdAAAAAAeNy_lDWib0V6aPPP6INHrROcI7', {
                            action: 'login',
                        })
                        .then(async function (token) {
                            // collect input elements
                            const formInputElements = Array.from(
                                _this.$refs.form.elements
                            ).filter(
                                (elm) => elm.tagName.toLowerCase() === 'input'
                            );

                            // transform key:value inputs to an object
                            const body = formInputElements
                                .map((elm) => ({ [elm.name]: elm.value }))
                                .reduce((prev, cur) => ({ ...prev, ...cur }), {});
                            try {
                                // post data
                                const { id } = await _this.$axios.$post(
                                    process.env.BASE_URL +
                                        `/rcms-api/1/formsend?id=${FORM_ID}`,
                                    body
                                );
                                _this.error = null;
                                _this.submittedId = id;
                                _this.submitted = true;
                            } catch (e) {
                                console.log(e);
                                _this.error = [`${e}`, ...e.response.data.errors];
                            }
                        });
                });
                // reCAOTCHA
            },
            handleOnBack(e) {
                e.preventDefault();
                this.submitted = false;
            },

            errorDisplay(objKey) {
                const error = this.error;
                let errorArray = [];
                error.map((item) => {
                    if (objKey == item.field) {
                        errorArray.push(item);
                    }
                });
                return errorArray;
            },
        },
    };
</script>

<style scoped>
    input {
        width: 100%;
        border: none;
    }

    .error {
        color: red;
    }
    .error > *:first-child {
        font-weight: bold;
    }

    .row--status {
        display: flex;
        border-top: 1px solid black;
    }
    .row--status > *:first-child {
        background-color: yellow;
        min-width: 15rem;
        max-width: 15rem;
        border-right: 1px solid black;
    }

    .row--form {
        display: flex;
        border-top: 1px solid black;
    }
    .row--form > *:first-child {
        background-color: aquamarine;
        min-width: 15rem;
        max-width: 15rem;
        border-right: 1px solid black;
    }

    .row--bottom-next {
        padding: 8px 16px;
        display: flex;
        justify-content: flex-end;
    }
    .row--bottom-back {
        padding: 8px 16px;
        display: flex;
        justify-content: flex-start;
    }

    .row--internal {
        display: flex;
    }

    form > *:nth-last-child(2) {
        border-bottom: 1px solid black;
    }
</style>