import { FC } from "react";
import "./SearchComponent.scss";

interface ISearchComponent {
  onChange: (value: string) => unknown;
}

export const SearchComponent: FC<ISearchComponent> = (props) => {
  const { onChange }: ISearchComponent = { ...defaultProps, ...props };

  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
      placeholder="Search"
    />
  );
};

const defaultProps: Required<ISearchComponent> = {
  onChange: () => {},
};
