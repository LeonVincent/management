<template>
<div class="reply" style="display:none">
    <textarea name="description" rows="8" cols="80" maxlength="700" placeholder="请输入问题描述" v-model="content" style="resize:none;"></textarea>
    <div id="add">
        <!-- <div>
            <i><img src="./../../../assets/img/customer/add.png" style="width: .4rem;" alt=""></i>
        </div>
        <span>点击上传附件</span> -->
        <div id="addBoxReply">

            <span id="addSpanReply"><img src="../assets/img/customer/add.png" @click="getFile" style="width: .8rem;" alt=""><span @click="getFile" class="replySpan">点击上传附件</span></span>

        </div>
        <!--<form action="#" enctype="multipart/form-data" >-->
          <input style="display:none" type="file" accept="image/*" id="fileReply"  @change="inFile">
        <!--</form>-->
    </div>
    <div id="btn">
        <!-- <div id="cancel" @click="hideReply">取消</div>
        <div id="create" @click="reply">回复</div> -->
        <el-button type="info" id="cancel" @click="hideReply">取消</el-button>
        <el-button type="primary" id="create" @click="reply">回复</el-button>
    </div>
</div>
</template>
<script>
    import t from '../common/js/tools';
    import images from '../assets/img/customer/images.png'
    import audio from "../assets/img/customer/audio.png"
    import doc from "../assets/img/customer/doc.png"
    import excel from "../assets/img/customer/excel.png"
    import html from "../assets/img/customer/html.png"
    import movie from "../assets/img/customer/movie.png"
    import pdf from "../assets/img/customer/pdf.png"
    import tables from "../assets/img/customer/tables.png"
    import video from "../assets/img/customer/video.png"
    import zip from "../assets/img/customer/zip.png"
    import presentation from "../assets/img/customer/presentation.png"
    import other from "../assets/img/customer/other.png"
    import del from "../assets/img/customer/del.png"
    import { Loading } from 'element-ui';
    export default {
        name: 'createQ',
        data() {
            return {
                data:{},
                content:'',
                attachments:[],
                loadingInstance:'',
                img_type:{
                    "audio": audio,
                    "doc":doc,
                    "excel":excel,
                    "html":html,
                    "images":images,
                    "movie":movie,
                    "pdf":pdf,
                    "tables":tables,
                    "video": video,
                    "zip": zip,
                    "presentation": presentation,
                    "other": other,
                    "del": del
                },
                flieType:'',
                urlData: {},
            }
        },
        props:['index','ids'],
        methods: {
            hideReply(){
                this.content = '';
                this.attachments = [];
                $('.reply').slideUp('fast');
                $('.btnBox').show();
            },
            getFile(){
                // var index = $('.replySpan').index();
                // alert(index)
                $('#fileReply').trigger('click')
            },
            inFile(){
                var _this = this;
                var fileObj = document.getElementById('fileReply').files[0];
                this.load();
                // _this.preview(fileObj);
                _this.getfileType(fileObj.type);
                // _this.insert(fileObj.name);
                // 接收上传文件的后台地址
                // var FileController = 'http://dev-casino-app.famely.com/v1/time/upload/file';//本地
                var FileController = 'https://openapp.win.town/v1/time/upload/file';//线上
                // FormData 对象
                var form = new FormData();
                // 文件对象
                form.append("file", fileObj);
                var data1 = this.urlData;
                for (let i in data1) {
                  form.append(i,data1[i]);
                };
                form.append('file_type',_this.fileType);
                // 其他参数
                // form.append("xxx", xxx);
                // form.append(this.urlData);
                // XMLHttpRequest 对象
                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, true);
                xhr.responseType = 'json'
                // xhr.upload.addEventListener("progress", _this.progressFunction, false); //监听上传进度
                xhr.onload = function (res) {
                    if(res.target.status == 200  && res.target.readyState == 4){debugger
                        //成功
                        var data = res.target.response.data;
                        var obj = {};
                        obj.key = data.key;
                        obj.filename = fileObj.name;
                        // _this.attachments.push(obj)
                        // _this.getfileType(fileObj.type);
                        _this.insert(data.url);
                        _this.loadingInstance.close();
                    }else{
                        //失败
                    }
                    _this.loadingInstance.close();

                };
                xhr.ontimeout = function(){
                    _this.loadingInstance.close();
                    this.$message.error(_this.data.chao_again);
                }
                xhr.timeout = 60000;
                xhr.onerror = function(){
                  _this.loadingInstance.close();
                  this.$message.error(_this.data.upload_fail);
                }
                xhr.send(form);

            },
            progressFunction(evt){

              if (evt.lengthComputable) {//
                  var completedPercent = event.loaded / event.total;
                   // progressBar.max = evt.total;
                   // progressBar.value = evt.loaded;
                   // percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
              }

            },
            getfileType(type){
              if(type.indexOf('image') != -1){//图片格式
                this.fileType = 'images';
              }else if(type.indexOf('.document') != -1){
                this.fileType = 'doc';
              }else if(type.indexOf('/msword') != -1){
                this.fileType = 'doc';
              }else if(type.indexOf('/plain') != -1){
                this.fileType = 'doc';
              }else if(type.indexOf('.sheet') != -1){
                this.fileType = 'excel';
              }else if(type.indexOf('/html') != -1){
                this.fileType = 'html';
              }else if(type.indexOf('/pdf') != -1){
                this.fileType = 'pdf';
              }else if(type.indexOf('video') != -1){
                this.fileType = 'video';
              }else if(type.indexOf('/zip') != -1){
                this.fileType = 'zip';
              }else if(type.indexOf('audio') != -1){
                this.fileType = 'audio';
              }else{
                this.fileType = 'other';
              }
              // this.insert();
            },
            insert(url){debugger
                var _this = this;
                var fileObj = document.getElementById('fileReply').files[0];
                var newItem=document.createElement("span");
                var img=document.createElement("img");
                var delImg = document.createElement("img");
                delImg.setAttribute('name',fileObj.name);
                delImg.setAttribute('keyUrl',url);
                newItem.className = 'addedImg'
                // delImg.setAttribute('@click',delImg)
                delImg.className = 'del';
                delImg.onclick = function(){
                  $(this).parent().remove()
                }
                delImg.src = _this.img_type.del;
                if(_this.fileType == 'images'){//图片本地预览
                  var f = document.getElementById('fileReply').files[0];
                  var filereader = new FileReader();
                  filereader.addEventListener("load", function () {
                      img.src = filereader.result;
                      newItem.appendChild(img);
                  }, false);
                  filereader.readAsDataURL(f);
                }else if(_this.fileType == 'doc'){
                  img.src = _this.img_type.doc;
                  newItem.appendChild(img);
                }else if(_this.fileType == 'excel'){
                  img.src = _this.img_type.excel;
                  newItem.appendChild(img);
                }else if(_this.fileType == 'html'){
                  img.src = _this.img_type.html;
                  newItem.appendChild(img);
                }else if(_this.fileType == 'pdf'){
                  img.src = _this.img_type.pdf;
                  newItem.appendChild(img);
                }else if(_this.fileType == 'zip'){
                  img.src = _this.img_type.zip;
                  newItem.appendChild(img);
                }else if(_this.fileType == 'video/'){
                  img.src = _this.img_type.video;
                  newItem.appendChild(img);
                }else if(_this.fileType == 'audio/'){
                  img.src = _this.img_type.audio;
                  newItem.appendChild(img);
                }else if(_this.fileType == 'other'){
                  img.src = _this.img_type.other;
                  newItem.appendChild(img);
                }else{
                  img.src = _this.img_type.other;
                  newItem.appendChild(img);
                }
                newItem.appendChild(delImg);


                var item = document.getElementById('addBoxReply');
                var addSpan = document.getElementById('addSpanReply')
                item.insertBefore(newItem,addSpan);
            },
            load(){
              var str = this.data.loadings;
              this.loadingInstance = Loading.service({
                // target:'.mask',
                fullscreen:true,
                text: str,
                // spinner: 'loading2',
                background: 'rgba(0,0,0,.6)',

              });
            },
            // getId(id){
            //   this.ids = id;
            // },
            getKeys(){
              this.attachments = [];
              var del = $('.del');
              var len = del.length;
              for(var i = 0; i < len; i++){
                var key = del.eq(i).attr('keyUrl');
                var name = del.eq(i).attr('name');
                var obj = {};
                obj.key = key;
                obj.filename = name;
                this.attachments.push(obj);
              }
            },
            reply(){
                var _this = this;
                this.getKeys();
                var attachmentstr = JSON.stringify(this.attachments);
                this.$api.post('customerservice/admin/reply', {
                    id: _this.ids, //问题id
                    content: _this.content, //内容
                    attachments: attachmentstr, //附件
                }, function (data) {
                    if (data.error_code) {
                        _this.$message.error(data.message, 2)
                    } else {
                        _this.$message({
                          message: '回复成功',
                          type: 'success'
                        });//去刷新列表
                        _this.$emit('getReplyDetail', _this.ids)
                        _this.hideReply();
                        // _this.my_detail(id);
                        // _this.speaks = '';
                        // _this.index_tex = 0;
                    }
                })
            }
        },

        mounted: function () {
          this.$nextTick(function () {
              // $('.reply').slideUp(0)
          })
        },
        created() {
          var _this = this;
          t._post_url('', {name: 'avatar'}, function (data) {
              // _this.getUrl = 'http://dev-casino-app.famely.com/v1/time/avatar/update?'+ 'access_token='+data.access_token+'&app_id='+data.app_id+'&lang='+data.lang+'&login_success='+data.login_success+'&sign='+data.sign+'&timestamp='+data.timestamp+'&name='+data.name
              _this.urlData = data;
          });
        },
        components: {}
    }
