<template>
<div class="app-container">
  <el-button type="primary" @click="dialogVisible = true">新增通讯录</el-button>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose">
    <div class="block">
    生日:
    <el-date-picker
      v-model="userInfo.date"
      type="date"
      format="yyyy 年 MM 月 dd 日"
     value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
  </div>
    <div class="">
      姓名 : <el-input style="width:150px;" v-model="userInfo.name" placeholder="修改业主名称"></el-input>
    </div>
    <div class="">
      省份 : <el-input style="width:150px;" v-model="userInfo.province" placeholder="修改业主名称"></el-input>
    </div>
    <div class="">
      市区 : <el-input style="width:150px;" v-model="userInfo.city" placeholder="修改业主名称"></el-input>
    </div>
     <div class="">
        地址 : <el-input style="width:150px;" v-model="userInfo.address" placeholder="修改业主名称"></el-input>
      </div>
      <div class="">
        邮编 : <el-input style="width:150px;" v-model="userInfo.zip" placeholder="修改业主名称"></el-input>
      </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog
    title="提示"
    :visible.sync="dialogVisible1"
    width="30%"
    :before-close="handleClose">
  <el-form ref="form" :model="editInfo" label-width="80px">
    <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="editInfo.date"   format="yyyy 年 MM 月 dd 日"
       value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
    </el-col>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="editInfo.name"></el-input>
    </el-form-item>
    <el-form-item label="省份">
      <el-input v-model="editInfo.province"></el-input>
    </el-form-item>
    <el-form-item label="市区">
      <el-input v-model="editInfo.city"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="editInfo.address"></el-input>
    </el-form-item>
    <el-form-item label="邮编">
      <el-input v-model="editInfo.zip"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
</el-dialog>
  <el-table
    :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" key="id"
    style="width: 100%">
    <el-table-column
     fixed
      prop="id"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">

        <el-button type="primary" icon="el-icon-edit" circle @click="editUser(scope.row, scope.row.id)" size="small">
        </el-button>

        <el-button
          type="danger" icon="el-icon-delete" circle
          @click.native.prevent="deleteRow(scope.row.id, tableData)"
          size="small">
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userList.length"
        >//这是显示总共有多少数据，</el-pagination>
</div>



</template>

<!-- /* <style>
.el-input__inner {
  width:30px;
  display: inline-block;
}

</style> */ -->


<script>
  export default {
    data() {
      return {
     currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
      
        index: 1,
        userInfo:{
          id: '',
          date: '',
          name: '',
          province: '',
          zip: '',
          city: '',
          address: '',
        },
        editInfo:{
          date: '',
          name: '',
          province: '',
          zip: '',
          city: '',
          address: '',
        },
         dialogVisible: false,
         dialogVisible1: false,
        tableData: [{
          id: '1',
          date: '2016-05-03',
          name: '王da虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          id: '2',
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          id: '3',
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          id: '4',
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          id: '5',
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          id: '6',
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          id: '7',
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    created() {
    this.handleUserList();
  },
    methods: {
 handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    handleUserList() {
      this.userList = this.tableData;
    },

      deleteRow(id, rows) {
      this.$confirm('确认删除？')
      .then(() =>{
        rows.splice(id-1, 1);
      })
      .catch(() =>{});
    },

      //   deleteRow(idx) {
      //     this.tableData.splice(idx, 1);
      //   },

      addUser(){
        if (!this.userInfo.name || !this.userInfo.address || !this.userInfo.date
         || !this.userInfo.province || !this.userInfo.zip || !this.userInfo.city)
        {this.$message({
          message: '请完整填写信息',
          type: 'warning'
        });
        return;
      }
        this.tableData.push(this.userInfo);
        this.userInfo = {
          id: '',
          date: '',
          name: '',
          province: '',
          zip: '',
          city: '',
          address: '',
        };
        this.dialogVisible = false

      },

       editUser(item,id) {
         // console.log(item);
         this.id = id-1;
         this.editInfo = {
           id: item.id,
           date: item.date,
           name: item.name,
           province: item.province,
           zip: item.zip,
           city:  item.city,
           address: item.address,
         };
         this.dialogVisible1 = true
       },
   // edit() {
   //   this.dialogVisible1 = true
   // },

   // confirm(){
   //   this.dialogVisible1 = false;
   //   Vue.set(this.tableData, this.index, this.editInfo)
   // },
   confirm(id){
     this.id = id-2;
     this.dialogVisible1 = false;
     this.userList.splice(this.id, 1,this.editInfo)
   },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      }
    },
    
  }
</script>
