<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-user"></i> 家长管理 </el-breadcrumb-item>
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
            <el-table :data="tableData" border max-height="700px" class="table" header-cell-class-name="table-header">
                <el-table-column prop="parentId" label="家长编号" min-width="190" align="center"></el-table-column>
                <el-table-column prop="parentName" label="家长姓名" min-width="125" align="center"></el-table-column>
                <el-table-column prop="parentContact" label="联系方式" min-width="400" align="center"></el-table-column>
                <!-- <el-table-column prop="credit" label="信誉" min-width="100" align="center"></el-table-column> -->
                <el-table-column label="操作" min-width="160" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
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
        <el-dialog title="添加家长" :visible.sync="addVisible" v-dialogDrag width="40%">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item label="姓名">
                    <el-input v-model="form.parentName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.parentContact"></el-input>
                </el-form-item>
                <!-- <el-form-item label="信誉">
                    <el-select v-model="form.credit" placeholder="请选择信誉值">
                        <el-option label="优秀" value="优秀"></el-option>
                        <el-option label="良好" value="良好"></el-option>
                        <el-option label="中等" value="中等"></el-option>
                        <el-option label="不合格" value="不合格"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="displayDialog">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框定制 -->
        <el-dialog title="编辑家长信息" :visible.sync="editVisible" v-dialogDrag width="40%">
            <el-form ref="form" :model="form" label-width="auto">
                <el-form-item label="姓名">
                    <el-input v-model="form.parentName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.parentContact"></el-input>
                </el-form-item>
                <!-- <el-form-item label="信誉">
                    <el-select v-model="form.credit" placeholder="请选择信誉值">
                        <el-option label="优秀" value="优秀"></el-option>
                        <el-option label="良好" value="良好"></el-option>
                        <el-option label="中等" value="中等"></el-option>
                        <el-option label="不合格" value="不合格"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="displayDialog">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { listAllParents, insertParent, getParentById, updateAll } from '../../api/parents';
import { clone, objListFilter } from '../../utils/common';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                keyword: ''
            },
            tableDataSource: [], // 存储从后端获取的原始数据
            tableData: [], // 存储真正显示在表格中的数据
            addVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getParentsData();
    },
    methods: {
        // 从后端获取所有学生信息
        getParentsData() {
            listAllParents()
                .then((response) => {
                    this.tableDataSource = response.data;
                    this.tableData = response.data;
                })
                .catch((error) => {
                    this.$message.error('请刷新页面重新加载');
                });
        },
        // 添加操作
        handleAdd() {
            this.form = {};
            this.addVisible = true;
        },
        // 保存
        saveAdd() {
            insertParent(this.form)
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        this.form.parentId = response.data;
                        this.tableData.push(this.form);
                        this.displayDialog();
                        this.$message.success('添加成功');
                    }
                })
                .catch((error) => {
                    console.log(error);
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
            console.log(this.form);
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            var data = this.form;
            updateAll(data).then((response) => {
                console.log(response);
                // this.$set(this.tableData, this.idx, this.form);
                Object.keys(this.tableData[this.idx]).forEach((key) => {
                    this.tableData[this.idx][key] = this.form[key];
                });
                this.displayDialog();
                this.$message.success('编辑成功');
            });
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
</style>
