import { Link as RouterLink, useLocation } from "react-router-dom";
import {
    Box,
    VStack,
    Text,
    Link,
    Spinner,
    useColorModeValue,
} from "@chakra-ui/react";

function Sidebar({ manifest }) {
    const location = useLocation();
    const sidebarBg = useColorModeValue("#fafafa", "gray.700");
    const borderColor = useColorModeValue("#e0e0e0", "gray.600");
    const categoryHeaderColor = useColorModeValue(
        "rgba(0,0,0,0.6)",
        "rgba(255,255,255,0.6)"
    );
    const linkColor = useColorModeValue(
        "rgba(0,0,0,0.8)",
        "rgba(255,255,255,0.8)"
    );
    const activeLinkColor = useColorModeValue("#0066cc", "blue.300");
    const activeBg = useColorModeValue(
        "rgba(0,102,204,0.1)",
        "rgba(66,153,225,0.2)"
    );
    const hoverBg = useColorModeValue(
        "rgba(0,0,0,0.05)",
        "rgba(255,255,255,0.05)"
    );
    const pageLinkColor = useColorModeValue(
        "rgba(0,0,0,0.7)",
        "rgba(255,255,255,0.7)"
    );

    if (!manifest || !manifest.categories) {
        return (
            <Box display="flex" justifyContent="center" padding="20px">
                <Spinner />
            </Box>
        );
    }

    const isActive = (path) => {
        return (
            location.pathname === path ||
            location.pathname.startsWith(path + "/")
        );
    };

    return (
        <Box
            as="aside"
            width="250px"
            flexShrink="0"
            borderRight="1px solid"
            borderColor={borderColor}
            backgroundColor={sidebarBg}
            alignSelf="stretch"
            minHeight="0"
            overflowY="auto"
            overflowX="hidden"
        >
            <Box as="nav" padding="20px">
                <VStack spacing="20px" align="stretch">
                    {manifest.categories.map((category) => {
                        return (
                            <Box key={category.path} marginBottom="1.5rem">
                                <Text
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    textTransform="uppercase"
                                    color={categoryHeaderColor}
                                    display="block"
                                    marginBottom="0.5rem"
                                    padding="0.5rem 0"
                                >
                                    {category.displayName || category.name}
                                </Text>
                                {category.projects &&
                                    category.projects.length > 0 && (
                                        <VStack
                                            spacing="5px"
                                            align="stretch"
                                            listStyle="none"
                                            padding="0"
                                            margin="0"
                                            marginLeft="0.5rem"
                                        >
                                            {category.projects.map(
                                                (project) => {
                                                    const projectName =
                                                        project.path
                                                            .split("/")
                                                            .pop();
                                                    const projectPath = `/${category.path}/${projectName}`;
                                                    const isProjectActive =
                                                        isActive(projectPath);

                                                    return (
                                                        <Box
                                                            key={project.path}
                                                            marginBottom="0.5rem"
                                                        >
                                                            <Link
                                                                as={RouterLink}
                                                                to={projectPath}
                                                                display="block"
                                                                padding="0.25rem 0.5rem"
                                                                borderRadius="4px"
                                                                textDecoration="none"
                                                                color={
                                                                    isProjectActive
                                                                        ? activeLinkColor
                                                                        : linkColor
                                                                }
                                                                backgroundColor={
                                                                    isProjectActive
                                                                        ? activeBg
                                                                        : "transparent"
                                                                }
                                                                fontWeight={
                                                                    isProjectActive
                                                                        ? "600"
                                                                        : "400"
                                                                }
                                                                fontSize="0.9rem"
                                                                _hover={{
                                                                    backgroundColor:
                                                                        isProjectActive
                                                                            ? activeBg
                                                                            : hoverBg,
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                            >
                                                                {project.displayName ||
                                                                    project.name}
                                                            </Link>
                                                            {isProjectActive &&
                                                                project.pages &&
                                                                project.pages
                                                                    .length >
                                                                    0 && (
                                                                    <VStack
                                                                        spacing="2px"
                                                                        align="stretch"
                                                                        marginTop="0.25rem"
                                                                        paddingLeft="1rem"
                                                                        listStyle="none"
                                                                        padding="0"
                                                                        margin="0"
                                                                    >
                                                                        {project.pages.map(
                                                                            (
                                                                                page
                                                                            ) => {
                                                                                const pageName =
                                                                                    page.path
                                                                                        .split(
                                                                                            "/"
                                                                                        )
                                                                                        .pop();
                                                                                const pagePath = `/${category.path}/${projectName}/${pageName}`;
                                                                                const isPageActive =
                                                                                    location.pathname ===
                                                                                    pagePath;

                                                                                return (
                                                                                    <Box
                                                                                        key={
                                                                                            page.path
                                                                                        }
                                                                                        marginBottom="0.25rem"
                                                                                    >
                                                                                        <Link
                                                                                            as={
                                                                                                RouterLink
                                                                                            }
                                                                                            to={
                                                                                                pagePath
                                                                                            }
                                                                                            display="block"
                                                                                            padding="0.25rem 0.5rem"
                                                                                            borderRadius="4px"
                                                                                            textDecoration="none"
                                                                                            fontSize="0.85rem"
                                                                                            color={
                                                                                                isPageActive
                                                                                                    ? activeLinkColor
                                                                                                    : pageLinkColor
                                                                                            }
                                                                                            backgroundColor={
                                                                                                isPageActive
                                                                                                    ? activeBg
                                                                                                    : "transparent"
                                                                                            }
                                                                                            fontWeight={
                                                                                                isPageActive
                                                                                                    ? "600"
                                                                                                    : "400"
                                                                                            }
                                                                                            _hover={{
                                                                                                backgroundColor:
                                                                                                    isPageActive
                                                                                                        ? activeBg
                                                                                                        : hoverBg,
                                                                                                textDecoration:
                                                                                                    "none",
                                                                                            }}
                                                                                        >
                                                                                            {page.displayName ||
                                                                                                page.name}
                                                                                        </Link>
                                                                                    </Box>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </VStack>
                                                                )}
                                                        </Box>
                                                    );
                                                }
                                            )}
                                        </VStack>
                                    )}
                            </Box>
                        );
                    })}
                </VStack>
            </Box>
        </Box>
    );
}

export default Sidebar;
