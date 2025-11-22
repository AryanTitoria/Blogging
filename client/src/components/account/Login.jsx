import { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Background = styled(Box)`
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=100&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 0;
`;

const BgOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35); 
  z-index: 1;
`;

const Component = styled(Box)`
  width: 460px;                
  margin: auto;
  background: rgba(255,255,255,0.88); 
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.5);
  position: relative;
  z-index: 2;                  
  overflow: hidden;
`;

const Image = styled('img')({
  width: 120,
  margin: '18px auto 6px',
  display: 'block',
});

const Wrapper = styled(Box)`
  padding: 28px 40px 36px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 18px;
  }
`;

/* bigger, bolder buttons */
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 50px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 50px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.18);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
  margin-top: 6px;
`;

const StyledTextField = styled(TextField)`
  & .MuiInput-underline:before,
  & .MuiInput-underline:after {
    border-bottom-color: rgba(0,0,0,0.2);
  }
  & .MuiInputBase-input {
    font-size: 16px;
    color: #222; /* darker input text */
    padding: 10px 0 6px;
  }
  & .MuiInputLabel-root {
    font-size: 15px;
    color: rgba(0,0,0,0.55);
  }
`;

const loginInitialValues = { username: '', password: '' };
const signupInitialValues = { name: '', username: '', password: '' };

const Login = ({ isUserAuthenticated }) => {
  const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  const [account, toggleAccount] = useState('login');
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState('');

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    setError('');
    toggleAccount(account === 'signup' ? 'login' : 'signup');
  };

  const onInputChange = (e) => {
    setSignup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signupUser = async () => {
    const response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError('');
      setSignup(signupInitialValues);
      toggleAccount('login');
    } else {
      setError('Something went wrong! Please try again later.');
    }
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError('');
      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
      setAccount({ username: response.data.username, name: response.data.name });
      isUserAuthenticated(true);
      navigate('/');
    } else {
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <>
      <Background />
      <BgOverlay />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <Component>
          <Box>
            <Image src={imageURL} alt="login" />
            {account === 'login' ? (
              <Wrapper>
                <StyledTextField
                  variant="standard"
                  value={login.username}
                  onChange={(e) => onValueChange(e)}
                  name="username"
                  label="Enter Username"
                />
                <StyledTextField
                  variant="standard"
                  value={login.password}
                  onChange={(e) => onValueChange(e)}
                  name="password"
                  label="Enter Password"
                  type="password"
                />

                {error && <Typography color="error">{error}</Typography>}
                <LoginButton variant="contained" onClick={() => loginUser()}>
                  Login
                </LoginButton>
                <Text style={{ textAlign: 'center' }}>OR</Text>
                <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
              </Wrapper>
            ) : (
              <Wrapper>
                <StyledTextField variant="standard" onChange={onInputChange} name="name" label="Enter Name" value={signup.name} />
                <StyledTextField variant="standard" onChange={onInputChange} name="username" label="Enter Username" value={signup.username} />
                <StyledTextField variant="standard" onChange={onInputChange} name="password" label="Enter Password" type="password" value={signup.password} />

                {error && <Typography color="error">{error}</Typography>}

                <SignupButton onClick={signupUser}>Signup</SignupButton>
                <Text style={{ textAlign: 'center' }}>OR</Text>
                <LoginButton variant="contained" onClick={toggleSignup}>
                  Already have an account
                </LoginButton>
              </Wrapper>
            )}
          </Box>
        </Component>
      </Box>
    </>
  );
};

export default Login;
