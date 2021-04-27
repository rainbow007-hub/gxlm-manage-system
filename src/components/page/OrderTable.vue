<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-menu"></i> 订单管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- 添加按钮 -->
                <el-button type="primary" @click="handleAdd()" class="mr20 mb10">添加</el-button>
                <!-- 搜索栏 -->
                <div class="handle-search">
                    <el-input v-model="query.keyword" @keyup.enter.native="handleSearch" class="handle-input mr10 mb10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div>
            </div>

            <!-- 表格定制 -->
            <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <!-- <el-form-item label="订单编号">
                                <span>{{ props.row.orderId }}</span>
                            </el-form-item>
                            <el-form-item label="科目">
                                <span>{{ props.row.course }}</span>
                            </el-form-item>
                            <el-form-item label="年级">
                                <span>{{ props.row.grade }}</span>
                            </el-form-item>
                            <el-form-item label="区域">
                                <span>{{ props.row.area }}</span>
                            </el-form-item> -->
                            <el-form-item label="描述(客服添加)">
                                <span>{{ props.row.describes }}</span>
                            </el-form-item>
                            <el-form-item label="要求(家长添加)">
                                <span>{{ props.row.request }}</span>
                            </el-form-item>
                            <el-form-item label="学生性别">
                                <span>{{ props.row.sex }}</span>
                            </el-form-item>
                            <el-form-item label="薪酬/小时">
                                <span>{{ props.row.pay }}</span>
                            </el-form-item>
                            <el-form-item label="次数">
                                <span>{{ props.row.num }}</span>
                            </el-form-item>
                            <el-form-item label="联系方式">
                                <span>{{ props.row.contact }}</span>
                            </el-form-item>
                            <el-form-item label="地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="订单创建时间">
                                <span>{{ props.row.createTime }}</span>
                            </el-form-item>
                            <el-form-item label="订单完成时间">
                                <span>{{ props.row.finishTime }}</span>
                            </el-form-item>
                            <el-form-item label="学生编号">
                                <span>{{ props.row.studentId }}</span>
                            </el-form-item>
                            <el-form-item label="客服编号">
                                <span>{{ props.row.staffId }}</span>
                            </el-form-item>
                        </el-form>
                        <el-button @click="handleEdit(props.$index, props.row)">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="orderId" label="订单编号" min-width="130" align="center"></el-table-column>
                <el-table-column prop="course" label="科目" min-width="125" align="center"></el-table-column>
                <el-table-column prop="grade" label="年级" min-width="100" align="center"></el-table-column>
                <el-table-column prop="area" label="区域" min-width="125" align="center"></el-table-column>
                <el-table-column prop="state" label="订单状态" min-width="100" align="center"></el-table-column>
                <!-- <el-table-column label="操作" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column> -->
            </el-table>

            <!-- 分页定制 -->
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->
        </div>

        <!-- 添加弹出框定制 -->
        <el-dialog title="添加订单" :visible.sync="addVisible" v-dialogDrag width="40%">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item label="区域">
                    <el-select v-model="form.area" placeholder="请选择区域">
                        <el-option v-for="item in areaList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.contact"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="科目">
                    <el-select v-model="form.course" placeholder="请选择科目">
                        <el-option v-for="item in courseList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select v-model="form.grade" placeholder="请选择年级">
                        <el-option v-for="item in gradeList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.describes"></el-input>
                </el-form-item>
                <el-form-item label="要求">
                    <el-input v-model="form.request"></el-input>
                </el-form-item>
                <el-form-item label="学生性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="薪酬">
                    <el-input v-model="form.pay"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="form.state" placeholder="请选择订单状态">
                        <el-option v-for="item in stateList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="displayDialog">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框定制 -->
        <el-dialog title="编辑订单信息" :visible.sync="editVisible" v-dialogDrag width="40%">
            <!-- 使用选项卡对订单信息进行编辑 -->
            <el-tabs v-model="tabNameForEditOrder" type="card" @tab-click="handleClickTab">
                <!-- 修改订单基本信息 -->
                <el-tab-pane label="修改订单信息" name="updateOrderAllTab">
                    <el-form :model="form" label-width="auto">
                        <el-form-item label="科目">
                            <el-select v-model="form.course" placeholder="请选择科目">
                                <el-option v-for="item in courseList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年级">
                            <el-select v-model="form.grade" placeholder="请选择年级">
                                <el-option v-for="item in gradeList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="区域">
                            <el-select v-model="form.area" placeholder="请选择区域">
                                <el-option v-for="item in areaList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="描述(客服添加)">
                            <el-input v-model="form.describes"></el-input>
                        </el-form-item>
                        <el-form-item label="要求(家长添加)">
                            <el-input v-model="form.request"></el-input>
                        </el-form-item>
                        <el-form-item label="学生性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="薪酬/小时">
                            <el-input v-model="form.pay"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="form.contact"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="客服接单" name="staffTakeTab"> 点击<i class="blue">确定</i>进行接单 </el-tab-pane>
                <el-tab-pane label="学生接单" name="studentTakeTab">
                    <p>输入<i class="blue">学生编号</i>，并点击<i class="blue">确定</i>即可让指定学生接单</p>
                    <br />
                    学生编号<el-input v-model="form.studentId" placeholder="请输入学生编号"></el-input>
                </el-tab-pane>
                <el-tab-pane label="修改订单状态" name="updateStateTab">
                    <el-radio-group v-model="form.state">
                        <div v-for="item in stateList" :key="item">
                            <el-radio :label="item" class="mb10">
                                <span class="font-size-20px">{{ item }}</span>
                            </el-radio>
                        </div>
                    </el-radio-group>
                    <el-input v-model="stateSupplement" placeholder="订单状态补充说明"></el-input>
                </el-tab-pane>
                <el-tab-pane label="更改订单的完成时间" name="finishOrderTab"> 点击<i class="blue">确定</i>完成订单 </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="displayDialog">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    listAllOrders,
    insertOrder,
    staffTake,
    getOrderById,
    studentTake,
    updateState,
    setFinishTimeByOrderId,
    updateAll
} from '../../api/order';
import { clone, dateFormat, objListFilter } from '../../utils/common';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                keyword: ''
            },
            // 区域列表
            areaList: ['越秀区', '海珠区', '荔湾区', '天河区', '白云区', '黄埔区', '南沙区', '番禺区', '花都区', '增城区', '从化区'],
            // 科目列表
            courseList: ['语文', '数学', '英语', '化学', '物理', '生物', '地理', '历史', '政治', '奥数', '全科', '其他'],
            // 年级列表
            gradeList: [
                '学前',
                '小学一年级',
                '小学二年级',
                '小学三年级',
                '小学四年级',
                '小学五年级',
                '小学六年级',
                '初一',
                '初二',
                '初三',
                '高一',
                '高二',
                '高三'
            ],
            // 订单状态列表
            stateList: ['新建订单', '已被接单', '完成', '异常'],
            tableData: [], // 存储真正显示到页面的数据
            tableDataSource: [], // 存储从后端获取的原始数据
            addVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {}, // 保存“添加或编辑”时需要传给后端的数据
            idx: -1, // 点击编辑按钮时所在行的索引
            id: -1,
            tabNameForEditOrder: 'updateOrderAllTab',
            stateSupplement: '' // 对订单状态的补充说明
        };
    },
    created() {
        this.getOrdersData();
    },
    methods: {
        // 从后端获取所有订单信息
        getOrdersData() {
            listAllOrders()
                .then(response => {
                    this.tableDataSource = response.data;
                    this.tableData = this.tableDataSource;
                })
                .catch(error => {
                    if (error) this.$message.error('请刷新页面重新加载');
                });
        },
        // 添加操作
        handleAdd() {
            this.form = {};
            this.addVisible = true;
        },
        // 保存
        saveAdd() {
            // 加上订单新建的时间
            this.form.createTime = dateFormat(new Date());
            insertOrder(this.form)
                .then(response => {
                    this.form.orderId = response.data;
                    this.tableDataSource.unshift(this.form);
                    this.displayDialog();
                    this.$message.success('添加成功');
                })
                .catch(error => {
                    this.$message.error('添加出现了问题，请重新尝试');
                });
        },
        // 触发搜索按钮
        handleSearch() {
            var keyword = this.query.keyword;
            this.tableData = [];
            this.tableData = objListFilter(this.tableDataSource, keyword);
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = clone(row);
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            switch (this.tabNameForEditOrder) {
                // 修改订单全部信息
                case 'updateOrderAllTab': {
                    this.$confirm('确定修改订单信息吗？', '修改订单信息', {
                        type: 'warning'
                    })
                        // 确定修改订单信息
                        .then(() => {
                            updateAll(this.form)
                                .then(response => {
                                    // 将所编辑行的数据替换为修改后的数据
                                    Object.keys(this.tableData[this.idx]).forEach(key => {
                                        this.tableData[this.idx][key] = this.form[key];
                                    });
                                    this.displayDialog();
                                    this.$message.success('修改订单信息成功');
                                })
                                .catch(error => {
                                    this.$message.error('似乎出现了问题，请稍后重试');
                                });
                        });
                    break;
                }
                // 客服接单
                case 'staffTakeTab': {
                    this.$confirm('确定接单吗？', '客服接单', {
                        type: 'warning'
                    }).then(() => {
                        var orderId = this.tableData[this.idx].orderId;
                        // 客服确定接单
                        staffTake(orderId)
                            .then(response => {
                                var staffId = response.data.staffId;
                                this.tableData[this.idx].staffId = staffId;
                                this.displayDialog();
                                this.$message({
                                    type: 'success',
                                    message: '成功接单，客服编号为<i>' + staffId + '</i>。',
                                    // message的内容将被当作HTML片段处理
                                    dangerouslyUseHTMLString: true
                                });
                            })
                            // 因为网络等问题导致接单失败
                            .catch(error => {
                                this.$message.error('网络出现异常，请检查网络后重新尝试');
                            });
                    });
                    break;
                }
                case 'studentTakeTab': {
                    this.$confirm('确定让该学生接单吗', '学生接单', {
                        type: 'warning'
                    }).then(() => {
                        var orderId = this.tableData[this.idx].orderId;
                        var studentId = this.form.studentId;
                        studentTake(orderId, studentId)
                            .then(response => {
                                if (response.status == 200) {
                                    this.tableData[this.idx].studentId = studentId;
                                    this.displayDialog();
                                    this.$message({
                                        type: 'success',
                                        message: '成功让编号为<i>' + studentId + '</i>的学生接单',
                                        // message的内容将被当作HTML片段处理
                                        dangerouslyUseHTMLString: true
                                    });
                                }
                            })
                            .catch(error => {
                                this.$message.error('似乎出现了问题，请稍后重试');
                            });
                    });
                    break;
                }
                case 'updateStateTab': {
                    this.$confirm('确定修改订单状态吗？', '修改订单状态', {
                        type: 'warning'
                    }).then(() => {
                        var orderId = this.tableData[this.idx].orderId;
                        // 拼接状态和补充说明
                        var newState = this.form.state + (this.stateSupplement ? ':' + this.stateSupplement : '');
                        updateState(orderId, newState)
                            .then(response => {
                                this.tableData[this.idx].state = newState;
                                this.displayDialog();
                                this.$message.success('成功改变订单状态为：' + newState);
                            })
                            .catch(error => {
                                this.$message.error('似乎出现了问题，请重新尝试');
                            });
                    });
                    break;
                }
                case 'finishOrderTab': {
                    this.$confirm('确定修改订单的完成时间吗？', '修改订单完成时间', {
                        type: 'warning'
                    }).then(() => {
                        var orderId = this.tableData[this.idx].orderId;
                        var finishTime = dateFormat(new Date());
                        setFinishTimeByOrderId(orderId, finishTime)
                            .then(response => {
                                this.tableData[this.idx].finishTime = finishTime;
                                this.displayDialog();
                                this.$message.success('成功更改订单的完成时间');
                            })
                            .catch(error => {
                                this.$message.error('更改订单的完成时间出现了问题，请重新尝试');
                            });
                    });
                    break;
                }
                default:
            }
        },
        // 获取编辑对话框当前显示的选项卡名
        handleClickTab(tab, event) {
            this.tabNameForEditOrder = tab.name;
            this.form = clone(this.tableData[this.idx]);
        },
        // 分页导航
        // handlePageChange(val) {
        //     this.$set(this.query, 'pageIndex', val);
        //     this.getData();
        // },
        // 隐藏添加和编辑订单的对话框
        displayDialog() {
            this.addVisible = false;
            this.editVisible = false;
            this.form = {};
            this.idx = -1;
            this.id = -1;
            this.tabNameForEditOrder = 'updateOrderAllTab';
            this.stateSupplement = '';
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 10px;
}

.handle-search {
    display: inline-block;
}

.handle-input {
    width: 400px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.blue {
    color: #409eff;
}
.mr20 {
    margin-right: 20px;
}
.mr10 {
    margin-right: 10px;
}
.mb10 {
    margin-bottom: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.font-size-20px {
    font-size: 20px;
}
.mb10 {
    margin-bottom: 10px;
}

/* 展开信息样式 */
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand >>> label {
    width: 120px;
    color: #20a0fa;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    /* width: 500px; */
    display: block;
}
</style>
