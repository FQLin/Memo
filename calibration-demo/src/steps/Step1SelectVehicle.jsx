// 第 1 步：选择车型
// 组件只管自己的表单状态，"提交 / 推进 / 失败回第一步"全部交给 useNextStep。

import { useState } from 'react'
import { useCalibrationState, useCurrentStep, useNextStep } from '../flow/CalibrationContext'

export default function Step1SelectVehicle() {
  const { loading } = useCalibrationState()
  const currentStep = useCurrentStep()
  const next = useNextStep()

  // 这步自己的局部表单状态，不进 ctx。
  // 注意不从 ctx 初始化：失败重置后 ctx 已清空，
  // 而停留在本步失败时组件不卸载，用户输入得以保留。
  const [vehicleId, setVehicleId] = useState('')

  return (
    <div>
      <h2>{currentStep.title}</h2>
      <div style={{ marginTop: 16 }}>
        <label>
          车型 ID：
          <input
            value={vehicleId}
            onChange={e => setVehicleId(e.target.value)}
            placeholder="例如：BMW-X5-2024"
            style={{ marginLeft: 8, padding: 6 }}
          />
        </label>
      </div>
      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => next({ vehicleId, vehicleName: 'BMW X5' })}
          disabled={loading || !vehicleId}
          style={{ padding: '8px 20px', cursor: 'pointer' }}
        >
          {loading ? '提交中...' : '下一步'}
        </button>
      </div>
    </div>
  )
}
