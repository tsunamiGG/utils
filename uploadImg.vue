<template>
    <div class="contaniner flex-C-C">
        <span @click="reload" v-show="upok"></span>
        <label :for="fileID">
            <img :src="bgUrl" :class="fileID" />
            <img src="../../assets/newUserInfo/icon.png" class="icon" v-if="!upok" />
        </label>
        <input :id="fileID" type="file">
    </div>
</template>

<script>
export default {
    name: "uploadImg",
    props: {
        bgUrl: '',
        fileID: '',
    },
    data() {
        return {
            upok: false,
        }
    },
    mounted() {
        //使用FileReader和Blob对象获取文件
        let that = this;
        let file = document.querySelector(`#${that.fileID}`);
        file.onchange = function () {
            let reader = new FileReader();
            let blob =   new Blob([this.files[0]], {type: "image/jpeg"});
            reader.readAsDataURL(blob);
            reader.onload = function () {
                document.querySelector(`.${that.fileID}`).src = this.result;
                that.upok = true;
            }
        }
    },
    methods:{
        reload: function() {
            this.upok = false;
            document.querySelector(`.${this.fileID}`).src = this.bgUrl;
        }
    }
}

</script>


<style lang="less" scoped>
.flex-C-C {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.contaniner {
    width: 2.88rem;
    height: 1.84rem;
    border: .02rem dashed #898989;    
    border-radius: .26rem;
    background-color: #F2F2F2;
    position: relative;
    .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%,)
    }
    input {
        display: none;
    }
    span {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(15%, -28%);
        color: red;
        background: url("../../assets/newUserInfo/f4.png")  center;
        background-size: contain;
        display: inline-block;
        border-radius: 50%;
        height: .42rem;
        width: .42rem;
    }
    lable {
        background: url("../../assets/newUserInfo/icon.png")  center;
        background-size: .78rem .64rem contain;
    }

}
</style>
