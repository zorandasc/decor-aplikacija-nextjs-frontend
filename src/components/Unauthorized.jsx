import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Wrapper>
      <h1>Unauthorized ☠️</h1>
      <p>You do not have access to the requested page.</p>
      <br></br>
      <div className="flexGrow">
        <button className="btnBack" onClick={goBack}>
          Go Back
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .btnBack {
    box-sizing: border-box;
    appearance: none;
    background-color: #333;
    border: 2px solid #333;
    border-radius: 0.6em;
    color: whitesmoke;
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 1rem;
    line-height: 1;
    margin: 20px;
    padding: 0.8em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    box-shadow: 0 0 10px 0 #fff inset, 0 0 10px 4px #fff;
    transition: all 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #333 inset, 0 0 0 0 #333;
      color: #fff;
    }
  }
`;

export default Unauthorized;
