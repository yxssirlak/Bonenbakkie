import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export type DropdownOption = {
  value: string;
  label: string;
  hint?: string;
};

type DropdownProps = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({ value, options, onChange, placeholder = 'Kies een optie...', disabled }) => {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const choose = (option: DropdownOption) => {
    onChange(option.value);
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    if (event.key === 'Escape') {
      setOpen(false);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlight(Math.max(0, options.findIndex((option) => option.value === value)));
        return;
      }
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setHighlight((current) => (current + step + options.length) % options.length);
    } else if ((event.key === 'Enter' || event.key === ' ') && open && highlight >= 0) {
      event.preventDefault();
      choose(options[highlight]);
    } else if ((event.key === 'Enter' || event.key === ' ') && !open) {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        type="button"
        disabled={disabled}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-black/20 px-4 py-3 text-left transition-all duration-300 focus:outline-none disabled:opacity-40 ${
          open ? 'border-[#d4cab4] shadow-[0_0_0_3px_rgba(212,202,180,0.12)]' : 'border-white/10 hover:border-white/30'
        }`}
      >
        <span className={`truncate ${selected ? 'text-white' : 'text-white/40'}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown size={18} className={`shrink-0 text-[#d4cab4] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <ul
        id={listId}
        role="listbox"
        className={`absolute left-0 right-0 z-40 mt-2 max-h-64 origin-top overflow-y-auto rounded-2xl border border-white/10 bg-[#2b1a12]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-200 ease-out ${
          open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            role="option"
            aria-selected={option.value === value}
            onMouseEnter={() => setHighlight(index)}
            onClick={() => choose(option)}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ${
              highlight === index ? 'bg-white/10' : ''
            } ${option.value === value ? 'text-[#f4f1ea]' : 'text-white/75'}`}
          >
            <span className="min-w-0">
              <span className="block truncate">{option.label}</span>
              {option.hint && <span className="block truncate text-xs text-white/40">{option.hint}</span>}
            </span>
            {option.value === value && <Check size={16} className="shrink-0 text-[#d4cab4]" />}
          </li>
        ))}
        {options.length === 0 && <li className="px-3 py-2.5 text-sm text-white/40">Geen opties beschikbaar</li>}
      </ul>
    </div>
  );
};

export default Dropdown;