</script>
<style>
#addBoxReply>span{
  /* width: .4rem; */
  height: .8rem;
  margin-left: 4px;
  display: inline-block;
  margin-bottom: .2rem;
  position: relative;
  /* display: flex; */

}
#addBoxReply>span>span{
  margin-left: 10px;
  line-height: 40px;
  position: absolute;
  width: 90px;
}
#addBoxReply span img{
  width: .8rem;
  height: 100%;
  display: inline-block;
  border-radius: 4px;
}
#addBoxReply span .del{
  position: absolute;
  display: inline-block;
  height: 14px;
  width: 14px;
  right: -3px;
  top: -3px;
  z-index: 200;
}

</style>
<style scoped="scoped" lang="scss">
.reply{
    padding-top: .2rem;
    padding-bottom: .2rem;
    textarea{
        width: 100%;
        margin: auto;
        border-radius: 6px;
        background-color: #ffffff;
        border: solid 1px #aec9de;
        color: #808080;
        text-indent: .12rem;
        padding-top: .08rem;
        font-size: 13px;
        &::placeholder{
            font-size: 13px;
        }
    }
    >div{
        display: flex;
        /* height: .4rem; */
        line-height: .4rem;
        flex-wrap: wrap;
        justify-content: flex-start;
        >span{
            margin-left: .1rem;
            font-size: .12rem;
            color: #aec9de;
        }
    }
    #btn{
      text-align: right;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      .el-button{
        padding: 0!important;
        width: 107px;
        height: 30px;
        display: inline-block;
      }
    }
}

</style>
