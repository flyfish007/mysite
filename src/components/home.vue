<template>
  <div style="width:50%; margin: 50px auto;">
    <form>
      <div class="form-group">
        <label> 影片名称： </label>
        <input class="form-control" placeholder="请输入名称" v-model="title">
      </div>
      <div class="form-group">
        <label> 评分： </label>
        <input class="form-control" placeholder="请输入0到5的评分" v-model="rating">
      </div>
      <div class="form-group">
        <label> 影片介绍： </label>
        <textarea class="form-control" placeholder="请输入影片详情" v-model="introduction"></textarea>
      </div>
      <div style="margin: 50px 0;">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </div>
    </form>
    <table class="table">
      <tr>
        <th> 标题 </th>
        <th> 评分 </th>
        <th> 详情 </th>
      </tr>
      <tr v-for="(item,index) in tableList">
        <td> {{item.title}} </td>
        <td> {{item.rating}} </td>
        <td> {{item.introduction}} </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      title:"",
      introduction:"",
      rating:"",
      tableList:[]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
       this.axiosGet("/hello/testGff",{}).then(res => {

       })
    },
    onSubmit(){
      this.axiosPost("/api/movie", {
        title: this.title,
        introduction: this.introduction,
        rating: this.rating
      })
        .then(res => {
          this.$alert('提交成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.refreshTable();
            }
          });
        })
    },
    refreshTable(){
      this.axiosGet("/api/movie",{

      }).then(res => {

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
