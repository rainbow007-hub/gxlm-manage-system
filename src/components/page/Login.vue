<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">家教管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { staffLogin } from '../../api/staff';
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    // 验证通过后，在登录之前先清除token
                    localStorage.removeItem('token');
                    staffLogin(this.param.username, this.param.password)
                        .then(response => {
                            this.$message.success('登录成功');
                            // 将登录成功后的token放入localStorage中
                            localStorage.setItem('token', response.data.token);
                            // 登录之后可以拿到客服的姓名
                            localStorage.setItem('staff_name', response.data.staffName);
                            this.$router.push('/');
                        })
                        .catch(error => {
                            // 用户名或密码不正确
                            if (error.message == 'Bad credentials') {
                                this.$message.error('用户名或密码不正确');
                            }
                        });
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    /* width: 100%; */
    height: 100%;
    background-image: url(../../assets/img/login-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
