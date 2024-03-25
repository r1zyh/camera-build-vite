import { render } from '@testing-library/react';
import Banner from './banner';
import { makeFakePromo } from '../../store/mock-components/mocks';
import { BrowserRouter } from 'react-router-dom';

describe('Banner component', () => {
  const mockPromo = makeFakePromo();
  const mockBanners = [mockPromo];

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Banner banners={mockBanners} />
      </BrowserRouter>
    );
  });

  it('displays banners correctly', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Banner banners={mockBanners} />
      </BrowserRouter>
    );
    const bannerElements = getAllByTestId('banner');

    expect(bannerElements).toHaveLength(mockBanners.length);
  });

  it('displays "Новинка!" message for each banner', () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <Banner banners={mockBanners} />
      </BrowserRouter>
    );
    const noveltyMessages = getAllByText('Новинка!');

    expect(noveltyMessages).toHaveLength(mockBanners.length);
  });
});
