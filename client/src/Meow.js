import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS } from "./constants";
import { useInput } from "./custom Hooks/useInput";

const Meow = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { reset } = useInput("");
  const [statusData, setStatusData] = useState("");
  const handleMeow = async (ev) => {
    ev.preventDefault();

    await fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: statusData }),
    });
    await setStatusData("");
  };

  return (
    <Wrapper onSubmit={handleMeow}>
      <Container>
        <UserAvatar src={currentUser?.profile?.avatarSrc} />
        <Input
          type="text"
          //   {...bind}
          value={statusData}
          placeholder="Want to meow something?"
          onChange={(e) => {
            setStatusData(e.target.value);
          }}
        />
      </Container>

      <MeowBtn type="submit" value="Meow" />
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 15px;
`;

const Input = styled.textarea`
  height: 200px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  text-align: left;
  resize: none;
  margin-top: 10px;
  border: none;
  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
  }
`;

const MeowBtn = styled.input`
  align-self: flex-end;
  width: fit-content;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 16px;
  font-weight: bolder;
  border-radius: 20px;
  padding: 0 20px;
`;

const Divider = styled.div`
  margin-top: 10px;
  border: 4px solid lightgrey;
`;

export default Meow;
