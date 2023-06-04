import { TextInput, TextInputProps } from "flowbite-react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ id = 'search', className = '', ...otherProps }: TextInputProps) => {
  return (
    <form className="flex items-center">
      <label htmlFor={id} className="sr-only">Search</label>
      <div className="relative w-full">
        <TextInput
          id={id}
          icon={FaSearch}
          placeholder="Cari"
          type="text"
          sizing="xl"
          className={`rounded-2xl ${className}`}
          {...otherProps}
        />
      </div>
    </form>
  )
}

export default SearchBar;
