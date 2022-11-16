import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import SelectCSS from './Select.module.css';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

export interface SelectValue {
    id: number;
    name: string | number;
}

interface Props {
    options: SelectValue[];
    defaultValue: SelectValue;
    onChange: (x: SelectValue) => void;
    defaultMessage?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
}

const Select: React.FC<Props> = ({options, defaultValue, onChange}) => {

    const [selectedValue, setSelectedValue] = useState<SelectValue>(defaultValue);
    const [shouldShowOptions, setShouldShowOptions] = useState<boolean>(false);

    const onChangeValue = (e: React.MouseEvent<HTMLLIElement>) => {
        const setValue = options.find(option => option.id.toString() === e.currentTarget.dataset.id);

        if (setValue) {
            setSelectedValue(setValue);
            onChange(setValue);
            setShouldShowOptions(false);
        } else {
            console.error('The month selected is not in the list');
        }
    }

    function onClickName(e: React.SyntheticEvent<HTMLDivElement>) {
        setShouldShowOptions(!shouldShowOptions);
    }

  return (
    <div className={SelectCSS["custom-select"]}>
        <div className={SelectCSS['custom-select-input']} onClick={e => onClickName(e)}>
            <span>{selectedValue.name}</span>
            <FontAwesomeIcon icon={faSortDown} />
        </div>
        {
            shouldShowOptions &&
            <div className={SelectCSS['option-list-container']}>
                <ul className={SelectCSS['option-list']}>
                    {
                        options.map(option => (
                            <li key={option.id} className={SelectCSS['option-item']} onClick={e => onChangeValue(e)} data-id={option.id}>
                                {option.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        }
    </div>
  )
}

export default Select