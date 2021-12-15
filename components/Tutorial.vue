<template>
  <div>
    <div class="c-block">
      <div class="c-block__container">

        <canvas class="c-block-canvas" id="imagecanvas" width="500px" height="500px"></canvas>



      </div>
    </div>

    <span
    v-on:click="createimage()"
    >画像生成</span>

    <span
    v-on:click="clearCanvas()"
    >canvas初期化</span>

    <a id="download" href="" download="canvas.jpg"
    v-on:click="downloadimage()"
    >ダウンロード</a>

    <div class="c-block">
      <div class="c-block__container">

        <div>
          <img src="" alt="" id="newImg">
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  let canvas = null;
  export default {
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
      // canvasの初期化と画像の描画
      initCanvas() {
        const _this = this;
        canvas = document.querySelector("#imagecanvas");  //getElementById()等でも可。オブジェクトが取れれば良い。
        const ctx = canvas.getContext("2d");
        let drawWidth = 150;
        let drawHeight = 150;

        const chara = new Image();
        chara.src = "/img/150x150.png";
        chara.onload = () => {
          ctx.drawImage(chara, 20, 20);
        };

        const chara2 = new Image();
        chara2.src = "/img/150x50.png";
        chara2.onload = () => {
          ctx.drawImage(chara2, 140, 90, drawWidth, drawHeight);
        };
      },

      // canvasの初期化
      clearCanvas() {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);
      },

      // 画像生成
      createimage() {
        const png = canvas.toDataURL();
        document.getElementById("newImg").src = png;
      },

      // 画像ダウンロード
      downloadimage() {
        const base64 = canvas.toDataURL('image/jpeg');
        document.getElementById("download").href = base64;
      }

    },
    computed: {
    },
    mounted() {
      const _this = this;
      _this.initCanvas()
    }
  }
</script>
