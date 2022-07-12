import styled from "styled-components";

export function Login({
  email,
  setEmail,
  password,
  setPassword,
  Button,
  handleSubmit,
}) {
  return (
    <FormsWrapper onSubmit={handleSubmit}>
      <input
        value={email}
        type={"e-mail"}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        title=""
        required
      />
      <input
        value={password}
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        title=""
        required
      />
      <Button type={"Submit"} />
    </FormsWrapper>
  );
}

export function SignUp({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  repeat,
  setRepeat,
  Button,
  handleSubmit,
}) {
  return (
    <FormsWrapper onSubmit={handleSubmit}>
      <input
        value={name}
        type={"text"}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        pattern="[a-zA-Z\s.]{1,64}"
        title=""
        required
      />
      <input
        value={email}
        type={"e-mail"}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        title=""
        required
      />
      <input
        value={password}
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        title=""
        required
      />
      <input
        value={repeat}
        type={"password"}
        onChange={(e) => setRepeat(e.target.value)}
        placeholder="Re-enter the password"
        title=""
        required
      />
      <Button type={"Submit"} />
    </FormsWrapper>
  );
}

export const FormsWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 5vh;
  margin-top: 25vh;
  box-sizing: border-box;

  input {
    font-family: "Roboto", sans-serif;
    display: flex;
    width: 90%;
    padding: 1vh 2vw;
    margin: 0.75vh 2.25vw;
    font-size: 20px;
    border-radius: 5px;
    border: none;

    ::placeholder {
      font-family: "Roboto", sans-serif;
    }
  }
`;