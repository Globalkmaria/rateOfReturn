import { useSearchParams } from 'react-router-dom';

import RadioSelect, { RadioSelectProps } from '@/components/RadioSelect';

type NoteFilterProps = Omit<RadioSelectProps, 'value' | 'onClick'> & {
  name: string;
  replaceParams?: boolean;
};

function NoteFilter({
  name,
  replaceParams = true,
  ...restProps
}: NoteFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(name) ?? '';

  const onFilterChange = (newValue: string) => {
    if (newValue === value) {
      setSearchParams(prev => {
        prev.delete(name);
        return prev;
      });
      return;
    }

    setSearchParams(prev => {
      if (replaceParams)
        return {
          [name]: newValue,
        };

      prev.set(name, newValue);
      return prev;
    });
  };

  return <RadioSelect onClick={onFilterChange} value={value} {...restProps} />;
}

export default NoteFilter;
