export default function Search({value, handleSearch}) {
    // console.log(value, "ISI DATA SEARCH DI COMPONENT");
    // console.log(handleSearch, "ISI FUNCTION PADA ELEMENT SEARCH");
    
    
    return(
        <input
            type="search"
            className="search-input"
            placeholder="Search data...."
            value={value}
            onChange={handleSearch}
            />
    )
}