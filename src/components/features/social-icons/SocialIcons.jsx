import { Box, HStack, Image, Button } from "@chakra-ui/react";

const SocialIcons = ({ dark }) => {
    return (
        <Box color={dark ? 'white' : 'black'} opacity={dark ? 0.6 : 1.0}>
            <HStack spacing={4}>
                <a href="https://x.com/zydromarine" target="_blank">
                    <Image src={dark ? "/images/socials/x-white.svg" : "/images/socials/x.svg"} width="32px" height="32px"></Image>
                </a>
                <a href="https://www.youtube.com/@zydromarine" target="_blank">
                    <Image src={dark ? "/images/socials/youtube-white.svg" : "/images/socials/youtube.svg"} width="32px" height="32px"></Image>
                </a>
                <a href="https://linkedin.com/company/zydro" target="_blank">
                    <Image src={dark ? "/images/socials/linkedin-white.svg" : "/images/socials/linkedin.svg"} width="32px" height="32px"></Image>
                </a>
            </HStack>
        </Box>
    )

}

export default SocialIcons;