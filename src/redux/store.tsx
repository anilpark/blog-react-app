import {applyMiddleware, combineReducers, compose, createStore, Action} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import postsReducer from "./posts-reducer";

const rootReducer = combineReducers({
  posts: postsReducer
})

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store