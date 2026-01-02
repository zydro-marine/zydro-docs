import { useState } from "react";
import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
} from "@chakra-ui/react";
import { TbSearch } from "react-icons/tb";

function SearchBar({ placeholder = "Search documentation...", onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
    const inputBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("#ddd", "gray.600");
    const focusBorderColor = useColorModeValue("#0066cc", "blue.300");
    const placeholderColor = useColorModeValue("#999", "gray.400");
    const iconColor = useColorModeValue("#999", "gray.400");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <Box position="relative" maxWidth="600px" width="100%">
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    color={iconColor}
                    fontSize="1.25rem"
                    left="1rem"
                    top="50%"
                    transform="translateY(-50%)"
                >
                    <TbSearch />
                </InputLeftElement>
                <Input
                    bg={inputBg}
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleChange}
                    width="100%"
                    padding="0.75rem 1rem 0.75rem 3rem"
                    fontSize="1rem"
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="8px"
                    _focus={{
                        borderColor: focusBorderColor,
                        outline: "none",
                    }}
                    _placeholder={{
                        color: placeholderColor,
                    }}
                />
            </InputGroup>
        </Box>
    );
}

export default SearchBar;
