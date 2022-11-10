<template>
  <div>
    <div class="head">
      <el-card shadow="never" class="card">
        <el-steps :active="active" finish-status="success">
          <el-step title="商品基本信息" />
          <el-step title="添加库存信息" />
          <el-step title="添加移动端详情" />
        </el-steps>
      </el-card>
    </div>
    <div class="content">
      <el-form :model="form" label-width="80px">
        <!-- 商品基本信息 -->
        <el-card v-if="active===1" shadow="never">
          <div class="clearfix">
            <span>基本信息</span>
          </div>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品名称">
                <el-input v-model="form.product.name" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品编码">
                <el-input v-model="form.product.productSn" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品分类">
                <el-select v-model="form.product.productCategoryId" placeholder="品牌" @change="getCategoryName">
                  <el-option v-for="item in leju" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="商品品牌">
                <el-select v-model="form.product.brandId" placeholder="品牌" @change="getBrandName">
                  <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="商品描述">
                <el-input
                  id=""
                  v-model="form.product.description"
                  type="textarea"
                  placeholder="摘要"
                  rows="3"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="clearfix">
            <span>商品属性</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品原价">
                <el-input-number v-model="form.product.originalPrice" size="mini" label="描述文字" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品原价">
                <el-select v-model="form.product.promotionType" size="mini" disabled placeholder="没有促销使用原价" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动价格">
                <el-input-number v-model="form.product.promotionPrice" disabled size="mini" label="描述文字" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="重量(kg)">
                <el-input-number v-model="form.product.weight" size="mini" label="描述文字" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="审核状态">
                <el-switch v-model="form.product.verifyStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否上架">
                <el-switch v-model="form.product.publishStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <el-upload
                class="avatar-uploader"
                action="/lejuAdmin/material/uploadFileOss"
                :headers="token"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="form.product.pic" :src="form.product.pic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-col>
          </el-row>
          <div class="clearfix">
            <span>其他信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="推荐状态">
                <el-switch v-model="form.product.recommendStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="新品状态">
                <el-switch v-model="form.product.newStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预告商品">
                <el-switch v-model="form.product.previewStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="关键词">
                <el-input v-model="form.product.keywords" placeholder="多个关键词之间请以逗号分隔" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="库存预警">
                <el-input-number v-model="form.product.lowStock" size="mini" label="" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品排序">
                <el-input-number v-model="form.product.sort" size="mini" label="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <el-form-item label="产品服务">
                <el-checkbox-group v-model="serviceIds" @change="valChange">
                  <el-checkbox label="1">无忧退货</el-checkbox>
                  <el-checkbox label="2">快速退款</el-checkbox>
                  <el-checkbox label="3">免费包邮</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="4">
              <el-button type="primary" size="mini" @click="nextStep">下一步,填写库存信息</el-button>
            </el-col>
          </el-row>
        </el-card>
        <!-- 商品sku 信息 -->
        <el-card v-if="active===2" shadow="never">
          <div class="clearfix">
            <span>商品sku信息</span>
          </div>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="标题">
                <el-input v-model="form.product.detailTitle" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="副标题">
                <el-input v-model="form.product.subTitle" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <el-form-item label="画册图片">
                <el-upload
                  action="/lejuAdmin/material/uploadFileOss"
                  :headers="token"
                  list-type="picture-card"
                  :limit="5"
                  :on-success="uploadImg"
                >
                  <i slot="default" class="el-icon-plus" />
                  <div slot="file" slot-scope="{file}">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in" />
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                      >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,文件不超过5个</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="sku设置">
            <el-row v-if="colorList.length>=1" :gutter="20">
              <el-col :span="12">
                <span style="margin-right:20px;">颜色:</span>
                <span v-for="(item,index) in colorList" :key="item.name">
                  <el-checkbox v-model="item.isselect" :label="item.name" :indeterminate="false" />
                  <el-button type="text" style="color:red;margin:0 10px" @click="delColor(index)">删除</el-button>
                </span>
              </el-col>
            </el-row>
            <el-row v-if="sizeList.length>=1" :gutter="20">
              <el-col :span="12">
                <span style="margin-right:20px;margin-left:10px">大小:</span>
                <span v-for="(item,index) in sizeList" :key="item.name">
                  <el-checkbox v-model="item.isselect" :label="item.name" :indeterminate="false" />
                  <el-button type="text" style="color:red;margin:0 10px" @click="delSize(index)">删除</el-button>
                </span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-input v-model="color" clearable placeholder="颜色" size="normal" />
              </el-col>
              <el-col :span="3">
                <el-button @click="addColor">创建颜色选项</el-button>
              </el-col>
              <el-col :span="5">
                <el-input v-model="size" clearable placeholder="大小" size="normal" />
              </el-col>
              <el-col :span="3">
                <el-button @click="addSize">创建大小选项</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" size="mini" @click="addSkuList">生成sku列表</el-button>
                <el-button type="primary" size="mini" @click="addSkuRow">新增sku</el-button>
              </el-col>
            </el-row>
            <el-row v-if="form.pmsSkuStockList.length>0" :gutter="20" style="margin-top:30px">
              <el-col>
                <el-table :data="form.pmsSkuStockList" border stripe>
                  <el-table-column label="#" fixed type="index" width="50" />
                  <el-table-column label="图片" width="200" align="center">
                    <template slot-scope="scope">
                      <el-upload
                        class="avatar-uploader"
                        action="/lejuAdmin/material/uploadFileOss"
                        :headers="token"
                        :show-file-list="false"
                        :on-success="ele=>handleAvatarSuccessSku(ele.data.fileUrl,scope.$index)"
                      >
                        <img v-if="scope.row.pic" width="100" height="100" :src="scope.row.pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column label="颜色" prop="id" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.spData[0].value" placeholder="" />
                    </template>
                  </el-table-column>
                  <el-table-column label="大小" prop="id" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.spData[1].value" placeholder="" />
                    </template>
                  </el-table-column>
                  <el-table-column label="库存" prop="id" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.stock" placeholder="" />
                    </template>
                  </el-table-column>
                  <el-table-column label="预警库存" prop="id" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.lowStock" placeholder="" />
                    </template>
                  </el-table-column>
                  <el-table-column label="锁定库存" prop="id" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.lockStock" placeholder="" />
                    </template>
                  </el-table-column>
                  <el-table-column label="sku编码" prop="id" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.skuCode" placeholder="" />
                    </template>
                  </el-table-column>
                  <el-table-column label="价格" prop="id" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.price" placeholder="" />
                    </template>
                  </el-table-column>
                  <el-table-column label="销量" prop="id" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sale" placeholder="" />
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" prop="id" width="60" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="text" @click="delSku(scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

          </el-form-item>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="2">
              <el-button type="primary" plain size="mini" @click="preStep1">返回上一步</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="mini" @click="nextStep1">下一步,填写移动端详情</el-button>
            </el-col>
          </el-row>
        </el-card>
        <!-- 移动端详情信息 -->
        <el-card v-if="active===3" shadow="never">
          <div class="clearfix">
            <span>详情描述</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="商品详情">
                <Tinymce
                  v-model="form.product.detailMobileHtml"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item label="备注">
                <el-input
                  id=""
                  v-model="form.product.note"
                  type="textarea"
                  placeholder="备注"
                  rows="3"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="2">
              <el-button type="primary" plain size="mini" @click="preStep1">返回上一步</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="mini" @click="saveSkuList">提交保存</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { findAllBrandList, addProductAndSkus } from '@/api/goods/list/index'
import { getAllCategory } from '@/api/goods/classify/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  components: {
    Tinymce
  },
  mixins: [mix],
  data() {
    return {
      color: '',
      colorList: [
      ],
      sizeList: [
      ],
      size: '',
      albumPicsArr: [],
      leju: [],
      form: {
        'pmsSkuStockList': [

        ],
        'product': {
          albumPics: '',
          brandId: '',
          brandName: '',
          deleteStatus: 0,
          description: '',
          detailDesc: '',
          detailMobileHtml: '',
          detailTitle: '',
          keywords: '',
          lowStock: '',
          name: '',
          newStatus: '',
          note: '',
          promotionPrice: 0,
          originalPrice: '',
          pic: '',
          previewStatus: '',
          price: '',
          productAttributeCategoryId: '',
          productCategoryId: '',
          productCategoryName: '',
          productSn: '',
          promotionType: '',
          publishStatus: '',
          recommendStatus: '',
          serviceIds: '',
          sort: '',
          verifyStatus: '',
          weight: ''
        }
      },
      active: 1,
      brandList: [],
      serviceIds: [],
      dialogVisible: false,
      disabled: false,
      dialogImageUrl: ''
    }
  },
  created() {
    // 分类数据
    this.initKindList()
    // 品牌数据
    findAllBrandList()
      .then(res => {
        // console.log(res)
        this.brandList = res.data.items
      })
  },
  mounted() {

  },

  methods: {
    // 获取 分类数据
    initKindList() {
      getAllCategory()
        .then(res => {
        // console.log(res.data)
          var arr = res.data.items.map(ele => {
            return {
              ...ele.category,
              children: ele.children
            }
          })
          this.lejuData = arr
          this.leju = arr.find(ele => ele.name === '乐居').children
        })
    },
    // 获取 商品分类的 名称
    getCategoryName(e) {
      console.log(e)
      this.form.product.productCategoryName = this.leju.find(ele => ele.id === e).name
    },
    // 获取 品牌的名称
    getBrandName(e) {
      this.form.product.brandName = this.brandList.find(el => el.id === e).name
    },
    // 缩略图 上传成功
    handleAvatarSuccess(res) {
      // console.log(res)
      this.form.product.pic = res.data.fileUrl
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 产品服务
    valChange(e) {
      // console.log(e.join(','))
      this.form.product.serviceIds = e.join(',')
    },
    // 点击 下一步
    nextStep() {
      this.active = 2
    },
    // 点击 移动端详情下一步
    nextStep1() {
      this.active = 3
    },
    // 图片上传成功
    uploadImg(res) {
      // console.log(res.data)
      this.albumPicsArr.push(res.data.fileUrl)
      if (this.albumPicsArr.length >= 2) {
        this.form.product.albumPics = this.albumPicsArr.join(',')
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 点击 创建颜色 选项
    addColor() {
      // 筛选出 颜色相同的数据和 空数据 均 不添加
      if (this.color.length === 0) {
        return
      }
      if (this.colorList.find(el => el.name === this.color)) {
        return
      }
      var obj = {
        name: this.color,
        isselect: false
      }
      this.colorList.push(obj)
      this.color = ''
    },
    // 点击 创建大小 选项
    addSize() {
      // 筛选出 颜色相同的数据和 空数据 均 不添加
      if (this.size.length === 0) {
        return
      }
      if (this.sizeList.find(el => el.name === this.size)) {
        return
      }
      var obj = {
        name: this.size,
        isselect: false
      }
      this.sizeList.push(obj)
      this.size = ''
    },
    // 点击删除 颜色数据
    delColor(index) {
      this.colorList.splice(index, 1)
    },
    // 点击删除 大小数据
    delSize(index) {
      this.sizeList.splice(index, 1)
    },
    // 点击生成 sku 列表
    addSkuList() {
      // 拿出 选中的 数据
      var colorList = this.colorList.filter(ele => ele.isselect)
      var sizeList = this.sizeList.filter(ele => ele.isselect)
      // 遍历 选中的数据
      colorList.forEach(cl => {
        sizeList.forEach(se => {
          var data = [{ 'key': '颜色', 'value': cl.name }, { 'key': '大小', 'value': se.name }]
          var obj = {
            'lockStock': '', // 锁定库存 预留
            'lowStock': '', // 低库存预警  预留
            'pic': '', // sku封面图片
            'price': '', // 价格
            'promotionPrice': '', //  促销价格  预留
            'sale': '', // 销量 预留
            'skuCode': '', // sku编码
            'spData': data, //   [{"key":"颜色","value":"土豪金"},{"key":"大小","value":"128g"}]
            'stock': '', // 库存
            'modifyTime': '', // 更新时间 后台维护
            'createTime': '' // 后台自动生成
          }
          this.form.pmsSkuStockList.push(obj)
        })
      })
    },
    // 点击 新增 sku新增 一行
    addSkuRow() {
      var data = [{ 'key': '', 'value': '' }, { 'key': '', 'value': '' }]
      var obj = {
        'lockStock': '', // 锁定库存 预留
        'lowStock': '', // 低库存预警  预留
        'pic': '', // sku封面图片
        'price': '', // 价格
        'promotionPrice': '', //  促销价格  预留
        'sale': '', // 销量 预留
        'skuCode': '', // sku编码
        'spData': data, //   [{"key":"颜色","value":"土豪金"},{"key":"大小","value":"128g"}]
        'stock': '', // 库存
        'modifyTime': '', // 更新时间 后台维护
        'createTime': '' // 后台自动生成
      }
      this.form.pmsSkuStockList.push(obj)
    },
    // sku 图片上传
    handleAvatarSuccessSku(res, index) {
      console.log(res, index)
      this.form.pmsSkuStockList[index].pic = res
    },
    // 点击 删除 操作 按钮
    delSku(index) {
      this.form.pmsSkuStockList.splice(index, 1)
    },
    // 点击返回上一步
    preStep1() {
      this.active = this.active - 1
    },
    // 点击 提交保存
    saveSkuList() {
      this.form.product.promotionType = 0
      this.form.pmsSkuStockList.forEach(el => {
        el.spData = JSON.stringify(el.spData)
      })
      addProductAndSkus(this.form)
        .then(res => {
          const { success, message } = res
          if (success) {
            Message.success('添加成功')
            this.$router.push('/goods/list')
          } else {
            Message.error(message)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.head{
    width: 100%;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    .card{
        width: 50%;
        border: none;
    }

}
.content{
    margin: 30px;
    .clearfix{
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 10px;
        margin-bottom: 30px;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
