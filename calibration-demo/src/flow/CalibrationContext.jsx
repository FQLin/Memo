// Context + useReducer
// 整个标定页面的"大脑"——所有步骤间共享的数据、当前在哪一步，全部走这里。
//
// 分工：
//   reducer      →  流转规则本身（推进 / 失败回第一步）
//   useNextStep  →  执行流转的唯一入口（跑 onNext、派发 action）
//   步骤组件      →  只管自己的表单，调 next(payload) 就完事

import { createContext, useContext, useReducer } from 'react'
import calibrationFlow from './calibrationFlow'

const StateContext = createContext(null)
const DispatchContext = createContext(null)

const initialState = {
  currentIndex: 0,                  // 当前第几步（0 开始）
  ctx: {},                          // 步骤间共享的业务数据（每次进来都重置！）
  loading: false,                   // 当前是否在跑 onNext
  error: null,                      // 全局错误
}

function reducer(state, action) {
  switch (action.type) {
    case 'GO_NEXT_START':
      return { ...state, loading: true, error: null }

    case 'GO_NEXT_SUCCESS':
      // 一次 dispatch 把：ctx 合并、index 推进、loading 解除
      // ——全做完。这就是"丝滑流转"：不可能只改一半。
      return {
        ...state,
        ctx: { ...state.ctx, ...action.patch },
        currentIndex: state.currentIndex + 1,
        loading: false,
        error: null,
      }

    case 'GO_NEXT_FAIL':
      // ★ 任何一步出错：回到第一步，清空数据。
      //   整条业务规则只存在于这一处，12 步都一样。
      return { ...initialState, error: action.error }

    case 'RESET':
      // 兜底：手动重置
      return { ...initialState }

    default:
      return state
  }
}

export function CalibrationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // 拆成两个 Context：dispatch 的引用永远稳定，
  // 只触发操作、不读状态的组件就不会因为 ctx 变化而重渲染。
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

// 自定义 hook：用错了会立刻报错，方便排查
export function useCalibrationState() {
  const ctx = useContext(StateContext)
  if (ctx === null) throw new Error('useCalibrationState 必须在 CalibrationProvider 内使用')
  return ctx
}

export function useCalibrationDispatch() {
  const ctx = useContext(DispatchContext)
  if (ctx === null) throw new Error('useCalibrationDispatch 必须在 CalibrationProvider 内使用')
  return ctx
}

// 暴露 flow 配置（步骤条要遍历全部步骤）
export function useFlow() {
  return calibrationFlow
}

// 当前这一步的配置对象（标题、组件、onNext）
export function useCurrentStep() {
  const { currentIndex } = useCalibrationState()
  return calibrationFlow[currentIndex]
}

// ★★ 流转逻辑的唯一实现处 ★★
// 步骤组件不再各写一遍 try/catch，也不再知道自己失败了会去哪。
export function useNextStep() {
  const state = useCalibrationState()
  const dispatch = useCalibrationDispatch()
  const currentStep = calibrationFlow[state.currentIndex]

  return async (payload = {}) => {
    if (!currentStep.onNext) return            // 最后一步没有 onNext，直接忽略

    dispatch({ type: 'GO_NEXT_START' })
    try {
      // 第二个参数把 ctx 传给配置，接口才能拿到前面步骤的产出
      const patch = await currentStep.onNext(payload, state.ctx)
      dispatch({ type: 'GO_NEXT_SUCCESS', patch })
    } catch (e) {
      dispatch({ type: 'GO_NEXT_FAIL', error: e.message })
    }
  }
}
