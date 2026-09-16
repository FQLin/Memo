// 第 3 步：动态标定
// 故意有 30% 概率失败，用来演示"任何错误回到第一步"。
//
// 注意这个组件里没有任何 try/catch、没有任何 dispatch ——
// 失败处理在 useNextStep 里，规则本身在 reducer 里。

import { useCalibrationState, useCurrentStep, useNextStep } from '../flow/CalibrationContext'

export default function Step3DynamicCalibration() {
  const { ctx, loading } = useCalibrationState()
  const currentStep = useCurrentStep()
  const next = useNextStep()

  return (
    <div>
      <h2>{currentStep.title}</h2>
      <p style={{ color: '#666' }}>
        标定参数：{ctx.sensors?.length} 个传感器 / 车型 {ctx.vehicleName}
      </p>
      <p style={{ color: '#999', fontSize: 13 }}>
        （这一步有 30% 概率失败，模拟真实场景的接口异常）
      </p>
      <div style={{ marginTop: 24 }}>
        <button onClick={() => next()} disabled={loading} style={{ padding: '8px 20px' }}>
          {loading ? '标定中...' : '开始标定'}
        </button>
      </div>
    </div>
  )
}
