import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeBoard: null,
  activeBoardList: [],
  allBoards: [],
};

const replaceBoards = (state, action) => {
  const newState = {
    ...state,
    allBoards: action.payload.boards,
  };
  return newState;
};

const replaceActiveBoardList = (state, action) => {
  const newState = {
    ...state,
    activeBoardList: action.payload,
  };
  return newState;
};

const updateTask = (state, action) => {
  const newCard = action.payload;
  const listId = newCard.listId;
  const list = state.activeBoard.find((list) => list._id === listId);

  return state;
};

const changeActiveBoard = (state, action) => {
  return {
    ...state,
    activeBoard: action.payload,
  };
};

const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    changeActiveBoard,
    replaceBoards,
    updateTask,
    replaceActiveBoardList,
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice;
