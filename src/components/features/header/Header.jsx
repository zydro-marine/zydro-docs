import { Link as RouterLink, useLocation } from "react-router-dom";
import {
    Box,
    Link,
    Button,
    HStack,
    Text,
    IconButton,
    Spinner,
    Image,
} from "@chakra-ui/react";
import { TbSun, TbMoon } from "react-icons/tb";
import { useAuth } from "../../../contexts/AuthContext";
import SearchBar from "../search-bar/SearchBar";

function Header() {
    const { isAuthenticated, user, logout, login, isLoading } = useAuth();
    const location = useLocation();
    const isIndexPage = location.pathname === "/";

    return (
        <Box
            as="header"
            width="100%"
            display="flex"
            justifyContent="stretch"
            alignItems="stretch"
            backgroundColor="#131313"
            color="white"
            height="80px"
            borderBottom="1px solid rgba(255,255,255,0.06)"
        >
            <Box
                maxWidth="1200px"
                width="100%"
                margin="0 auto"
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                pl="20px"
                pr="20px"
            >
                <Link
                    as={RouterLink}
                    to="/"
                    textDecoration="none"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    flexShrink="0"
                >
                    <Image
                        src="/images/logos/logo-text-2.svg"
                        w="100px"
                    ></Image>
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
                    {isLoading ? (
                        <Spinner size="sm" />
                    ) : isAuthenticated ? (
                        <>
                            <Text fontSize="0.9rem">
                                {user?.profile?.name ||
                                    user?.profile?.email ||
                                    "User"}
                            </Text>
                            <Button onClick={logout} size="sm">
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Button onClick={login} size="sm">
                            Sign In
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Header;
