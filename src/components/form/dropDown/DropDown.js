import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  DropDownList,
  DropDownItem,
  Pane,
  CurrentItem,
  Image,
} from "./styles";
import dropIcon from "../../../assets/icons/arrow-drop-down.svg";

export default function DropDown({
  dataSource,
  onItemClicked,
  shouldHide,
  width,
  initialValue,
}) {
  const [value, setValue] = useState();
  const [clickState, setClickState] = useState(false);
  const containerRef = useRef(null);
  const onClickHandler = () => {
    setClickState((prev) => !prev);
  };

  useEffect(() => {
    setValue(initialValue ? initialValue : dataSource[0]?.value);
  }, [dataSource, initialValue]);

  const onItemClickHandler = (item) => {
    setValue(item.value);
    onItemClicked(item);
    setClickState((prev) => !prev);
  };

  return (
    <Container shouldHide={shouldHide} ref={containerRef} width={width}>
      <Pane
        direction="row"
        justify="space-between"
        margin="1em 1em 0.5em 1em"
        onClick={onClickHandler}
      >
        <CurrentItem>{value}</CurrentItem>
        <Image src={dropIcon} alt="" />
      </Pane>
      {clickState && (
        <DropDownList>
          {dataSource.map((item) => {
            return (
              <DropDownItem
                key={item.id}
                onClick={onItemClickHandler.bind(null, item)}
              >
                {item.value}
              </DropDownItem>
            );
          })}
        </DropDownList>
      )}
    </Container>
  );
}
