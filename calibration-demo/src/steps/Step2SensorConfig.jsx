// 第 2 步：传感器配置
// 读上一步的产出用 useCalibrationState().ctx，提交用 useNextStep()。

import { useState } from 'react'
import { useCalibrationState, useCurrentStep, useNextStep } from '../flow/CalibrationContext'

export default function Step2SensorConfig() {
  const { ctx, loading } = useCalibrationState()
  const currentStep = useCurrentStep()
  const next = useNextStep()

  const [sensors, setSensors] = useState(
    ctx.sensors || ['温度传感器', '压力传感器']
  )

  return (
    <div>
      <h2>{currentStep.title}</h2>
      <p style={{ color: '#666' }}>
        已选车型：<b>{ctx.vehicleName}</b>（从 ctx 自动拿到）
      </p>
      <div style={{ marginTop: 16 }}>
        <p>当前传感器：</p>
        <ul>
          {sensors.map(s => <li key={s}>{s}</li>)}
        </ul>
        <button onClick={() => setSensors([...sensors, `传感器-${sensors.length + 1}`])}>
          + 添加传感器
        </button>
      </div>
      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => next({ sensors })}
          disabled={loading}
          style={{ padding: '8px 20px' }}
        >
          {loading ? '提交中...' : '下一步'}
        </button>
      </div>
    </div>
  )
}
