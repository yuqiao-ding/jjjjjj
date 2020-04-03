<template>
  <div class="deit">
    <div class="cantainer">
      <el-input type="text" name id placeholder="搜索" v-model.trim="search" style="width: 10%;"></el-input>
      <el-button @click="btn">搜索</el-button>
      <div v-for="(item , index) of searchData" :key="index"></div>
    </div>
    <div
      class="crumbs"
      style="width:800px; margin-left:auto; margin-right:auto; text-align:center;"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 数据管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="cantainer">
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible1"
          width="30%"
          :before-close="handleClose"
        >
          <el-form ref="form" :model="editInfo" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="editInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="editInfo.age"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="editInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="editInfo.address"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
        <el-table
          style="width: 100%;"
          border
          stripe
          :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        >
          <el-table-column label="编号" prop="id" width="60"></el-table-column>
          <el-table-column label="年龄" prop="age" width="180"></el-table-column>
          <el-table-column label="用户姓名" prop="name" width="180"></el-table-column>
          <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
          <el-table-column label="地址" prop="address" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editUser(scope.row, scope.row.id)"
                size="small"
              ></el-button>

              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click.native.prevent="deleteRow(scope.row.id, listArray)"
                size="small"
              ></el-button>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      searchData: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
      editInfo: {
        date: "",
        name: "",
        province: "",
        zip: "",
        city: "",
        address: ""
      },
      dialogVisible1: false,
      listArray: [
        {
          id: "1",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "2",
          name: "钱*",
          age: "22",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "3",
          name: "王*",
          age: "23",
          email: "9818313118@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "4",
          name: "张*",
          age: "25",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "5",
          name: "刘*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "6",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "7",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "8",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "9",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "10",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "11",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "12",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "13",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "14",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "15",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "16",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "17",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "18",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "19",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "20",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "21",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "22",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "23",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        }
      ]
    };
  },
  created() {
    this.handleUserList();
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    handleUserList() {
      this.userList = this.listArray;
    },
    //  handleUserList() {
    //     this.$http.get('http://localhost:8000/UserList').then(res => {  //这是从本地请求的数据接口，
    //         this.userList = res.body
    //     })
    //  }
    deleteRow(id, rows) {
      this.$confirm("确认删除？")
        .then(() => {
          rows.splice(id - 1, 1);
        })
        .catch(() => {});
    },
    isNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },
    btn() {
      var search = this.search;
      if (this.isNull(search)) {
        // this.$notify({
        //   title: "警告",
        //   message: "请输入想要搜索的内容",
        //   type: "warning"
        // });
        return false;
      } else {
        // 不报错
      }
      this.searchData = this.listArray.filter(function(product) {
        // console.log(product);
        return Object.keys(product).some(function(key) {
          // console.log(key);
          return (
            String(product[key])
              .toLowerCase()
              .indexOf(search) > -1
          );
        });
      });
      return (this.userList = this.searchData);
    },
    editUser(item, id) {
      // console.log(item);
      this.id = id;
      this.editInfo = {
        id: item.id,
        age: item.age,
        name: item.name,
        email: item.email,
        phone: item.phone,
        address: item.address
      };
      this.dialogVisible1 = true;
    },
    // edit() {
    //   this.dialogVisible1 = true
    // },

    // confirm(){
    //   this.dialogVisible1 = false;
    //   Vue.set(this.tableData, this.index, this.editInfo)
    // },
    confirm() {
      this.dialogVisible1 = false;
      this.userList.splice(this.id - 1, 1, this.editInfo);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>

<style  scoped>
</style>