import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Heading,
    HStack,
    Button,
    Stack,
    Text,
    Link,
    Spinner,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import * as TbIcons from "react-icons/tb";
import SearchBar from "../../features/search-bar/SearchBar";

function getProjectIcon(projectName) {
    const iconMap = {
        "raspberry-pi": TbIcons.TbCpu,
        "compute-module": TbIcons.TbChip,
        "raspberry-pi-os": TbIcons.TbBrandLinux,
        "raspberry-pi-connect": TbIcons.TbPlugConnected,
    };

    const normalizedName = projectName.toLowerCase().replace(/\s+/g, "-");
    return iconMap[normalizedName] || TbIcons.TbFileText;
}

function LittleCrossAccent() {
    return (
        <Box position="relative" display={["none", "none", "block"]}>
            <Box position="absolute" left="-15px" top="-10px">
                <Box
                    w="20px"
                    h="1px"
                    bg="rgba(255, 255, 255, 0.2)"
                    position="absolute"
                    left="-10px"
                    bottom="-1px"
                ></Box>
                <Box
                    w="1px"
                    h="20px"
                    bg="rgba(255, 255, 255, 0.2)"
                    position="absolute"
                    left="-1px"
                    bottom="-10px"
                ></Box>
            </Box>
        </Box>
    );
}

