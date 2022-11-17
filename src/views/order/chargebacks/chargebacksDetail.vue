<template>
  <div class="content">
    <el-card v-if="returnOrder[0]" shadow="never">
      <div class="clearfix">
        <!-- status (string, optional): 申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <span>订单信息:
              <el-button
                v-if="returnOrder[0].status == 0"
                type="danger"
                size="mini"
                plain
              >待处理</el-button>
              <el-button
                v-if="returnOrder[0].status == 1"
                size="mini"
                type="warning"
                plain
              >
                退货中
              </el-button>
              <el-button
                v-if="returnOrder[0].status == 2"
                size="mini"
                type="primary"
                plain
              >
                已完成
              </el-button>
              <el-button
                v-if="returnOrder[0].status == 3"
                size="mini"
                type="danger"
                plain
              >
                已拒绝
              </el-button>
            </span>
          </el-col>
        </el-row>

        <el-row
          :gutter="20"
          style="font-size: 14px; margin-top: 20px"
          type="flex"
          justify="space-between"
        >
          <el-col style="width: 25%">
            订单编号: {{ returnOrder[0].orderSn }}
            <el-button
              type="text"
              size="small"
              style="margin-left: 10px"
            >查看订单详情</el-button>
          </el-col>
          <el-col style="width: 20%; align-items: center; display: flex">
            退单人姓名:{{ returnOrder[0].returnName }}
          </el-col>
          <el-col style="width: 20%; align-items: center; display: flex">
            退单理由:{{ returnOrder[0].reason }}
          </el-col>
          <el-col style="width: 20%; align-items: center; display: flex">
            退单描述:{{ returnOrder[0].description }}
          </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 14px; margin-top: 20px">
          <el-col style="width: 20%; align-items: center; display: flex">
            申请时间:{{ returnOrder[0].createTime }}
          </el-col>
        </el-row>
      </div>
      <div class="clearfix">
        <el-row :gutter="20">
          <el-col :span="8">
            <h4>退货商品</h4>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-table :data="returnOrder" border stripe>
              <el-table-column label="商品图片" align="center">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.productPic"
                    width="100"
                    height="100"
                    alt=""
                  >
                </template>
              </el-table-column>
              <el-table-column label="商品描述" align="center">
                <template slot-scope="scope">
                  <p>{{ scope.row.productName }}</p>
                  <p>品牌:{{ scope.row.productBrand }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="商品价格"
                align="center"
                prop="productPrice"
              />
              <el-table-column label="商品属性" align="center">
                <template slot-scope="scope">
                  <span
                    v-for="(item, index) in scope.row.productAttr"
                    :key="index"
                  >{{ item.key }}:{{ item.value }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="商品数量"
                prop="productCount"
              />
              <el-table-column
                align="center"
                label="总计"
                prop="returnAmount"
              />
            </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <h4>用户信息:</h4>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <div>联系人:{{ returnOrder[0].returnName }}</div>
          </el-col>
          <el-col :span="10">
            <div>联系电话:{{ returnOrder[0].returnPhone }}</div>
          </el-col>
        </el-row>
      </div>
      <div v-if="returnOrder[0].status === 0" class="show-set">
        <div class="clearfix">
          <el-row :gutter="20">
            <el-col :span="8">
              <h4>费用信息:</h4>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <div>
                退单金额:<span style="color: red">{{
                  returnOrder[0].productPrice
                }}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div>运费金额:<span style="color: red">0</span></div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:20px">
            <el-form :model="form" label-width="80px">
              <el-col :span="6">
                <el-form-item label="退款金额">
                  <el-input-number v-model="form.returnAmount" label="" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="处理人">
                  <el-input v-model="form.handleMan" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备注">
                  <el-input v-model="form.handleNote" placeholder="" />
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="8">
              <el-button size="small" @click="unSure">拒绝退货</el-button>
              <el-button
                size="small"
                type="primary"
                @click="sure"
              >同意退货</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div
        v-if="
          returnOrder[0].status === 1 ||
            returnOrder[0].status === 2 ||
            returnOrder[0].status === 3
        "
        class="show-set"
      >
        <div class="clearfix">
          <el-row :gutter="20">
            <el-col :span="8">
              <h4>费用信息:</h4>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <div>退单金额:<span style="color: red">0</span></div>
            </el-col>
            <el-col :span="10">
              <div>运费金额:<span style="color: red">0</span></div>
            </el-col>
          </el-row>
        </div>
        <div class="clearfix">
          <el-row :gutter="20">
            <el-col :span="8">
              <h4>处理结果:</h4>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                处理人:<span>{{ returnOrder[0].handleMan }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                处理备注:<span>{{ returnOrder[0].handleNote }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                处理时间:<span>{{ returnOrder[0].handleTime }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="clearfix">
          <el-row :gutter="20">
            <el-col :span="8">
              <h4>收货信息:</h4>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div>
                退单收货人:<span>{{ returnOrder[0].receiveMan }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                退单收货备注:<span>{{ returnOrder[0].receiveNote }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                退单收货时间:<span>{{ returnOrder[0].receiveTime }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  orderReturn,
  agreeApply,
  rejectApply
} from '@/api/order/chargebacks/index'
export default {
  data() {
    return {
      returnOrder: [],
      form: {
        returnAmount: '',
        handleMan: '',
        handleNote: ''
      }
    }
  },
  created() {
    // console.log(this.$route.query.id)
    this.returnOrder = []
    orderReturn(this.$route.query.id).then((res) => {
      // console.log(res.data.orderReturnApply)
      res.data.orderReturnApply.productAttr = JSON.parse(
        res.data.orderReturnApply.productAttr
      )
      this.returnOrder.push(res.data.orderReturnApply)
    })
  },
  mounted() {},

  methods: {
    // 点击 拒绝退货
    unSure() {
      rejectApply(this.returnOrder[0].id, {
        id: this.returnOrder[0].id,
        handleMan: this.form.handleMan,
        handleNote: this.form.handleNote
      })
        .then(res => {
          const { success } = res
          if (success) {
            this.$router.push('Chargebacks')
          }
        })
    },
    // 同意退货
    sure() {
      agreeApply(this.returnOrder[0].id, {
        id: this.returnOrder[0].id,
        returnAmount: this.form.returnAmount,
        handleMan: this.form.handleMan,
        handleNote: this.form.handleNote
      })
        .then(res => {
          const { success } = res
          if (success) {
            this.$router.push('Chargebacks')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
  .clearfix {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 30px;
  }
}
</style>
