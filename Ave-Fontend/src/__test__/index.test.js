import { render, fireEvent } from '@testing-library/react'
import { Search } from '../components/search/Search'


describe('Search Component', () => {

  it('renders the component', () => {
    const { getByText, getByTestId } = render(<Search />);
    expect(getByText('AVE')).toBeInTheDocument();
    expect(getByTestId('menu')).toBeInTheDocument();
  });

  it('renders the nav', () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId('nav')).toBeInTheDocument();
  });

  it('renders the search', () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId('search')).toBeInTheDocument();
  });

  it('checks if the heart icon is working', () => {
    const { getByTestId } = render(<Search />);
    let heartIcon = getByTestId('heart-icon');
    expect(heartIcon).toBeInTheDocument();
    fireEvent.click(heartIcon);
    expect(heartIcon).toHaveClass('icon_active');
  });

  it('checks if the sorting select is working', () => {
    const { getByTestId } = render(<Search />);
    let select = getByTestId('sort-select');
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'az' } });
    expect(select).toHaveValue('az');
  });
});