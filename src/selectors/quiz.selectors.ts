import { createSelector } from "@reduxjs/toolkit";
import { MCQsSelector, selectedMCQIdSelector } from "./root.selectors";

export const selectedMCQSelector = createSelector(
    selectedMCQIdSelector,
    MCQsSelector,
    (MCQId, MCQs) => MCQId ? MCQs?.find(q => q.id === MCQId) : undefined
);

export {}