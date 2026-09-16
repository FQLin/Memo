// 主页面：Layout
// 这一层只管：步骤条、错误提示、根据 currentIndex 渲染对应组件。
// 业务流程完全在 calibrationFlow.js 里。

import { CalibrationProvider, useCalibrationState, useCalibrationDispatch, useFlow } from './flow/CalibrationContext'

// ============== 步骤条 ==============
function Stepper() {
  const state = useCalibrationState()
  const flow = useFlow()

  return (
    <div style={{ display: 'flex', gap: 8, padding: '20px 24px', borderBottom: '1px solid #eee' }}>
      {flow.map((step, i) => {
        const isCurrent = i === state.currentIndex
        const isDone = i < state.currentIndex
        return (
          <div
            key={step.id}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              background: isCurrent ? '#1677ff' : isDone ? '#52c41a' : '#f0f0f0',
              color: isCurrent || isDone ? '#fff' : '#999',
              fontSize: 14,
            }}
          >
            {i + 1}. {step.title}
          </div>
        )
      })}
    </div>
  )
}

// ============== 错误条 ==============
function ErrorBar() {
  const state = useCalibrationState()
  const dispatch = useCalibrationDispatch()
  if (!state.error) return null

  return (
    <div
      style={{
        background: '#fff2f0',
        border: '1px solid #ffccc7',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ color: '#cf1322' }}>⚠️ {state.error}（已自动回到第一步）</span>
      <button onClick={() => dispatch({ type: 'RESET' })}>关闭</button>
    </div>
  )
}

// ============== 主页面（核心：根据 currentIndex 渲染对应步骤） ==============
function CalibrationContent() {
  const state = useCalibrationState()
  const flow = useFlow()
  const CurrentStepComponent = flow[state.currentIndex].component

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Stepper />
      <ErrorBar />
      <div style={{ padding: 32, background: '#fff', margin: 24, borderRadius: 8 }}>
        <CurrentStepComponent />
      </div>
    </div>
  )
}

// ============== 导出：包一层 Provider ==============
export default function CalibrationPage() {
  return (
    <CalibrationProvider>
      <CalibrationContent />
    </CalibrationProvider>
  )
}
