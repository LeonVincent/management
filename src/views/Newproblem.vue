<template>
    <div class="new_problem">
        <ul>
            <li v-for="(item,index) in list">
                <el-row class="list_top">
                    <el-col :xs="8" :sm="4">{{item.username}}</el-col>
                    <el-col :xs="16" :sm="15" style="text-align:left"><span>用户名：</span><span>987483877</span></el-col>
                    <el-col :xs='24' :sm="5">{{item.updated_at}}</el-col>
                </el-row>
                <el-row class="explan">
                    <el-col :xs="22" :sm="22" class="explanRow" style="word-break: break-all;"><span v-show="!item.isread" class="isread"></span>{{item.title}}</el-col>
                    <el-col :xs="2" :sm="2">
                        <i @click="open(item.id,index)" class="open">
                            <img src="../images/header/zhankai.png" height="14" width="14" alt="">
                        </i>
                        <i @click="close(index)" class="close" style="display:none">
                            <img src="../images/header/shouqi.png" width="14" alt="">
                        </i>
                    </el-col>
                </el-row>
                <div class="tap" style="display:none;">
                    <ul>
                        <li v-for="(entry,index) in detail">
                            <el-row :class="[{ isKefu: entry.type }, tap_txt]">
                                <el-col class="tap_txt_ins" :xs="24" :sm="18">
                                    <span v-show="entry.type">客服回复:</span>{{entry.content}}
                                </el-col>
                                <el-col class="tap_txt_time right" :xs="0" :sm="6">{{detail.updated_at}}</el-col>
                            </el-row>
                            <div class="fujian">
                                <!-- <div class="fujian" v-if="entry.attachmentnum"> -->
                                <div class="fujian_item" v-for="_item in entry.attachments">
                                    <span><img src="../assets/img/other.png" height="20" alt=""></span>
                                    <i>{{_item.filename}}</i>
                                    <span><a :href="_item.url" :download="_item.filename">下载</a></span>
                                    <span @click="showImg(_item.url)">预览</span>
                                </div>
                                <!-- <div class="fujian_item">
                                  <span><img src="../assets/img/other.png" height="20" alt=""></span>
                                  <i>截图1.jpg</i>
                                  <span>下载</span>
                                  <span>预览</span>
                                </div> -->
                            </div>
                        </li>
                    </ul>

                    <div class="btnBox">
                        <el-button type="info" @click="closeQue(item.id)">移到废纸篓</el-button>
                        <el-button type="primary" @click="showReply(index)">添加回复</el-button>
                    </div>
                    <reply :ids="item.id" @getReplyDetail="getReplyDetail"></reply>
                </div>
            </li>
        </ul>
        <div id="pages">
            <el-pagination
                    small
                    background
                    layout="total, prev, pager, next"
                    :total="total"
                    :current-pag="currentpage"
                    @current-change="currentChange"
            >
            </el-pagination>
        </div>
        <div>
            <el-dialog
                    title=""
                    :visible.sync="centerDialogVisible"
                    :append-to-body="true"
                    :width="iswidth"
                    class="isWidth"
                    center>
                <img :src="currentUrl" width="100%" style="margin-top:30px" alt="">
                <!-- <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                </span> -->
            </el-dialog>
        </div>


    </div>
</template>

