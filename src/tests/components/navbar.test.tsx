import { render, fireEvent, screen } from '@testing-library/react';
import NavBar from 'components/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';

describe('NavBar', () => {
  const customRender = () => {
    return render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  };

  it('renders NavBar', () => {
    customRender();

    const navbar = screen.getByRole('navigation');

    expect(navbar).toBeInTheDocument();
  });

  it('toggles dropdown when dropdown button is clicked', () => {
    customRender();

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    expect(dropdownButton.textContent).toBe('X');
  });

  it('toggles dropdown when link is clicked', () => {
    customRender();

    const links = screen.getAllByRole('listitem');
    const dropdownButton = screen.getByRole('button');
    fireEvent.click(links[0]);

    expect(dropdownButton.textContent).toBe('X');
  });
});
