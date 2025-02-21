import { useState } from 'react';

import { InputType, TransformedValue } from '../BaseInput';
import { Input } from '../Input';

interface Props {
  type: InputType;
}

const TestInput = ({ type }: Props) => {
  const [value, setValue] = useState('');

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    transformedValue: TransformedValue,
  ) => {
    if (transformedValue === null) return;
    setValue(transformedValue[0]);
  };

  return <Input type={type} onChange={onChange} value={value} />;
};

export default TestInput;
