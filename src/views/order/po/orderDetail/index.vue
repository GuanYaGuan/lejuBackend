<template>
  <div class="content">
    <el-card v-if="orderList.orderBase" shadow="never">
      <div class="clearfix">
        <el-steps :active="orderList.orderBase.status" align-center>
          <el-step
            title="待付款"
            :description="orderList.orderBase.createTime"
          />
          <el-step
            title="待发货"
            :description="orderList.orderBase.paymentTime"
          />
          <el-step
            title="已发货"
            :description="orderList.orderBase.deliveryTime"
          />
          <el-step
            title="已完成"
            :description="orderList.orderBase.modifyTime"
          />
          <el-step title="退货" :description="orderList.orderBase.finishTime" />
        </el-steps>
      </div>
      <div class="clearfix">
        <h4>
          订单信息:
          <el-button
            v-if="orderList.orderBase.status == 0"
            type="danger"
            size="mini"
            plain
          >待付款</el-button>
          <el-button
            v-if="orderList.orderBase.status == 1"
            size="mini"
            type="warning"
            plain
          >
            待发货
          </el-button>
          <el-button
            v-if="orderList.orderBase.status == 2"
            size="mini"
            type="primary"
            plain
          >
            已发货
          </el-button>
          <el-button
            v-if="orderList.orderBase.status == 3"
            size="mini"
            type="danger"
            plain
          >
            已完成
          </el-button>
          <el-button
            v-if="orderList.orderBase.status == 4"
            size="mini"
            type="danger"
            plain
          >
            退货
          </el-button>
          <el-button
            v-if="orderList.orderBase.status == 5"
            size="mini"
            type="danger"
            plain
          >
            无效订单
          </el-button>
        </h4>
        <el-row :gutter="20">
          <el-col :span="6">
            订单金额:<span style="color: red">{{
              orderList.orderBase.payAmount
            }}</span>
          </el-col>
          <el-col :span="6">
            订单编号:{{ orderList.orderBase.orderSn }}
          </el-col>
          <el-col :span="6">
            用户账户:{{ orderList.orderBase.memberUsername }}
          </el-col>
          <el-col :span="6"> 订单备注:{{ orderList.orderBase.note }} </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="6">
            下单时间:<span>{{ orderList.orderBase.createTime }}</span>
          </el-col>
          <el-col :span="6">
            付款时间:{{ orderList.orderBase.paymentTime }}
          </el-col>
          <el-col :span="6">
            发货时间:{{ orderList.orderBase.deliveryTime }}
          </el-col>
          <el-col :span="6">
            收货时间:{{ orderList.orderBase.modifyTime }}
          </el-col>
        </el-row>
      </div>
      <div class="clearfix">
        <h4>收货人信息:</h4>
        <el-row :gutter="20">
          <el-col :span="6">
            收货人:<span>{{ orderList.orderBase.receiverName }}</span>
          </el-col>
          <el-col :span="6">
            用户人姓名:{{ orderList.orderBase.memberUsername }}
          </el-col>
          <el-col :span="6">
            手机号码:{{ orderList.orderBase.receiverPhone }}
          </el-col>
          <el-col :span="6">
            邮政编码:{{ orderList.orderBase.receiverPostCode }}
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="6">
            省市区:<span>{{ orderList.orderBase.receiverProvince
            }}{{ orderList.orderBase.receiverCity
            }}{{ orderList.orderBase.receiverRegion }}</span>
          </el-col>
          <el-col :span="6">
            详细地址:{{ orderList.orderBase.receiverDetailAddress }}
          </el-col>
        </el-row>
      </div>
      <div class="clearfix">
        <h4>商品信息</h4>
        <el-table :data="orderList.orderItems" border stripe="">
          <el-table-column label="商品名称" prop="productName" />
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img
                :src="scope.row.productPic"
                width="100"
                height="100"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column label="是否退货">
            <template slot-scope="scope">
              <span v-if="scope.row.isReturn == 0">否</span>
              <span v-if="scope.row.isReturn == 1">是</span>
            </template>
          </el-table-column>
          <el-table-column label="品牌" prop="productBrand" />
          <el-table-column label="价格" prop="productPrice" />
          <el-table-column label="数量" prop="productQuantity" />
          <el-table-column label="小计" prop="totalPrice" />
        </el-table>
        <h4>费用信息:</h4>
        <el-row :gutter="20">
          <el-col :span="6">
            运费金额:<span style="color: red">0</span>
          </el-col>
          <el-col :span="6">
            订单总金额:<span style="color: red">{{
              orderList.orderBase.totalAmount
            }}</span>
          </el-col>
          <el-col :span="6">
            实际金额:<span style="color: red">{{
              orderList.orderBase.payAmount
            }}</span>
          </el-col>
          <el-col :span="6">
            促销优惠金额:<span style="color: red">0</span>
          </el-col>
        </el-row>
      </div>
      <div class="clearfix">
        <h4>
          物流信息:{{ orderList.orderBase.deliveryCompany
          }}{{ orderList.orderBase.deliverySn }}
        </h4>
        <div v-if="orderList.orderBase.status===1" class="sureTo">
          <el-form :model="forms" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="物流公司">
                  <el-select v-model="forms.deliveryCompany" placeholder="请选择快递公司">
                    <el-option v-for="(item,index) in company" :key="index" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="物流单号">
                  <el-input v-model="forms.deliverySn" placeholder="请填写物流单号" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" :offset="8" style="display:flex;justify-content: center;margin-top:20px;">
                <el-button type="primary" size="small" @click="sendDoneOrder">
                  确认发货
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div v-if=" orderList.orderBase.status==2||orderList.orderBase.status==3||orderList.orderBase.status==4" class="table-box">
          <el-table :data="list" border stripe>
            <el-table-column label="时间" prop="date" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="备注" prop="note" />
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { orderDetail, sendDone } from '@/api/order/po/index'
export default {

  data() {
    return {
      orderList: [],
      list: [
        {
          date: '2015-03-06 21:16:58',
          status: '深圳市横岗速递营销部已收件',
          note: ' '
        },
        {
          date: '2015-03-07 14:25:00',
          status: '离开深圳市 发往广州市',
          note: ' '
        },
        {
          date: '2015-03-08 00:17:00',
          status: '	到达广东速递物流公司广航中心处理中心（经转）',
          note: ' '
        },
        {
          date: '2015-03-08 01:15:00',
          status: '离开广州市 发往北京市（经转）',
          note: ' '
        },
        {
          date: '2015-03-09 09:01:00',
          status: '到达北京黄村转运站处理中心（经转）',
          note: ' '
        },
        {
          date: '2015-03-09 18:39:00',
          status: '离开北京市 发往呼和浩特市（经转）',
          note: ' '
        },
        {
          date: '2015-03-10 18:06:00',
          status: '到达 呼和浩特市 处理中心',
          note: ''
        },
        {
          date: '2015-03-11 09:53:48',
          status: '呼和浩特市邮政速递物流分公司金川揽投部安排投递',
          note: '投递员姓名：安长虹;联系电话：18047140142'
        }
      ],
      company: [
        '顺丰快递',
        '中国邮政',
        '韵达快递',
        '中通快递',
        '极兔兔快递',
        '圆通快递',
        '京东快递'
      ],
      forms: {
        deliveryCompany: '',
        deliverySn: ''
      }
    }
  },
  created() {
    orderDetail(this.$route.query.id)
      .then(res => {
        console.log(res.data)
        this.orderList = res.data.orderDetail
      })
  },
  mounted() {

  },

  methods: {
    // 点击 确认发货
    sendDoneOrder() {
      sendDone({
        orderId: this.orderList.orderBase.id,
        deliverySn: this.forms.deliverySn,
        deliveryCompany: this.forms.deliveryCompany
      })
        .then(res => {
          const { success } = res
          if (success) {
            this.$router.push('/order/po')
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
