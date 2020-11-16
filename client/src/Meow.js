import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS } from "./constants";
import { useInput } from "./custom Hooks/useInput";
import { ErrorPage } from "./ErrorPage";

const maxChars = 280;

const Meow = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [statusData, setStatusData] = useState("");
  const [charCount, setCharCount] = useState({ charLeft: maxChars });
  const [disableBtn, setDisableBtn] = useState(false);
  const [CountColor, setCountColor] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const handleMeow = async (ev) => {
    ev.preventDefault();
    try {
      await fetch("/api/tweet", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: statusData }),
      });
      await setStatusData("");
    } catch (err) {
      setErrorStatus(true);
    }
  };

  //   Handling character count and color changes

  const handleCount = (event) => {
    let textInput = event.target.value;
    setCharCount({ charLeft: maxChars - textInput.length });
  };

  useEffect(() => {
    if (charCount.charLeft <= 55 && charCount.charLeft > 0) {
      setCountColor("orange");
      setDisableBtn(false);
    } else if (charCount.charLeft === maxChars) {
      setDisableBtn(true);
    } else if (charCount.charLeft <= 0) {
      setCountColor("red");
      setDisableBtn(true);
    } else {
      setCountColor("");
      setDisableBtn(false);
    }
  }, [charCount]);
  // handling key press
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      handleMeow();
    }
  };

  return (
    <>
      {errorStatus ? (
        <ErrorPage />
      ) : (
        <Wrapper onSubmit={handleMeow}>
          <Container>
            <UserAvatar src={currentUser?.profile?.avatarSrc} />
            <Input
              type="text"
              value={statusData}
              placeholder="Want to meow something?"
              onChange={(e) => {
                setStatusData(e.target.value);
                handleCount(e);
              }}
            />
          </Container>
          <Footer>
            <Count style={{ color: `${CountColor}` }}>
              {charCount.charLeft}
            </Count>
            <MeowBtn
              type="submit"
              value="Meow"
              disabled={disableBtn}
              style={!disableBtn ? { opacity: 1 } : { opacity: 0.5 }}
              onKeyDown={handleKeyDown}
            />
          </Footer>

          <Divider />
        </Wrapper>
      )}
    </>
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
  cursor: pointer;
`;

const Count = styled.div`
  align-self: center;
  margin-right: 5px;
  color: grey;
  font-size: 16px;
`;
const Footer = styled.div`
  display: flex;
  width: fit-content;
  align-self: flex-end;
`;
const Divider = styled.div`
  margin-top: 10px;
  border: 4px solid lightgrey;
`;

export default Meow;
