import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../../../contexts/AuthContext";

function AuthRequired({ onLogin }) {
    const { login } = useAuth();
    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("#e0e0e0", "gray.600");
    const titleColor = useColorModeValue("black", "white");
    const messageColor = useColorModeValue(
        "rgba(0,0,0,0.7)",
        "rgba(255,255,255,0.7)"
    );
    const noteColor = useColorModeValue(
        "rgba(0,0,0,0.5)",
        "rgba(255,255,255,0.5)"
    );

    const handleLogin = async () => {
        try {
            await login();
            if (onLogin) {
                onLogin();
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <Box
            maxWidth="600px"
            margin="4rem auto"
            padding="2rem"
            textAlign="center"
        >
            <Box
                border="1px solid"
                borderColor={borderColor}
                borderRadius="8px"
                padding="3rem 2rem"
                backgroundColor={cardBg}
            >
                <VStack spacing="20px" align="stretch">
                    <Heading
                        as="h2"
                        size="lg"
                        textAlign="center"
                        color={titleColor}
                        marginTop="0"
                        marginBottom="1rem"
                    >
                        Authentication Required
                    </Heading>
                    <Text
                        textAlign="center"
                        color={messageColor}
                        marginBottom="2rem"
                        lineHeight="1.6"
                    >
                        This page requires authentication to access. Please sign
                        in to continue.
                    </Text>
                    <Button
                        onClick={handleLogin}
                        variant="black"
                        width="100%"
                        padding="0.75rem 2rem"
                        fontSize="1rem"
                        fontWeight="600"
                    >
                        Sign In
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}

export default AuthRequired;