<script>
    import Reply from '@/components/reply'
    import t from './../common/js/tools.js'
    export default {
        name: 'Newproblem',
        data() {
            return {
                router: [],
                items: [1, 2, 3, 4, 5, 6],
                total: 10,
                list: [],
                detail: {},
                currentpage: '1',
                currentUrl: '',
                centerDialogVisible: false,
                iswidth: '50%',
            }
        },
        methods: {
            showImg(url) {
                this.currentUrl = url;
                // $('#preview_img').modal('show');
                this.centerDialogVisible = true;
            },
            showReply(index) {
                $('.reply').eq(index).slideDown('fast');
                $('.btnBox').hide();
                $('.addedImg').remove();
            },
            currentChange(page) {
                this.currentpage = page;
                this.getList();
                this.closeAll();
            },
            open(id, index) {
                this.getDetail(id, index);
                $('.btnBox').show();
            },
            closeQue(id) {
                let _this = this;
                var obj = {
                    id: id
                }
                this.$api.post('customerservice/admin/waste', obj, function (data) {
                    // _this.detail = data.body.data.records;
                    if (data.data.result == 'ok') {
                        _this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: '2000'
                        });
                        _this.getList();
                        _this.closeAll();

                    }
                }, function (res) {
                    if (res.status == '401') {
                        _this.$message({
                            showClose: true,
                            message: '请输入密码',
                            type: 'error',
                            duration: '2000',
                            onClose: function () {
                                _this.$router.push('/Login');
                            }
                        });
                    }
                })
            },
            getDetail(id, index) {
                let _this = this;
                var obj = {
                    id: id
                };
                this.$api.get('customerservice/admin/detail', obj, function (data) {
                    if($('.replay').attr('display') == 'none'){
                        $('.btnBox').show();
                    }

                    $('.isread').eq(index).hide();
                    _this.detail = data.data.records;
                    $('.tap').slideUp('fast');
                    $('.tap').eq(index).slideDown('fast');
                    $('.open').show();
                    $('.close').hide();

                    $('.close').eq(index).show();
                    $('.open').eq(index).hide();
                    _this.getNum();
                }, function (res) {
                    if (res.status == '401') {
                        _this.$message({
                            showClose: true,
                            message: '请输入密码',
                            type: 'error',
                            duration: '2000',
                            onClose: function () {
                                _this.$router.push('/Login');
                            }
                        });
                    }
                })
            },
            getReplyDetail(id) {
                let _this = this;
                var obj = {
                    id: id
                }
                _this.closeAll();
                _this.getList();
                // this.$api.get('customerservice/admin/detail', obj, function (data) {
                //     // $('.isread').eq(index).hide();
                //     _this.detail = data.data.records;
                //     // $('.tap').slideUp('fast');
                //     // // $('.tap').eq(index).slideDown('fast');
                //     // $('.open').show();
                //     // $('.close').hide();
                //     //
                //     // $('.close').eq(index).show();
                //     // $('.open').eq(index).hide();
                //     _this.getNum();
                // }, function (res) {
                //     if (res.status == '401') {
                //         _this.$message({
                //             showClose: true,
                //             message: '请输入密码',
                //             type: 'error',
                //             duration: '2000',
                //             onClose: function () {
                //                 _this.$router.push('/Login');
                //             }
                //         });
                //     }
                // })
            },
            close(index) {
                $('.tap').slideUp('fast');
                $('.open').eq(index).show();
                $('.close').eq(index).hide();
            },
            closeAll() {
                $('.tap').slideUp('fast');
                $('.open').show();
                $('.close').hide();
            },
            getList() {
                let _this = this;
                var obj = {
                    pagesize: '10',
                    page: _this.currentpage
                }
                // _this.$store.dispatch('Login', objlogin).then(() => {debugger
                //   // this.loading = false
                //   _this.$router.push({ path: '/Newproblem' })
                // }).catch(() => {
                //   // this.loading = false
                // })
                this.$api.get('customerservice/admin/newlist', obj, function (data) {
                    var data = data.data;
                    _this.total = data.total;
                    _this.list = data.list;
                }, function (res) {
                    if (res.status == '401') {
                        _this.$message({
                            showClose: true,
                            message: '请输入密码',
                            type: 'error',
                            duration: '2000',
                            onClose: function () {
                                _this.$router.push('/Login');
                            }
                        });
                    }
                })
            },
            getNum() {
                var _this = this;
                this.$api.get('customerservice/admin/unread', {}, function (data) {
                    var data = data.data;
                    var newpro = data.new;

                    var past = data.past;
                    $('.old_question').html(past);
                    _this.updataNum(newpro, past)
                }, function (res) {
                    if (res.status == '401') {
                        _this.$message({
                            showClose: true,
                            message: '请输入密码',
                            type: 'error',
                            duration: '2000',
                            onClose: function () {
                                _this.$router.push('/Login');
                            }
                        });
                    }
                })
            },
            updataNum(newpro, past) {
                if (newpro != 0) {
                    $('.new_question').show();
                    $('.new_question').html(newpro);
                } else {
                    $('.new_question').hide();
                }
                if (past != 0) {
                    $('.old_question').show();
                    $('.old_question').html(past);
                } else {
                    $('.old_question').hide();
                }
            },
            isMobile() {
              const rect = body.getBoundingClientRect()
              return rect.width - RATIO < WIDTH
            },
            resizeHandler() {
              if (!document.hidden) {
                const isMobile = this.isMobile()
                store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

                if (isMobile) {
                  store.dispatch('CloseSideBar', { withoutAnimation: true })
                  $('.titleHome').show();
                }else{
                  $('.titleHome').hide();
                }
              }
            }
        },
        mounted() {
            $('.el-aside').show();
            $('.title').show();
            $('.header').find('.el-dropdown').show();
            $('.el-header').show();
            $('.titleHome').show();
            var _this = this;
            this.$nextTick(function () {
                _this.getList();
                _this.getNum();
                _this.resizeHandler();
            })


        },
        created() {
            console.log(t)
            console.log(fetch)
        },
        components: {
            Reply
        }
    }
