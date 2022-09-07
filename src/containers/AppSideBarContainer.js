import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AllBoards from "../components/appSideBar/AllBoards";
import AppSideBar from "../components/appSideBar/AppSideBar";
import CreateNewBoard from "../components/appSideBar/CreateNewBoard";
import SideBarLogo from "../components/appSideBar/SideBarLogo";
import ThemeSwitch from "../components/appSideBar/ThemeSwitch";
import Wrapper from "../components/common/Wrapper/Wrapper";
import { fetchActiveBoard } from "../store/board-actions";

export default function AppSideBarContainer({ setIsDark }) {
  const allBoards = useSelector((state) => state.board.allBoards);
  const dispatch = useDispatch();
  const changeActiveBoardHandler = (boardId) => {
    dispatch(fetchActiveBoard(boardId));
  };
  const themeHandler = () => {
    setIsDark((prev) => !prev);
  };

  const createNewBoardHandler = () => {};
  return (
    <AppSideBar>
      <Wrapper direction="column">
        <SideBarLogo />
        <AllBoards
          dataSource={allBoards}
          onBoardClick={changeActiveBoardHandler}
        />
        <CreateNewBoard handler={createNewBoardHandler} />
      </Wrapper>
      <Wrapper width="100%">
        <ThemeSwitch onThemeChange={themeHandler} />
      </Wrapper>
    </AppSideBar>
  );
}
