import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostContext } from '../context/PostContext';
import PostForm from '../components/PostForm/PostForm';
import '@testing-library/jest-dom';

// Мокаем i18next, чтобы t('key') возвращал просто 'key'
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => key,
  }),
}));

const mockCreateNewPost = jest.fn();

const renderComponent = () => render(
  <PostContext.Provider value={{ createNewPost: mockCreateNewPost } as any}>
    <PostForm />
  </PostContext.Provider>
);

describe('PostForm Jest Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('кнопка должна быть заблокирована, если поле пустое', () => {
    renderComponent();
    
    const submitButton = screen.getByRole('button', { name: /postForm.publishButton/i });
    
    expect(submitButton).toBeDisabled();
  });

  it('кнопка должна стать активной при вводе текста', () => {
    renderComponent();
    
    const textarea = screen.getByPlaceholderText(/postForm.InputFieldPostForm/i);
    const submitButton = screen.getByRole('button', { name: /postForm.publishButton/i });

    fireEvent.change(textarea, { target: { value: 'Привет, мир!' } });

    expect(submitButton).not.toBeDisabled();
  });

  it('должен вызвать createNewPost и очистить форму при отправке', async () => {
    renderComponent();
    
    const textarea = screen.getByPlaceholderText(/postForm.InputFieldPostForm/i);
    const submitButton = screen.getByRole('button', { name: /postForm.publishButton/i });

    fireEvent.change(textarea, { target: { value: 'Новый пост' } });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateNewPost).toHaveBeenCalledWith('Новый пост');
    });

    expect(textarea).toHaveValue('');
  });

  it('не должен вызывать createNewPost, если в поле только пробелы', async () => {
    renderComponent();
    
    const textarea = screen.getByPlaceholderText(/postForm.InputFieldPostForm/i);
    const submitButton = screen.getByRole('button', { name: /postForm.publishButton/i });

    fireEvent.change(textarea, { target: { value: '   ' } });
    fireEvent.click(submitButton);

    expect(mockCreateNewPost).not.toHaveBeenCalled();
  });
});
