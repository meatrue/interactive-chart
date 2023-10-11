import React from "react";
import clsx from "clsx";

import { ArrowDownIcon } from ".";

export type SelectOption = {
  title: string,
  value: string,
};

const SelectGeneralStyles = 'text-[1.5rem] leading-[1.25] border-2 border-solid border-[#000aff] rounded-[1.75rem]';

interface SelectedValueContainerProps {
  children: React.ReactNode;
  className?: string;
}

const SelectedValueContainer: React.FC<SelectedValueContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx(
      'flex justify-between items-center gap-[1.1rem] py-[0.44rem] pl-[1.1rem] pr-[0.87rem]',
      className
    )}>
      {children}
    </div>
  );
};

interface OptionsContainerProps {
  children: React.ReactNode;
  className?: string;
}

const OptionsContainer: React.FC<OptionsContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx(
      'absolute z-20 bottom-0 translate-y-full left-0 right-0',
      'flex flex-col items-stretch gap-[1rem] p-[1.12rem] bg-white',
      className
    )}>
      {children}
    </div>
  );
};

interface OptionProps {
  children: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Option: React.FC<OptionProps> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer hover:text-[#000aff] transition-colors duration-300"
    >
      {children}
    </div>
  );
};

interface SelectProps {
  options: SelectOption[];
  selectedOption: SelectOption;
  onOptionSelect: (option: SelectOption) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  className
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);


  const handleSelectOption = (option: SelectOption) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={clsx(
      'relative',
      className
    )}>
      <SelectedValueContainer className={SelectGeneralStyles}>
        {selectedOption.title}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#000aff]"
        >
          <ArrowDownIcon className={clsx(
            'transition-transform',
            {'scale-y-[-1]': isOpen},
          )} />
        </button>
      </SelectedValueContainer>

      {isOpen &&
        <OptionsContainer className={SelectGeneralStyles}>
          {options.map(({value, title}) => (
            value !== selectedOption.value &&
              <Option
                key={value}
                onClick={() => handleSelectOption({value, title})}
              >
                {title}
              </Option>
          ))}
        </OptionsContainer>
      }
    </div>
  );
};