</script>

<style lang="scss" scoped="scoped">
/* @import '~@/common/css/base.scss';
@media screen and (min-width: $smallSize){
  display: none
} */
    .isread {
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: #f3433c;
        border-radius: 50%;
        margin-right: 5px;
        margin-bottom: 2px;
    }
    .isKefu{
      color: #3d96ff;
    }

    .new_problem {
        width: 100%;
        text-align: left;
        > ul {
            li {
                padding: 10px 0;
                border-bottom: 1px solid #cccccc;
                .list_top {
                    font-size: 14px;
                    color: #666;
                    font-weight: 300;
                    text-align: left;
                }
                .explan {
                    font-size: 14px;
                    color: #1a1a1a;
                    margin-top: 10px;
                    > .el-col:nth-child(2) {
                        i {
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                            cursor: pointer;
                        }
                        i:nth-child(2) {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                        }
                    }
                }
                .tap {
                    font-size: 12px;
                    color: #4d4d4d;
                    li {
                        border-bottom: 1px dashed #cccccc;
                        /* margin-bottom: 20px; */
                        .tap_txt {
                            margin: 20px 0;
                            /* display: flex; */
                            .tap_txt_ins {
                                /* padding-right: 40px; */
                            }
                        }
                        .fujian {

                            > div {
                                margin: 10px 0;
                            }
                            .fujian_item {
                                span {
                                    color: #3d96ff;
                                    cursor: pointer;
                                    a {
                                        text-decoration: none;
                                    }
                                }
                                span:nth-child(1) {
                                    display: inline-block;
                                    vertical-align: middle;
                                    img {
                                        border-radius: 4px;
                                    }
                                    /* height: 20px; */
                                    /* width: 20px; */
                                    /* background: #3d96ff; */
                                }
                            }
                        }

                    }
                    .btnBox {
                        text-align: right;
                        margin-top: 20px;
                        .el-button {
                            padding: 0 !important;
                            width: 107px;
                            height: 30px;
                        }
                    }

                }
            }
        }
        #pages {
            /* position: absolute; */
            /* bottom: 100px; */
            margin-top: 50px;
            /* float: right; */
            .number {
                background-color: #e2e4e7;
            }
            .active {
                background-color: #409EFF;
            }
        }
    }

</style>
