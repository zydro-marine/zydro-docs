import { Collapse, Icon, IconSize } from '@blueprintjs/core';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    HStack,
    VStack,
    Stack,
    Divider,
    Image,
    Select,
    Link,
    Input,
    ButtonGroup,
    Spinner,
} from '@chakra-ui/react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import SocialIcons from '../social-icons/SocialIcons';
import { TbPackage } from 'react-icons/tb';

function LittleCrossAccent() {
    return (
        <Box position="relative" display={["none","none","block"]}>
            <Box position="absolute" left="-15px" top="-10px">
                <Box w="20px" h="1px" bg="rgba(255, 255, 255, 0.2)" position="absolute" left="-10px" bottom="-1px"></Box>
                <Box w="1px" h="20px" bg="rgba(255, 255, 255, 0.2)" position="absolute" left="-1px" bottom="-10px"></Box>
            </Box>
        </Box>
    );
}

function ExternalLinkIcon() {
    return (
        <Box display="inline-block" ml="5px" opacity='0.4' transform="translate(0px,-1px)">
            <Icon icon="arrow-top-right"></Icon>
        </Box>
    )
}

function StoreIcon() {
    return (
        <Box display="inline-block" ml="5px" opacity='0.4' transform="translate(0px,3px)" fontSize="18px">
            <TbPackage />
        </Box>
    )
}

function FooterHeader({ children }) {
    return (
        <Text mb="5px" fontSize="14px" fontWeight="600">{children}</Text>
    )
}

