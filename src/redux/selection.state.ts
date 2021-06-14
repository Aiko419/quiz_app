import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectionState {
    selectedMCQId?: number
}

const initialState: SelectionState = {};

function clearSelectionReducer(state: SelectionState, _: PayloadAction<undefined>) {
    state.selectedMCQId = undefined;
}

function selectMCQReducer(state: SelectionState, action: PayloadAction<number>) {
    state.selectedMCQId = action.payload;
}

const { actions, reducer } = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        clearSelection: clearSelectionReducer,
        selectMCQ: selectMCQReducer,
    },
});

export const {
    clearSelection, selectMCQ
} = actions;

export { reducer as SelectionReducer };