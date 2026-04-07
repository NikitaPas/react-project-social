import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserContext } from '../context/UserContext';
import AuthForm from '../components/AuthForm/AuthForm';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockLoginUser = jest.fn();
const mockIsUserCreated = jest.fn();

const renderComponent = () => render(
  <BrowserRouter>
    <UserContext.Provider value={{ 
      loginUser: mockLoginUser, 
      isUserCreated: mockIsUserCreated,
    } as any}>
      <AuthForm />
    </UserContext.Provider>
  </BrowserRouter>
);

describe('AuthForm Jest Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен показать ошибку валидации при пустых полях', async () => {
    renderComponent();
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    // Formik работает асинхронно, используем findBy
    const error = await screen.findByText(/заполните все поля/i);
    expect(error).toBeInTheDocument();
  });

  it('должен вызвать loginUser при успешном входе', async () => {
    mockIsUserCreated.mockReturnValue({ id: '1', login: 'admin', password: '123' });
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/login/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({ id: '1', login: 'admin' });
    });
  });
});
