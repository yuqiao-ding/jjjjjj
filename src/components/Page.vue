<template>
  <div class="deit">
    <el-button type="primary" @click="dialogVisible = true">新增通讯录</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div class="block">
        生日:
        <el-date-picker
          v-model="userInfo.date"
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <div class>
        姓名 :
        <el-input style="width:150px;" v-model="userInfo.name" placeholder="新增用户姓名"></el-input>
      </div>
      <div class>
        省份 :
        <el-input style="width:150px;" v-model="userInfo.age" placeholder="新增用户年龄"></el-input>
      </div>
      <div class>
        地址 :
        <el-input style="width:150px;" v-model="userInfo.address" placeholder="新增用户地址"></el-input>
      </div>
      <div class>
        邮箱 :
        <el-input style="width:150px;" v-model="userInfo.email" placeholder="新增用户邮箱"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

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
            <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="editInfo.date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
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
        <el-table style="width: 100%;" border stripe :key="tableKey" :data="userList">
          <el-table-column prop="date" label="日期" width="130"></el-table-column>
          <el-table-column label="编号" prop="id" width="60"></el-table-column>
          <el-table-column label="年龄" prop="age" width="60"></el-table-column>
          <el-table-column label="用户姓名" prop="name" width="80"></el-table-column>
          <el-table-column label="手机号" prop="phone" width="150"></el-table-column>
          <el-table-column label="邮箱" prop="email" width="150"></el-table-column>
          <el-table-column label="地址" prop="address" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="{row,$index}">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editUser(row)"
                size="small"
              ></el-button>

              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteRow(row,$index)"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableKey: 0,
      search: "",
      searchData: [],
      userList: [],
      userInfo: {
        date: "",
        name: "",
        province: "",
        zip: "",
        city: "",
        address: ""
      },
      editInfo: {
        date: "",
        name: "",
        province: "",
        zip: "",
        city: "",
        address: ""
      },
      dialogVisible: false,
      dialogVisible1: false,
      listArray: [
        {
          id: "1",
          date: "2016-05-02",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "2",
          date: "2016-05-17",
          name: "钱*",
          age: "22",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "3",
          date: "2016-05-11",
          name: "王*",
          age: "23",
          email: "9818313118@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "4",
          date: "2016-05-13",
          name: "张*",
          age: "25",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "5",
          date: "2016-05-06",
          name: "刘*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "6",
          date: "2016-05-03",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "7",
          name: "赵*",
          date: "2016-05-02",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "8",
          name: "赵*",
          date: "2016-05-19",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "9",
          name: "赵*",
          date: "2016-05-02",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "10",
          name: "赵*",
          date: "2016-05-09",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "11",
          date: "2016-05-09",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "12",
          name: "赵*",
          date: "2016-05-03",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "13",
          date: "2016-05-02",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "14",
          name: "赵*",
          date: "2016-05-01",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "15",
          date: "2016-05-02",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "16",
          date: "2016-05-01",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "17",
          date: "2016-05-03",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "18",
          date: "2016-05-02",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "19",
          name: "赵*",
          date: "2016-05-22",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "20",
          date: "2016-05-12",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "21",
          date: "2016-05-11",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "22",
          date: "2016-05-05",
          name: "赵*",
          age: "21",
          email: "9818618@qq.com",
          phone: "188****888888",
          address: "上海路1号向公馆"
        },
        {
          id: "23",
          date: "2016-05-08",
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
    handleUserList() {
      this.userList = this.listArray;
    },
    //  handleUserList() {
    //     this.$http.get('http://localhost:8000/UserList').then(res => {  //这是从本地请求的数据接口，
    //         this.userList = res.body
    //     })
    //  }
    deleteRow(rows, index) {
      this.$confirm("确认删除？")
        .then(() => {
          this.listArray.splice(index, 1);
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

    addUser() {
      if (
        !this.userInfo.name ||
        !this.userInfo.address ||
        !this.userInfo.date ||
        !this.userInfo.age ||
        !this.userInfo.email 
      ) {
        this.$message({
          message: "请完整填写信息",
          type: "warning"
        });
        return;
      }
      this.listArray.push(this.userInfo);
      this.userInfo = {
        id: "",
        date: "",
        name: "",
        age: "",
        email: "",
        phone: "",
        address: ""
      };
      this.dialogVisible = false;
    },

    editUser(row) {
      // console.log(item);
      this.editInfo = Object.assign({}, row);
      // this.editInfo = {
      //   id: item.id,
      //   age: item.age,
      //   name: item.name,
      //   email: item.email,
      //   phone: item.phone,
      //   address: item.address
      // };
      this.dialogVisible1 = true;
    },
    confirm() {
      const editInfoData = Object.assign({}, this.editInfo);
      console.log(editInfoData);
      console.log(editInfoData.id);
      const index = this.listArray.findIndex(v => v.id === this.editInfo.id);
      this.listArray.splice(index, 1, this.editInfo);
      this.dialogVisible1 = false;
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