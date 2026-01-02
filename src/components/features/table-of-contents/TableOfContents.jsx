import { Box, VStack, Text, Link, useColorModeValue } from "@chakra-ui/react";

function TableOfContents({ headings }) {
    const tocBg = useColorModeValue("#fafafa", "gray.700");
    const borderColor = useColorModeValue("#e0e0e0", "gray.600");
    const headerColor = useColorModeValue(
        "rgba(0,0,0,0.6)",
        "rgba(255,255,255,0.6)"
    );
    const linkColor = useColorModeValue(
        "rgba(0,0,0,0.7)",
        "rgba(255,255,255,0.7)"
    );
    const hoverColor = useColorModeValue("#0066cc", "blue.300");

    if (headings.length === 0) {
        return null;
    }

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <Box
            as="aside"
            width="250px"
            flexShrink="0"
            padding="2rem 1.5rem"
            borderLeft="1px solid"
            borderColor={borderColor}
            backgroundColor={tocBg}
            height="calc(100vh - 80px)"
            overflowY="auto"
            position="sticky"
            top="80px"
        >
            <Text
                fontWeight="bold"
                fontSize="0.9rem"
                textTransform="uppercase"
                color={headerColor}
                marginBottom="1rem"
                paddingBottom="0.5rem"
                borderBottom="1px solid"
                borderColor={borderColor}
            >
                Contents
            </Text>
            <Box as="nav" fontSize="0.9rem">
                <VStack
                    spacing="5px"
                    align="stretch"
                    listStyle="none"
                    padding="0"
                    margin="0"
                >
                    {headings.map((heading) => (
                        <Box
                            key={heading.id}
                            marginBottom={
                                heading.level === 1
                                    ? "0.75rem"
                                    : heading.level === 2
                                    ? "0.5rem"
                                    : "0.25rem"
                            }
                            paddingLeft={
                                heading.level > 1
                                    ? `${(heading.level - 1) * 12}px`
                                    : "0"
                            }
                            fontSize={
                                heading.level > 3
                                    ? "0.8rem"
                                    : heading.level === 3
                                    ? "0.85rem"
                                    : undefined
                            }
                        >
                            <Link
                                href={`#${heading.id}`}
                                onClick={(e) => handleClick(e, heading.id)}
                                fontSize={heading.level === 1 ? "14px" : "13px"}
                                fontWeight={heading.level === 1 ? "600" : "400"}
                                color={linkColor}
                                textDecoration="none"
                                _hover={{
                                    color: hoverColor,
                                    textDecoration: "none",
                                }}
                                display="block"
                                padding="0.25rem 0"
                                transition="color 0.2s"
                            >
                                {heading.text}
                            </Link>
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
}

export default TableOfContents;
