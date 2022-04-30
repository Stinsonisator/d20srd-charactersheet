import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RenderConfig {
	key: string;
	component: JSX.Element;
}

interface GlobalRenderState {
	components: Record<string, JSX.Element>;
}

const initialState: GlobalRenderState = { components: {} };

const globalRenderSlice = createSlice({
	name: 'globalRander',
	initialState,
	reducers: {
		globalRender(state, action: PayloadAction<RenderConfig>) {
			if (!state.components[action.payload.key]) {
				state.components[action.payload.key] = action.payload.component;
			}
		},
		globalDerender(state, action: PayloadAction<string>) {
			if (state.components[action.payload]) {
				delete state.components[action.payload];
			}
		}
	}
});

export const { globalRender, globalDerender } = globalRenderSlice.actions;
export default globalRenderSlice.reducer;