function FooterLink({ children, href, isExternal, isStore }) {
    return (
        <a href={href} class="footerLink">
        <Text mb="2px" fontSize="15px" fontWeight="500" opacity="0.7" fontFamily="Hubot Sans" textDecoration="none" _hover={{
            opacity: 0.9,
            color: "white",
            textDecoration: "none !important"
        }}>{children}{isExternal && <ExternalLinkIcon/>}{isStore && <StoreIcon />}</Text></a>
    )
}
function Footer() {
    const history = useHistory();
    
    return (
        <Box>
            <Box
                backgroundColor="#000000"
                borderBottom="1px solid rgba(255,255,255,0.1)"
                borderTop="1px solid rgba(255,255,255,0.1)"
            >
                <Box
                    margin="0 auto"
                    maxWidth="1200px"
                    display="flex"
                    flexDir={["column", "column", "row"]}
                    justifyContent="stretch"
                    alignItems={["stretch","stretch","flex-start"]}
                    rowGap="15px"
                    columnGap="10px"
                    height="100%"
                    padding="60px"
                    paddingLeft="30px"
                    paddingRight="30px"
                    zIndex={10}
                    lineHeight="24px"
                    color="white"
                    position="relative"
                    // borderLeft="1px solid rgba(75, 75, 75, 0.1)"
                    // borderRight="1px solid rgba(75, 75, 75, 0.1)"
                >
                    <Box flex="1" cursor="pointer" onClick={() => {
                        history.push("/");
                        window.scrollTo({ top: 0 });
                    }}
                    pt="10px" mb="30px">
                        <Image src="/images/logos/logo-icon.svg" width="50px"></Image>
                    </Box>
                    <Box flex="1" fontFamily="Source Code Pro,monospace" fontSize="16px" display="flex" flexDir="column" position="relative">
                        <LittleCrossAccent />
                        <FooterHeader>PLATFORM</FooterHeader>
                        <FooterLink href="/products/usv-core/">USV Core</FooterLink>
                        <FooterLink href="/products/zeus/">Zeus C2</FooterLink>
                        <FooterLink isExternal href="https://vectorcharts.com/">Vector Charts</FooterLink>
                    </Box>
                    <Box flex="1" fontFamily="Source Code Pro,monospace" fontSize="16px" display="flex" flexDir="column" position="relative">
                        <LittleCrossAccent />
                        <FooterHeader>COMPANY</FooterHeader>
                        <FooterLink href="/about-us">About Us</FooterLink>
                        <FooterLink isExternal href="https://jobs.ashbyhq.com/zydro">Open Roles</FooterLink>
                        <FooterLink href="/news">News</FooterLink>
                    </Box>
                    {/* <Box flex="1" fontFamily="Source Code Pro,monospace" fontSize="16px" display="flex" flexDir="column" position="relative">
                        <LittleCrossAccent />
                        <FooterHeader>RESOURCES</FooterHeader>
                        <FooterLink isExternal href="https://docs.zydromarine.com">Documentation</FooterLink>
                        <FooterLink isExternal href="https://store.zydromarine.com">Component Store</FooterLink>
                        <FooterLink isExternal href="https://status.zydromarine.com">Platform Status</FooterLink>
                        <Box h="30px"></Box>
                        <FooterHeader>CUSTOMER PORTAL</FooterHeader>
                        <FooterLink isExternal href="https://portal.zydromarine.com/login">Login</FooterLink>
                    </Box> */}
                    <Box flex="1" fontFamily="Source Code Pro,monospace" fontSize="16px" display="flex" flexDir="column" position="relative">
                        <LittleCrossAccent />
                        <FooterHeader>CONTACT</FooterHeader>
                        <FooterLink href="/contact">Contact Us</FooterLink>
                    </Box>
                    
                    {/* <Box flex="1">
                        <VStack spacing={0} justifyContent="start" alignItems="start">
                            <Text>Products</Text>
                            <Text>Retrofit</Text>
                            <Text>Autonomy Kit</Text>
                            <Text>Perception Kit</Text>
                            <Text>Simulator</Text>
                            <Text>Developer SDKs</Text>
                        </VStack>
                    </Box>
                    <Box flex="1">
                        <VStack spacing={0} justifyContent="start" alignItems="start"></VStack>
                    </Box>
                    <Box flex="1">
                        <VStack spacing={0} justifyContent="start" alignItems="start">
                            <Text>Customer Sign In</Text>
                            <Text>Terms of Service</Text>
                            <Text>Privacy Policy</Text>
                        </VStack>
                    </Box> */}
                    <Box position="absolute" left="10px" bottom="0px">
                        <Box w="10px" h="1px" bg="rgba(49, 49, 49, 1)" position="absolute" left="-1px" bottom="-1px"></Box>
                        <Box w="1px" h="20px" bg="rgba(49, 49, 49, 1)" position="absolute" left="-1px" bottom="-10px"></Box>
                    </Box>
                    <Box position="absolute" right="10px" bottom="0px">
                        <Box w="10px" h="1px" bg="rgba(49, 49, 49, 1)" position="absolute" right="-1px" bottom="-1px"></Box>
                        <Box w="1px" h="20px" bg="rgba(49, 49, 49, 1)" position="absolute" right="-1px" bottom="-10px"></Box>
                    </Box>
                </Box>
            </Box>
            
            <Box
                backgroundColor="#000000"
                borderBottom="1px solid rgba(255,255,255,0.1)"
            >
                <Box
                    margin="0 auto"
                    maxWidth="1200px"
                    display="flex"
                    flexDir="row"
                    justifyContent="stretch"
                    alignItems="flex-start"
                    height="100%"
                    padding="30px"
                    paddingLeft="30px"
                    paddingRight="30px"
                    zIndex={10}
                    lineHeight="24px"
                    position="relative"
                    color="rgba(255,255,255,0.5)"
                >
                    <Box flex="1">
                        <Text>
                            Follow us on Social Media:
                        </Text>
                        <Box>
                            <SocialIcons dark />
                        </Box>
                    </Box>
                    <Box position="absolute" left="10px" bottom="0px">
                        <Box w="10px" h="1px" bg="rgba(49, 49, 49, 1)" position="absolute" left="-1px" bottom="-1px"></Box>
                        <Box w="1px" h="20px" bg="rgba(49, 49, 49, 1)" position="absolute" left="-1px" bottom="-10px"></Box>
                    </Box>
                    <Box position="absolute" right="10px" bottom="0px">
                        <Box w="10px" h="1px" bg="rgba(49, 49, 49, 1)" position="absolute" right="-1px" bottom="-1px"></Box>
                        <Box w="1px" h="20px" bg="rgba(49, 49, 49, 1)" position="absolute" right="-1px" bottom="-10px"></Box>
                    </Box>
                </Box>
            </Box>
            <Box backgroundColor="black">
                <Box
                    margin="0 auto"
                    maxWidth="1200px"
                    display="flex"
                    flexDir={["column", "column", "row"]}
                    justifyContent="stretch"
                    alignItems={["stretch", "stretch", "center"]}
                    height="100%"
                    paddingLeft="30px"
                    paddingRight="30px"
                    padding="30px"
                    zIndex={10}
                    lineHeight="24px"
                    overflow="hidden"
                    color="rgba(255,255,255,0.5)"
                    // borderLeft="1px solid rgba(75, 75, 75, 0.1)"
                    // borderRight="1px solid rgba(75, 75, 75, 0.1)"
                >
                    <Box>
                    © {new Date().getFullYear()} Zydro Marine Technologies. All rights reserved.
                    </Box>
                    <Box flex="1"></Box>
                    <Box 
                    mt={["10px","10px","0px"]}
                    ml={["-10px","-10px","0px"]}
                    display="flex"
                    flexDir="row"
                    justifyContent="stretch"
                    alignItems="center">
                    <Image src="/images/flag.png" width="24px" mr="10px" ml="10px" transform="translateY(1px)"></Image>
                    Built in the USA
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Footer;
