import { Link as RouterLink, useLocation } from "react-router-dom";
import {
    Box,
    Link,
    Button,
    HStack,
    Text,
    IconButton,
    useColorMode,
    useColorModeValue,
    Spinner,
} from "@chakra-ui/react";
import { TbSun, TbMoon } from "react-icons/tb";
import { useAuth } from "../../../contexts/AuthContext";
import SearchBar from "../search-bar/SearchBar";

function Header() {
    const { isAuthenticated, user, logout, login, isLoading } = useAuth();
    const location = useLocation();
    const isIndexPage = location.pathname === "/";
    const { colorMode, toggleColorMode } = useColorMode();
    const iconColor = useColorModeValue("black", "white");
    const headerBg = useColorModeValue("white", "gray.800");
    const headerBorder = useColorModeValue("#e0e0e0", "gray.700");
    const linkColor = useColorModeValue("black", "white");
    const textColor = useColorModeValue(
        "rgba(0,0,0,0.6)",
        "rgba(255,255,255,0.6)"
    );

    return (
        <Box
            as="header"
            width="100%"
            display="flex"
            justifyContent="center"
            borderBottom="1px solid"
            borderColor={headerBorder}
            backgroundColor={headerBg}
            padding="1rem 2rem"
        >
            <Box
                maxWidth="1400px"
                width="100%"
                margin="0 auto"
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                gap="2rem"
            >
                <Link
                    as={RouterLink}
                    to="/"
                    textDecoration="none"
                    color={linkColor}
                    fontWeight="bold"
                    fontSize="1.5rem"
                    flexShrink="0"
                >
                    Zydro Documentation
                </Link>
                {!isIndexPage && (
                    <Box flex="1" maxWidth="600px" margin="0 auto">
                        <SearchBar />
                    </Box>
                )}
                <Box
                    display="flex"
                    flexDir="row"
                    alignItems="center"
                    gap="1rem"
                    flexShrink="0"
                >
                    <IconButton
                        aria-label="Toggle color mode"
                        icon={colorMode === "light" ? <TbMoon /> : <TbSun />}
                        onClick={toggleColorMode}
                        size="sm"
                        variant="styledOutline"
                        color={iconColor}
                    />
                    {isLoading ? (
                        <Spinner size="sm" />
                    ) : isAuthenticated ? (
                        <>
                            <Text fontSize="0.9rem" color={textColor}>
                                {user?.profile?.name ||
                                    user?.profile?.email ||
                                    "User"}
                            </Text>
                            <Button
                                onClick={logout}
                                size="sm"
                                variant="styledOutline"
                            >
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={login}
                            size="sm"
                            variant="styledOutline"
                        >
                            Sign In
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Header;
