// 这是整个项目的灵魂：
// 流程不是一个组件，而是一份"配置数据"。
// 加步骤 = 加一个对象；删步骤 = 删一个对象。组件代码不用动。
//
// 每个步骤对象长这样：
//   {
//     id:          唯一标识
//     title:       步骤名（Stepper 上显示）
//     component:   这一步渲染哪个组件
//     onNext:      点"下一步"时做什么（可选，用于写接口、校验）
//   }
//
// onNext 的签名是 (payload, ctx) => Promise<patch>
//   payload  这一步自己的表单数据，由步骤组件调 next(payload) 传进来
//   ctx      前面所有步骤累积的数据，由 useNextStep 自动传入（不用白不用）
//   返回值    会合并进 ctx，传给后面所有步骤；抛错则整个流程回到第一步

import Step1SelectVehicle from '../steps/Step1SelectVehicle'
import Step2SensorConfig from '../steps/Step2SensorConfig'
import Step3DynamicCalibration from '../steps/Step3DynamicCalibration'
import Step4Done from '../steps/Step4Done'

const calibrationFlow = [
  {
    id: 'select-vehicle',
    title: '选择车型',
    component: Step1SelectVehicle,
    // onNext 返回的对象会合并进 ctx，传给后面所有步骤
    onNext: async (payload) => {
      // 这里模拟请求接口
      await new Promise(r => setTimeout(r, 300))
      if (!payload.vehicleId) throw new Error('请选择车型')
      return { vehicleId: payload.vehicleId, vehicleName: payload.vehicleName }
    },
  },
  {
    id: 'sensor-config',
    title: '传感器配置',
    component: Step2SensorConfig,
    onNext: async (payload) => {
      await new Promise(r => setTimeout(r, 300))
      if (!payload.sensors || payload.sensors.length === 0) {
        throw new Error('请至少配置一个传感器')
      }
      return { sensors: payload.sensors }
    },
  },
  {
    id: 'dynamic-calibration',
    title: '动态标定',
    component: Step3DynamicCalibration,
    // ★ 这一步演示 ctx 的用法：标定接口需要前面步骤的产出
    onNext: async (payload, ctx) => {
      await new Promise(r => setTimeout(r, 500))

      // 真实写法就是这样，ctx 由 useNextStep 自动传进来：
      //   await api.dynamicCalibration({ vehicleId: ctx.vehicleId, sensors: ctx.sensors })
      if (!ctx.vehicleId) throw new Error('缺少车型信息')

      // 模拟：标定失败
      if (Math.random() < 0.3) throw new Error('标定超时，请重试')
      return { calibrationResult: 'success' }
    },
  },
  {
    id: 'done',
    title: '完成',
    component: Step4Done,
    // 最后一步没有 onNext
  },
]

export default calibrationFlow