function IndexPage({ manifest }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const headerBg = useColorModeValue("#fafafa", "gray.800");
    const headerBorder = useColorModeValue("#e0e0e0", "gray.700");
    const titleColor = useColorModeValue("black", "white");
    const categoryLabelColor = useColorModeValue(
        "rgba(0,0,0,0.5)",
        "rgba(255,255,255,0.5)"
    );
    const tabBorderColor = useColorModeValue("#e0e0e0", "gray.600");
    const activeTabColor = "blue.500";
    const inactiveTabColor = "rgba(255, 255, 255, 0.842)";
    const tileBg = useColorModeValue("white", "gray.700");
    const tileBorder = useColorModeValue("#e0e0e0", "gray.600");
    const tileHoverBorder = useColorModeValue("#0066cc", "blue.300");
    const tileShadow = useColorModeValue(
        "0 2px 8px rgba(0,102,204,0.1)",
        "0 2px 8px rgba(66,153,225,0.1)"
    );
    const tileCategoryColor = useColorModeValue(
        "rgba(0,0,0,0.5)",
        "rgba(255,255,255,0.5)"
    );
    const tileIconColor = useColorModeValue("#0066cc", "blue.300");
    const tileTitleColor = useColorModeValue("black", "white");
    const tileMetaColor = useColorModeValue(
        "rgba(0,0,0,0.6)",
        "rgba(255,255,255,0.6)"
    );

    if (!manifest || !manifest.categories) {
        return (
            <Box display="flex" justifyContent="center" padding="40px">
                <Spinner />
            </Box>
        );
    }

    const allProjects = manifest.categories.flatMap((category) =>
        category.projects.map((project) => ({
            ...project,
            categoryName: category.displayName || category.name,
            categoryPath: category.path,
        }))
    );

    const projectsToShow = selectedCategory
        ? allProjects.filter((p) => p.categoryPath === selectedCategory)
        : allProjects;

    // Group projects by category when showing all
    const groupedByCategory =
        selectedCategory === null
            ? manifest.categories
                  .filter((cat) => cat.projects && cat.projects.length > 0)
                  .map((category) => ({
                      category: category,
                      projects: category.projects.map((project) => ({
                          ...project,
                          categoryName: category.displayName || category.name,
                          categoryPath: category.path,
                      })),
                  }))
            : null;

    return (
        <Box width="100%" display="flex" flexDirection="column">
            <Box
                display="flex"
                justifyContent="stretch"
                alignItems="stretch"
                bgImage="/images/contour-v2-dark.svg"
                bgColor="#161616"
            >
                <Box
                    maxWidth="1200px"
                    width="100%"
                    margin="0 auto"
                    display="flex"
                    pt="20px"
                    flexDir="column"
                    justifyContent="stretch"
                    alignItems="stretch"
                >
                    <Box
                        flex="1"
                        padding={["40px", "40px", "60px"]}
                        display="flex"
                        flexDir="column"
                        justifyContent="stretch"
                        alignItems="stretch"
                    >
                        <LittleCrossAccent />
                        <Text
                            fontSize="38px"
                            fontWeight="500"
                            marginBottom="10px"
                            color="#ffffff"
                        >
                            Documentation
                        </Text>
                    </Box>
                    <Box maxWidth="600px" width="100%" marginBottom="30px">
                        <SearchBar />
                    </Box>

                    <Box marginBottom="10px">
                        <Text
                            fontSize="12px"
                            textTransform="uppercase"
                            color={categoryLabelColor}
                            fontWeight="600"
                            letterSpacing="0.5px"
                        >
                            Category
                        </Text>
                    </Box>

                    <HStack
                        spacing="0"
                        flexWrap="wrap"
                        gap="0"
                        borderBottom="3px solid"
                        borderColor={tabBorderColor}
                        marginBottom="0"
                    >
                        <Button
                            onClick={() => setSelectedCategory(null)}
                            borderRadius="0"
                            borderTopRadius="6px"
                            padding="16px 24px"
                            fontSize="16px"
                            fontWeight="500"
                            height="auto"
                            backgroundColor="transparent"
                            color={
                                selectedCategory === null
                                    ? activeTabColor
                                    : inactiveTabColor
                            }
                            border="none"
                            borderBottom={
                                selectedCategory === null
                                    ? `3px solid ${activeTabColor}`
                                    : "3px solid transparent"
                            }
                            marginBottom="-3px"
                            transition="all 0.2s"
                            _hover={{
                                backgroundColor: "transparent",
                                color: activeTabColor,
                                borderBottom: `3px solid ${useColorModeValue(
                                    "rgba(0,102,204,0.5)",
                                    "rgba(66,153,225,0.5)"
                                )}`,
                            }}
                        >
                            All
                        </Button>
                        {manifest.categories.map((category) => (
                            <Button
                                key={category.path}
                                onClick={() =>
                                    setSelectedCategory(category.path)
                                }
                                borderRadius="0"
                                borderTopRadius="6px"
                                padding="16px 24px"
                                fontSize="16px"
                                fontWeight="500"
                                height="auto"
                                backgroundColor="transparent"
                                color={
                                    selectedCategory === category.path
                                        ? activeTabColor
                                        : inactiveTabColor
                                }
                                border="none"
                                borderBottom={
                                    selectedCategory === category.path
                                        ? `3px solid ${activeTabColor}`
                                        : "3px solid transparent"
                                }
                                marginBottom="-3px"
                                transition="all 0.2s"
                                _hover={{
                                    backgroundColor: "transparent",
                                    color: activeTabColor,
                                    borderBottom: `3px solid ${useColorModeValue(
                                        "rgba(0,102,204,0.5)",
                                        "rgba(66,153,225,0.5)"
                                    )}`,
                                }}
                            >
                                {category.displayName || category.name}
                            </Button>
                        ))}
                    </HStack>
                </Box>
            </Box>

            <Box
                flex="1"
                padding="2rem"
                maxWidth="1400px"
                width="100%"
                margin="0 auto"
            >
                {groupedByCategory ? (
                    <VStack
                        spacing="40px"
                        align="stretch"
                        maxWidth="1200px"
                        margin="0 auto"
                    >
                        {groupedByCategory.map(({ category, projects }) => (
                            <Box key={category.path}>
                                <Heading
                                    as="h2"
                                    size="lg"
                                    marginBottom="20px"
                                    color={titleColor}
                                >
                                    {category.displayName || category.name}
                                </Heading>
                                <Stack
                                    direction="row"
                                    spacing="20px"
                                    flexWrap="wrap"
                                    shouldWrapChildren
                                >
                                    {projects.map((project) => {
                                        const projectName = project.path
                                            .split("/")
                                            .pop();
                                        const projectPath = `/${project.categoryPath}/${projectName}`;
                                        const IconComponent = getProjectIcon(
                                            project.name
                                        );

                                        return (
                                            <Link
                                                minW="300px"
                                                key={project.path}
                                                as={RouterLink}
                                                to={projectPath}
                                                textDecoration="none"
                                                color="inherit"
                                                display="block"
                                                _hover={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <Box
                                                    padding="1.5rem"
                                                    border="1px solid"
                                                    borderColor={tileBorder}
                                                    borderRadius="8px"
                                                    backgroundColor={tileBg}
                                                    transition="box-shadow 0.2s"
                                                    minHeight="150px"
                                                    display="flex"
                                                    flexDirection="column"
                                                    _hover={{
                                                        borderColor:
                                                            tileHoverBorder,
                                                        boxShadow: tileShadow,
                                                    }}
                                                >
                                                    <HStack
                                                        spacing="0.75rem"
                                                        marginBottom="0.5rem"
                                                        alignItems="flex-start"
                                                        flex="1"
                                                        display="flex"
                                                    >
                                                        <Box
                                                            fontSize="2rem"
                                                            color={
                                                                tileIconColor
                                                            }
                                                            flexShrink="0"
                                                        >
                                                            <IconComponent />
                                                        </Box>
                                                        <Heading
                                                            as="h2"
                                                            size="md"
                                                            margin="0"
                                                            fontSize="1.5rem"
                                                            color={
                                                                tileTitleColor
                                                            }
                                                            overflowWrap="break-word"
                                                            wordBreak="break-word"
                                                            lineHeight="1.4"
                                                        >
                                                            {project.displayName ||
                                                                project.name}
                                                        </Heading>
                                                    </HStack>
                                                    {project.pages &&
                                                        project.pages.length >
                                                            0 && (
                                                            <Text
                                                                marginTop="auto"
                                                                paddingTop="1rem"
                                                                fontSize="0.9rem"
                                                                color={
                                                                    tileMetaColor
                                                                }
                                                            >
                                                                {
                                                                    project
                                                                        .pages
                                                                        .length
                                                                }{" "}
                                                                {project.pages
                                                                    .length ===
                                                                1
                                                                    ? "page"
                                                                    : "pages"}
                                                            </Text>
                                                        )}
                                                </Box>
                                            </Link>
                                        );
                                    })}
                                </Stack>
                            </Box>
                        ))}
                    </VStack>
                ) : (
                    <Stack
                        flex="1"
                        direction="row"
                        spacing="20px"
                        flexWrap="wrap"
                        shouldWrapChildren
                        maxWidth="1200px"
                        margin="0 auto"
                    >
                        {projectsToShow.map((project) => {
                            const projectName = project.path.split("/").pop();
                            const projectPath = `/${project.categoryPath}/${projectName}`;

                            const IconComponent = getProjectIcon(project.name);

                            return (
                                <Link
                                    minW="300px"
                                    key={project.path}
                                    as={RouterLink}
                                    to={projectPath}
                                    textDecoration="none"
                                    color="inherit"
                                    display="block"
                                    _hover={{ textDecoration: "none" }}
                                >
                                    <Box
                                        padding="1.5rem"
                                        border="1px solid"
                                        borderColor={tileBorder}
                                        borderRadius="8px"
                                        backgroundColor={tileBg}
                                        transition="box-shadow 0.2s"
                                        minHeight="150px"
                                        display="flex"
                                        flexDirection="column"
                                        _hover={{
                                            borderColor: tileHoverBorder,
                                            boxShadow: tileShadow,
                                        }}
                                    >
                                        <Text
                                            fontSize="0.85rem"
                                            color={tileCategoryColor}
                                            textTransform="uppercase"
                                            marginBottom="0.5rem"
                                            fontWeight="600"
                                        >
                                            {project.categoryName}
                                        </Text>
                                        <HStack
                                            spacing="0.75rem"
                                            marginBottom="0.5rem"
                                            alignItems="flex-start"
                                            flex="1"
                                            display="flex"
                                        >
                                            <Box
                                                fontSize="2rem"
                                                color={tileIconColor}
                                                flexShrink="0"
                                            >
                                                <IconComponent />
                                            </Box>
                                            <Heading
                                                as="h2"
                                                size="md"
                                                margin="0"
                                                fontSize="1.5rem"
                                                color={tileTitleColor}
                                                overflowWrap="break-word"
                                                wordBreak="break-word"
                                                lineHeight="1.4"
                                            >
                                                {project.displayName ||
                                                    project.name}
                                            </Heading>
                                        </HStack>
                                        {project.pages &&
                                            project.pages.length > 0 && (
                                                <Text
                                                    marginTop="auto"
                                                    paddingTop="1rem"
                                                    fontSize="0.9rem"
                                                    color={tileMetaColor}
                                                >
                                                    {project.pages.length}{" "}
                                                    {project.pages.length === 1
                                                        ? "page"
                                                        : "pages"}
                                                </Text>
                                            )}
                                    </Box>
                                </Link>
                            );
                        })}
                    </Stack>
                )}
            </Box>
        </Box>
    );
}

export default IndexPage;
