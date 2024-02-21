import { render } from '@testing-library/react';
import Banner from './banner';
import { makeFakePromo } from '../../store/mock-components/mocks';

describe('Banner component', () => {
  const mockPromo = makeFakePromo();
  const mockBanners = [mockPromo];

  it('renders without crashing', () => {
    render(<Banner banners={mockBanners} />);
  });

  it('displays banners correctly', () => {
    const { getAllByTestId } = render(<Banner banners={mockBanners} />);
    const bannerElements = getAllByTestId('banner');

    expect(bannerElements).toHaveLength(mockBanners.length);
  });

  it('displays "Новинка!" message for each banner', () => {
    const { getAllByText } = render(<Banner banners={mockBanners} />);
    const noveltyMessages = getAllByText('Новинка!');

    expect(noveltyMessages).toHaveLength(mockBanners.length);
  });
});
