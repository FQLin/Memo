// 第 4 步：完成
// 拿所有 ctx 数据展示

import { useCalibrationState, useCalibrationDispatch } from '../flow/CalibrationContext'

export default function Step4Done() {
  const state = useCalibrationState()
  const dispatch = useCalibrationDispatch()

  return (
    <div>
      <h2>✅ 标定完成</h2>
      <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, marginTop: 16 }}>
        {JSON.stringify(state.ctx, null, 2)}
      </pre>
      <button
        onClick={() => dispatch({ type: 'RESET' })}
        style={{ marginTop: 16, padding: '8px 20px' }}
      >
        重新开始
      </button>
    </div>
  )
}
