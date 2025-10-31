import { ColorModeButton, useColorMode } from '@/components/ui/color-mode';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    Link,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';

const CoverPage = () => {
    const { colorMode } = useColorMode();

    return (
        <Box
            minH="100vh"
            bg={colorMode === 'dark' ? 'gray.900' : 'gray.800'}
            color="white"
            textAlign="center"
            position="relative"
            boxShadow="inset 0 0 5rem rgba(0, 0, 0, .5)"
            textShadow="0 .05rem .1rem rgba(0, 0, 0, .5)"
        >
            <Box position="fixed" bottom={4} right={4} zIndex={1500}>
                <ColorModeButton
                    _hover={{
                        bg: 'white',
                        _icon: {
                            color: 'black',
                        },
                    }}
                    _icon={{
                        color: 'white',
                    }}
                />
            </Box>
            <Container maxW="42em" h="100vh">
                <Flex direction="column" h="100%" p={3}>
                    {/* Header */}
                    <Flex
                        as="header"
                        mb="auto"
                        align="center"
                        flexDir={{ base: 'column', md: 'row' }}
                        gap={2}
                    >
                        <Heading
                            as="h3"
                            size="lg"
                            fontWeight="normal"
                            display="flex"
                            flexDir="row"
                            alignItems="center"
                            gap={4}
                        >
                            <Image
                                src="/assets/pilacoin.svg"
                                alt="PilaCoin logo"
                                width={8}
                            />
                            PilaCoin Faucet
                        </Heading>
                        <Spacer />
                        <HStack gap={4}>
                            <Link
                                href="#"
                                fontWeight="bold"
                                py={1}
                                px={0}
                                color="white"
                                borderBottom="0.25rem solid"
                                borderBottomColor="white"
                                _hover={{
                                    borderBottomColor: 'whiteAlpha.500',
                                    textDecoration: 'none',
                                }}
                            >
                                Home
                            </Link>
                            <Link
                                href="#"
                                fontWeight="bold"
                                py={1}
                                px={0}
                                color="whiteAlpha.500"
                                borderBottom="0.25rem solid transparent"
                                _hover={{
                                    borderBottomColor: 'whiteAlpha.300',
                                    textDecoration: 'none',
                                }}
                            >
                                About
                            </Link>
                        </HStack>
                    </Flex>

                    {/* Main Content */}
                    <VStack as="main" gap={6} px={3} flex="1" justify="center">
                        <Heading as="h1" size="2xl">
                            Get your PilaCoins
                        </Heading>
                        <Text fontSize="xl" lineHeight="1.25" maxW="600px">
                            Once a day, earn 1.000 coins for free just
                            connecting your MetaMask below.
                        </Text>
                        <Button
                            size="lg"
                            colorScheme="gray"
                            variant="solid"
                            bg="white"
                            color="gray.800"
                            fontWeight="bold"
                            border="1px solid white"
                            p={6}
                            _hover={{
                                bg: 'gray.100',
                                transform: 'translateY(-1px)',
                            }}
                            _active={{
                                transform: 'translateY(0)',
                            }}
                        >
                            <Image
                                src="/assets/metamask.svg"
                                alt="MetaMask logo"
                                width={8}
                            />
                            Connect MetaMask
                        </Button>
                    </VStack>

                    {/* Footer */}
                    <Box as="footer" mt="auto" color="whiteAlpha.600">
                        <Text>
                            Built by{' '}
                            <Link
                                href="https://edersonfernandes.com.br"
                                color="white"
                                _hover={{ textDecoration: 'underline' }}
                            >
                                @efernandes-tech
                            </Link>
                            .
                        </Text>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};

export default CoverPage;
