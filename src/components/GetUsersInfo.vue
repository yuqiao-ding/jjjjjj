<template>
  <div style="width:1000px; margin-left:auto; margin-right:auto; text-align:center;">
    <el-button type="primary" @click="dialogVisible = true">新增通讯录</el-button>

    <div class="cantainer">
      <el-input type="text" name id placeholder="搜索" v-model.trim="search" style="width: 10%;"></el-input>
      <el-button @click="btn">搜索</el-button>
      <div v-for="(item , index) of searchData" :key="index"></div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" :model="userInfo" width="60%" :before-close="handleClose">
      <div class="block">
        生日:
        <el-date-picker
          v-model="userInfo.created_at"
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
        id :
        <el-input style="width:150px;" v-model="userInfo.id" placeholder="id"></el-input>
      </div>
      <div class>
        年龄 :
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
      <div class>
        手机 :
        <el-input style="width:150px;" v-model="userInfo.phone" placeholder="新增用户手机"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="editInfo" label-width="80px">
        <el-form-item label="id">
          <p>{{ editInfo.id}}</p>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="editInfo.created_at"
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
        <el-form-item label="手机">
          <el-input v-model="editInfo.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="userList" border stripe fit style="width: 100% text-align: center;">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="created_at" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="{row,id}">
          <el-button type="primary" icon="el-icon-edit" circle @click="editUser(row,id)" size="small"></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteRow(row,id)"
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
</template>

  <script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      searchData: [],
      userList: [],
      editInfo: {
        id:"",
        created_at: "",
        name: "",
        email: "",
        age: "",
        phone: "",
        address: ""
      },
      userInfo: {
        id: "",
        created_at: "",
        name: "",
        age: "",
        email: "",
        phone: "",
        address: ""
      },
      dialogVisible: false,
      dialogVisible1: false
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    
  //   deleteRow(rows, index) {
  //     this.$confirm("确认删除？")
  //       .then(() => {
  //         this.userList.splice(index, 1);
  //       })
  //       .catch(() => {});
  // },

  deleteRow(row,id) {
    
      axios
        .post("http://yuqiao.com/home/delete", 
          {
          id: row.id,
    })
        .then(function(response) {
          console.log(id);
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    isNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },

    editUser(row) {
      this.editInfo = Object.assign({}, row);
      console.log(this.editInfo);
      this.dialogVisible1 = true;
    },
    confirm() {
      const self = this;

      axios
        .post("http://yuqiao.com/home/update", 
          {
          phone: self.editInfo.phone,
          id:  self.editInfo.id,
          name: self.editInfo.name,
          email: self.editInfo.email,
          address: self.editInfo.address,
          created_at: self.editInfo.created_at,
          age: self.editInfo.age
    })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      // this.userList.splice(index, 1, this.editInfo);
      this.dialogVisible1 = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
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
      this.searchData = this.userList.filter(function(product) {
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
        !this.userInfo.created_at ||
        !this.userInfo.age ||
        !this.userInfo.email
      ) {
        this.$message({
          message: "请完整填写信息",
          type: "warning"
        });
        return;
      }
      // console.log(this.userInfo);
      // this.userList.push(this.userInfo);
      this.toAdd();
      this.userInfo = {
        id: "",
        created_at: "",
        name: "",
        age: "",
        email: "",
        phone: "",
        address: ""
      };
      this.dialogVisible = false;
    },

    toAdd() {
      const self = this;
      axios
        .post("http://yuqiao.com/home/plus", 
          {
          phone: self.userInfo.phone,
          id: self.userInfo.id,
          name: self.userInfo.name,
          email: self.userInfo.email,
          address: self.userInfo.address,
          created_at: self.userInfo.created_at,
          age: self.userInfo.age
        
    })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUserInfo() {
      const self = this;
      axios
        .get("http://yuqiao.com/home/index")
        .then(function(response) {
          console.log(response);
          self.userList = response.data.users;
          // let userList = JSON.parse(JSON.stringify(response.data.users));
          console.log(self.userList);
        })
        .catch(function(error) {
          console.log(error);
        });

        // axios
      //   .get("http://yuqiao.com/add/index")
      //   .then(function(response) {
      //     window.console.log(response.data);
      //     if (0 === response.data.errCode) {
      //       // window.console.log(response.data);
      //       self.userList = response.data;
      //       window.console.log(self.userList);
      //     } else {
      //       //不输出
      //     }
      //   })
      //   .catch(function(error) {
      //     window.console.log(error);
      //   });
      // window.console.log("开始获取当前的登录用户信息");
    },
  }
};
</script>