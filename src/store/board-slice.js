import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Routes } from "../constants/constants";

const initialState = {
  activeBoard: null,
  allBoards: [],
};

const replaceBoards = (state, action) => {
  const newState = {
    ...state,
    allBoards: action.payload.boards,
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
  reducers: { changeActiveBoard, replaceBoards, updateTask },
});

export const updateCardData = (payload) => {
  return async (dispatch) => {
    const updateHandler = async () => {
      const response = await axios.put(Routes.CARD, {
        title: payload.card.title,
        description: payload.card.description,
        checkList: payload.card.checkList,
        listId: payload.card.listId,
        cardId: payload.card._id,
      });
      if (response.status === 200) {
      }
    };

    try {
      await updateHandler();
      dispatch(fetchActiveBoard(payload.card.boardId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchActiveBoard = (boardId) => {
  return async (dispatch) => {
    const fetchBoardHandler = async () => {
      return await axios.get(Routes.BOARD + boardId);
    };
    try {
      const response = await fetchBoardHandler();
      dispatch(boardActions.changeActiveBoard(response.data[0]));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAllBoards = () => {
  return async (dispatch) => {
    const getBoards = async () => {
      return await axios.get(Routes.BOARD);
    };
    try {
      const response = await getBoards();
      dispatch(boardActions.replaceBoards(response.data));
      const boardId = response.data.boards[0]._id;
      dispatch(fetchActiveBoard(boardId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const boardActions = boardSlice.actions;

export default boardSlice;
